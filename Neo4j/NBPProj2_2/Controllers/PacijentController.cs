using Microsoft.AspNetCore.Mvc;
using NBPProj2_2.Models;
using Neo4j.Driver;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace NBPProj2_2.Controllers
{
    public class PacijentController:Controller
    {
        private readonly IGraphClient _client;

        public PacijentController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("AddPacijent")]
        public async Task<ActionResult> AddPacijent([FromBody] Pacijent pacijent)
        {
            try
            {
                if (pacijent == null)
                {
                    return BadRequest("Nevalidan ulazni parametar");
                }

                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                            .Where((Pacijent p) => p.JMBG == pacijent.JMBG)
                                            .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p != null)
                {
                    return BadRequest("Pacijent je vec registrovan u bazi");
                }



                await _client.Cypher.Create("(p:Pacijent $info)")
                                    .WithParam("info", pacijent)
                                    .ExecuteWithoutResultsAsync();

                return Ok("Uspesno ste registrovali pacijenta u bazu");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("VratiSvePacijente")]
        public async Task<ActionResult> VratiSvePacijente()
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                             .Return(p => p.As<Pacijent>()).ResultsAsync).ToList();
                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetPacijentJMBG/{JMBG}")]
        public async Task<ActionResult> GetPacijentJMBG(string JMBG)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.JMBG == JMBG)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji pacijent za zadati JMBG");
                }

                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetPacijentBZK/{BZK}")]
        public async Task<ActionResult> GetPacijentBZK(string BZK)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji pacijent za zadati broj knjižice");
                }

                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("SmestiPacijentaNaOdeljenje/{BZK}/{idOdeljenja}")]
        public async Task<ActionResult> SmestiPacijentaNaOdeljenje(string BZK, int idOdeljenja)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji pacijent za zadati broj knjižice");
                }

                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == idOdeljenja)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }

                if(o.BrojZauzetihMesta == o.Kapacitet)
                {
                    return BadRequest("Nema slobodnih mesta na odeljenju");
                }

                if (o.Tip.Equals("Ambulanta"))
                {
                    return BadRequest("Pacijent ne moze biti smesten u ambulanti");
                }

                var bv = (await _client.Cypher.Match("(p:Pacijent)-[v:SMESTEN_NA]->(o:Odeljenje)")
                                    .Where("p.BrojZdravstveneKnjizice = $BZK")
                                    .WithParam("BZK",BZK)
                                    .Return<int>("count(v) as bv").ResultsAsync).FirstOrDefault();

                if (bv != 0)
                {
                    return BadRequest("Pacijent je vec smesten na nekom odeljenju");
                }

                string d = DateTime.Now.ToShortDateString();

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("BZK", BZK);
                dict.Add("idOdeljenja", idOdeljenja);

                await _client.Cypher.Match("(p:Pacijent),(o:Odeljenje)")
                                    .Where("p.BrojZdravstveneKnjizice = $BZK AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Create("(p)-[:SMESTEN_NA {DatumOd: $od}]->(o)")
                                    .WithParam("od",d)
                                    .ExecuteWithoutResultsAsync();

                int nbzm = o.BrojZauzetihMesta + 1;

                await _client.Cypher.Match("(o:Odeljenje)")
                                    .Where((Odeljenje o) => o.ID == idOdeljenja)
                                    .Set("o.BrojZauzetihMesta = $nbzm")
                                    .WithParam("nbzm", nbzm)
                                    .ExecuteWithoutResultsAsync();

                return Ok("Pacijent je uspesno smesten na odeljenje");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("OtpustiPacijentaSaOdeljenja/{BZK}/{idOdeljenja}/{razlog}")]  // razlog zasto je bio smesten na odeljenju operacija,preventivno,detaljne analize...
        public async Task<ActionResult> OtpustiPacijentaSaOdeljenja(string BZK, int idOdeljenja,string razlog)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji pacijent za zadati broj zdravstevene knjizice");
                }

                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == idOdeljenja)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }

                string d = DateTime.Now.ToShortDateString();

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("BZK", BZK);
                dict.Add("idOdeljenja", idOdeljenja);

                var bv = (await _client.Cypher.Match("(p:Pacijent)-[v:SMESTEN_NA]->(o:Odeljenje)")
                                    .Where("p.BrojZdravstveneKnjizice = $BZK AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Return<int>("count(v) as bv").ResultsAsync).FirstOrDefault();

                if(bv == 0)
                {
                    return BadRequest("Pacijent nije smesten na odeljenju");
                }

                var datumOd = (await _client.Cypher.Match("(p:Pacijent)-[v:SMESTEN_NA]->(o:Odeljenje)")
                                    .Where("p.BrojZdravstveneKnjizice = $BZK AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Return<string>("v.DatumOd as DatumOd").ResultsAsync).SingleOrDefault();

                string datumDo = DateTime.Now.ToShortDateString();

                await _client.Cypher.Match("(p:Pacijent)-[v:SMESTEN_NA]->(o:Odeljenje)")
                                    .Where("p.BrojZdravstveneKnjizice = $BZK AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Delete("v").ExecuteWithoutResultsAsync();

                IDictionary<string, Object> dict2 = new Dictionary<string, Object>();
                dict.Add("od", datumOd);
                dict.Add("do", datumDo);
                dict.Add("raz", razlog);

                await _client.Cypher.Match("(p:Pacijent),(o:Odeljenje)")
                                    .Where("p.BrojZdravstveneKnjizice = $BZK AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Create("(p)-[:BIO_SMESTEN_NA {DatumOd: $od, DatumDo: $do, BioSmestenZbog: $raz}]->(o)")
                                    .WithParams(dict2)
                                    .ExecuteWithoutResultsAsync();

                int nbzm = o.BrojZauzetihMesta - 1;

                await _client.Cypher.Match("(o:Odeljenje)")
                                    .Where((Odeljenje o) => o.ID == idOdeljenja)
                                    .Set("o.BrojZauzetihMesta = $nbzm")
                                    .WithParam("nbzm", nbzm)
                                    .ExecuteWithoutResultsAsync();

                return Ok("Pacijent je otpusten sa odeljenja");


            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }



        [HttpPut]
        [Route("UpdatePacijent")]
        public async Task<ActionResult> UpdatePacijent([FromBody]Pacijent pacijent)
        {
            try
            {
                var pac = (await _client.Cypher.Match("(p:Pacijent)")
                                                 .Where((Pacijent p) => p.JMBG == pacijent.JMBG)
                                                 .WithParam("pacijent", pacijent)
                                                 .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (pac == null)
                {
                    return BadRequest("Pacijent ne postoji u bazi");
                }

                pac.BrojLicneKarte = string.IsNullOrEmpty(pacijent.BrojLicneKarte) ? pac.BrojLicneKarte : pacijent.BrojLicneKarte;
                pac.Prezime = string.IsNullOrEmpty(pacijent.Prezime) ? pac.Prezime : pacijent.Prezime;
                pac.Ime = string.IsNullOrEmpty(pacijent.Ime) ? pac.Ime : pacijent.Ime;
                pac.SrednjeSlovo = string.IsNullOrEmpty(pacijent.SrednjeSlovo) ? pac.SrednjeSlovo : pacijent.SrednjeSlovo;
                pac.DatumRodjenja = string.IsNullOrEmpty(pacijent.DatumRodjenja) ? pac.DatumRodjenja : pacijent.DatumRodjenja;
                pac.BrojKartona = pacijent.BrojKartona == 0 ? pac.BrojKartona : pacijent.BrojKartona;
                pac.BrojZdravstveneKnjizice = string.IsNullOrEmpty(pacijent.BrojZdravstveneKnjizice) ? pac.BrojZdravstveneKnjizice : pacijent.BrojZdravstveneKnjizice;

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", pac.JMBG);
                dict.Add("BrojLicneKarte", pac.BrojLicneKarte);
                dict.Add("Prezime", pac.Prezime);
                dict.Add("Ime", pac.Ime);
                dict.Add("SrednjeSlovo", pac.SrednjeSlovo);
                dict.Add("DatumRodjenja", pac.DatumRodjenja);
                dict.Add("BrojKartona", pac.BrojKartona);
                dict.Add("BrojZdravstveneKnjizice", pac.BrojZdravstveneKnjizice);

                await _client.Cypher.Match("(p:Pacijent)")
                                    .Where("p.JMBG = $JMBG")
                                    .Set("p.BrojLicneKarte = $BrojLicneKarte, p.Prezime = $Prezime,p.Ime = $Ime, p.SrednjeSlovo = $SrednjeSlovo, p.DatumRodjenja = $DatumRodjenja, p.BrojKartona = $BrojKartona, p.BrojZdravstveneKnjizice = $BrojZdravstveneKnjizice")
                                    .WithParams(dict)
                                    .ExecuteWithoutResultsAsync();

                return Ok("Podaci su uspesno izmenjeni");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllPregledForPacijent/{BZK}")]
        public async Task<ActionResult> GetAllPregledForPacijent(string BZK)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                var pregledi = (await _client.Cypher.Match("(pr:Pregled)-[:IZVRSEN_NAD]->(p:Pacijent)")
                                            .Where("p.BrojZdravstveneKnjizice = $BZK")
                                            .WithParam("BZK", BZK)
                                            .Return(pr => pr.As<Pregled>()).ResultsAsync).ToList();

                if(pregledi.Count == 0)
                {
                    return BadRequest("Pacijent nema registrovanih pregleda");
                }

                return Ok(pregledi);
                                            
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("VratiOdeljenjeNaKojeJeSmestenPacijent/{BZK}")]
        public async Task<ActionResult> VratiOdeljenjeNaKojeJeSmestenPacijent(string BZK)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji pacijent za zadati broj knjižice");
                }

                var odeljenje = (await _client.Cypher.Match("(p:Pacijent)-[v:SMESTEN_NA]->(o:Odeljenje)")
                                            .Where("p.BrojZdravstveneKnjizice = $BZK")
                                            .WithParam("BZK", BZK)
                                            .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if(odeljenje == null)
                {
                    return BadRequest("Pacijent nije smešten ni na jedno odeljenje");
                }

                return Ok(odeljenje);
                                            
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllPregledForPacijentAndLekar/{BZK}/{JBMGLekara}")]
        public async Task<ActionResult> GetAllPregledForPacijentAndLekar(string BZK,string JBMGLekara)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                var l = (await _client.Cypher.Match("(l:Lekar)")
                                           .Where((Lekar l) => l.JMBG == JBMGLekara)
                                           .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", JBMGLekara);
                dict.Add("BZK", BZK);

                var pregledi = (await _client.Cypher.Match("(l:Lekar)<-[:IZVRSIO]-(pr:Pregled)-[:IZVRSEN_NAD]->(p:Pacijent)")
                                            .Where("p.BrojZdravstveneKnjizice = $BZK AND l.JMBG = $JMBG")
                                            .WithParams(dict)
                                            .Return(pr => pr.As<Pregled>()).ResultsAsync).ToList();

                if (pregledi.Count == 0)
                {
                    return BadRequest("Lekar nije izvriso nijedan pregled nad pacijentom");
                }

                return Ok(pregledi);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllPregledForPacijentAndOdeljenje/{BZK}/{IDOdeljenja}")]
        public async Task<ActionResult> GetAllPregledForPacijentAndOdeljenje(string BZK, int IDOdeljenja)
        {
            try
            {
                var p = (await _client.Cypher.Match("(p:Pacijent)")
                                           .Where((Pacijent p) => p.BrojZdravstveneKnjizice == BZK)
                                           .Return(p => p.As<Pacijent>()).ResultsAsync).FirstOrDefault();

                if (p == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == IDOdeljenja)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("ID", IDOdeljenja);
                dict.Add("BZK", BZK);

                var pregledi = (await _client.Cypher.Match("(o:Odeljenje)<-[:IZVRSEN_NA]-(pr:Pregled)-[:IZVRSEN_NAD]->(p:Pacijent)")
                                            .Where("p.BrojZdravstveneKnjizice = $BZK AND id(o) = $ID")
                                            .WithParams(dict)
                                            .Return(pr => pr.As<Pregled>()).ResultsAsync).ToList();

                if (pregledi.Count == 0)
                {
                    return BadRequest("Pacijent nema izvrsen pregled na odeljenju");
                }

                return Ok(pregledi);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteVeze")]
        public async Task<ActionResult> DeleteVeze()
        {
            try
            {
                await _client.Cypher.Match("(p:Pacijent)-[v:SMESTEN_NA]->(o:Odeljenje)")
                                    .Delete("v").ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(p:Pacijent)-[v:BIO_SMESTEN_NA]->(o:Odeljenje)")
                                    .Delete("v").ExecuteWithoutResultsAsync();

                return Ok("Izbrisano");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
