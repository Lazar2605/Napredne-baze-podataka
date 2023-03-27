using Microsoft.AspNetCore.Mvc;
using NBPProj2_2.Models;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Threading.Tasks;

namespace NBPProj2_2.Controllers
{
    public class MedicinskaSestraController:Controller
    {
        private readonly IGraphClient _client;

        public MedicinskaSestraController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("AddMedicinskaSestra/{idOdeljenja}")]
        public async Task<ActionResult> AddMedicinskaSestra([FromBody] MedicinskaSestra medicinskaSestra, int idOdeljenja)
        {
            try
            {
                if(medicinskaSestra == null)
                {
                    return BadRequest("Nevalidan ulazni parametar");
                }

                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                            .Where((MedicinskaSestra ms) => ms.JMBG == medicinskaSestra.JMBG)
                                            .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (ms != null)
                {
                    return BadRequest("Medicinska sestra je vec registrovan u bazi");
                }

                await _client.Cypher.Create("(ms:MedicinskaSestra $info)")
                                    .WithParam("info", medicinskaSestra)
                                    .ExecuteWithoutResultsAsync();

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", medicinskaSestra.JMBG);
                dict.Add("ID", idOdeljenja);

                await _client.Cypher.Match(("(ms:MedicinskaSestra) , (o:Odeljenje)"))
                                         .Where("ms.JMBG = $JMBG AND id(o) = $ID")
                                         .WithParams(dict)
                                         .Create("(ms)-[:RADI_NA]->(o)").ExecuteWithoutResultsAsync();

                return Ok("Uspesno ste registrovali medicinsku sestru u bazu");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
        [HttpGet]
        [Route("VratiSveMedicinskeSestre")]
        public async Task<ActionResult> VratiSveMedicinskeSestre()
        {
            try
            {
                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                             .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).ToList();
                return Ok(ms);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("VratiOdeljenjeMedSestre/{jmbg}")]
        public async Task<ActionResult> VratiOdeljenjeMedSestre(string jmbg)
        {
            try
            {
                var o = (await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:RADI_NA]->(o:Odeljenje)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == jmbg)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji medicinska sestra za zadati JMBG");
                }
                
                return Ok(o);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllMedicinskaSestraFromOdeljenje/{idOdeljenja}")]
        public async Task<ActionResult> GetAllMedicinskaSestraFromOdeljenje(int idOdeljenja)
        {
            try
            {
                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == idOdeljenja)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }

                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra),(o:Odeljenje)")
                                             .Where("id(o) = $idOdeljenja AND (ms)-[:RADI_NA]->(o)")
                                             .WithParam("idOdeljenja", idOdeljenja)
                                             .Return(ms => ms.As<MedicinskaSestra>())
                                             .ResultsAsync).ToList();
                return Ok(ms);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetMedicinskaSestra/{JMBG}")]
        public async Task<ActionResult> GetMedicinskaSestra(string JMBG)
        {
            try
            {
                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                           .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (ms == null)
                {
                    return BadRequest("Ne postoji meducinska sestra za zadati JMBG");
                }

                return Ok(ms);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("SearchMedSestra/{ime}/{prezime}")]
        public async Task<ActionResult> SearchMedSestra(string ime, string prezime)
        {
            try
            {
                string i = ime + ".*";
                string p = prezime + ".*";

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("i", i);
                dict.Add("p", p);

                var l = (await _client.Cypher.Match("(md:MedicinskaSestra)")
                                             .Where("md.Ime =~ $i AND md.Prezime =~ $p")
                                             .WithParams(dict)
                                             .Return(md => md.As<MedicinskaSestra>()).ResultsAsync).ToList();


                return Ok(l);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteMedicinskaSestra/{JMBG}")]
        public async Task<ActionResult> DeleteMedicinskaSestra(string JMBG)
        {
            try
            {
                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                           .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (ms == null)
                {
                    return BadRequest("Ne postoji meducinska sestra za zadati JMBG");
                }

                await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:RADI_NA]->(o:Odeljenje)")
                                    .Where("ms.JMBG = $JMBG")
                                    .WithParam("JMBG", JMBG)
                                    .Delete("v")
                                    .ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:JE_GLAVNA_SESTRA]->(o:Odeljenje)")
                                    .Where("ms.JMBG = $JMBG")
                                    .WithParam("JMBG", JMBG)
                                    .Delete("v")
                                    .ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                .Delete("ms")
                                .ExecuteWithoutResultsAsync();

                return Ok("Uspesno obrisano");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("UpdateMedicinskaSestra")]
        public async Task<ActionResult> UpdateMedicinskaSestra([FromBody]MedicinskaSestra ms)
        {
            try
            {
                var medSes = (await _client.Cypher.Match("(m:MedicinskaSestra)")
                                                 .Where("m.JMBG = $JMBG")
                                                 .WithParam("JMBG",ms.JMBG)
                                                 .Return(m => m.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if(medSes == null)
                {
                    return BadRequest("Medicinska sestra ne postoji u bazi");
                }

                medSes.BrojTelefona = string.IsNullOrEmpty(ms.BrojTelefona) ? medSes.BrojTelefona: ms.BrojTelefona;
                medSes.BrojLicneKarte = string.IsNullOrEmpty(ms.BrojLicneKarte) ? medSes.BrojLicneKarte : ms.BrojLicneKarte;
                medSes.Prezime = string.IsNullOrEmpty(ms.Prezime) ? medSes.Prezime : ms.Prezime;
                medSes.Ime = string.IsNullOrEmpty(ms.Ime) ? medSes.Ime : ms.Ime;
                medSes.SrednjeSlovo = string.IsNullOrEmpty(ms.SrednjeSlovo) ? medSes.SrednjeSlovo : ms.SrednjeSlovo;
                medSes.DatumRodjenja = string.IsNullOrEmpty(ms.DatumRodjenja) ? medSes.DatumRodjenja : ms.DatumRodjenja;

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", medSes.JMBG);
                dict.Add("BrojTelefona", medSes.BrojTelefona);
                dict.Add("BrojLicneKarte", medSes.BrojLicneKarte);
                dict.Add("Prezime", medSes.Prezime);
                dict.Add("Ime", medSes.Ime);
                dict.Add("SrednjeSlovo", medSes.SrednjeSlovo);
                dict.Add("DatumRodjenja", medSes.DatumRodjenja);

                await _client.Cypher.Match("(m:MedicinskaSestra)")
                                    .Where("m.JMBG = $JMBG")
                                    .Set("m.BrojTelefona = $BrojTelefona, m.BrojLicneKarte = $BrojLicneKarte, m.Prezime = $Prezime, m.Ime = $Ime, m.SrednjeSlovo = $SrednjeSlovo, m.DatumRodjenja = $DatumRodjenja")
                                    .WithParams(dict)
                                    .ExecuteWithoutResultsAsync();

                return Ok("Podaci su uspesno izmenjeni");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("ChangeOdeljenjeMedSestra/{idOdeljenja}/{JMBG}")]
        public async Task<ActionResult> ChangeOdeljenjeMedSestra(int idOdeljenja,string JMBG)
        {
            try
            {
                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                           .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (ms == null)
                {
                    return BadRequest("Ne postoji meducinska sestra za zadati JMBG");
                }

                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == idOdeljenja)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }


                await _client.Cypher.Match("(md:MedicinskaSestra)-[v:RADI_NA]->(o:Odeljenje)")
                                    .Where("md.JMBG = $JMBG")
                                    .WithParam("JMBG", JMBG)
                                    .Delete("v")
                                    .ExecuteWithoutResultsAsync();

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", JMBG);
                dict.Add("idOdeljenja", idOdeljenja);

                await _client.Cypher.Match("(md:MedicinskaSestra) , (o:Odeljenje)")
                                    .Where("md.JMBG = $JMBG AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Create("(md)-[:RADI_NA]->(o)")
                                    .ExecuteWithoutResultsAsync();

                return Ok("Uspesno ste promenili odeljenje");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("PostaviSestruZaGlavnu/{JMBG}")]
        public async Task<ActionResult> PostaviSestruZaGlavnu(string JMBG)
        {
            try
            {
                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                           .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (ms == null)
                {
                    return BadRequest("Ne postoji meducinska sestra za zadati JMBG");
                }

                var o = (await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:RADI_NA]->(o:Odeljenje)")
                                            .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                            .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();


                await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:JE_GLAVNA_SESTRA]->(o:Odeljenje)")
                                            .Where("id(o) = $id")
                                            .WithParam("id", o.ID)
                                            .Delete("v")
                                            .ExecuteWithoutResultsAsync();

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", JMBG);
                dict.Add("idOdeljenja", o.ID);

                await _client.Cypher.Match("(ms:MedicinskaSestra), (o:Odeljenje)")
                                    .Where("ms.JMBG = $JMBG AND id(o) = $idOdeljenja")
                                    .WithParams(dict)
                                    .Create("(ms)-[:JE_GLAVNA_SESTRA]->(o)").ExecuteWithoutResultsAsync();

                return Ok("Postavljena je nova glavna sestra");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("SmeniSestruSaPozicijeGlavnaSestra/{JMBG}")]
        public async Task<ActionResult> SmeniSestruSaPozicijeGlavnaSestra(string JMBG)
        {
            try
            {
                var ms = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                           .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (ms == null)
                {
                    return BadRequest("Ne postoji meducinska sestra za zadati JMBG");
                }

                var prov = (await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:JE_GLAVNA_SESTRA]->(o:Odeljenje)")
                                               .Where("ms.JMBG = $JMBG")
                                               .WithParam("JMBG", JMBG)
                                               .Return(v => v.As<Object>()).ResultsAsync).FirstOrDefault();

                if (prov == null)
                {
                    return BadRequest("Medicinska sestra sa prosledjenim ID-em nije glavna sestra");
                }

                await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:JE_GLAVNA_SESTRA]->(o:Odeljenje)")
                                             .Where("ms.JMBG = $JMBG")
                                             .WithParam("JMBG", JMBG)
                                             .Delete("v").ExecuteWithoutResultsAsync();

                return Ok("Medicinska sestra uspesno smenjena");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("SestraJeGlavna/{JMBG}")]
        public async Task<ActionResult> SestraJeGlavna(string JMBG)
        {
            try
            {
                var m = (await _client.Cypher.Match("(ms:MedicinskaSestra)")
                                           .Where((MedicinskaSestra ms) => ms.JMBG == JMBG)
                                           .Return(ms => ms.As<MedicinskaSestra>()).ResultsAsync).FirstOrDefault();

                if (m == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                var prov = (await _client.Cypher.Match("(ms:MedicinskaSestra)-[v:JE_GLAVNA_SESTRA]->(o:Odeljenje)")
                                               .Where("ms.JMBG = $JMBG")
                                               .WithParam("JMBG", JMBG)
                                               .Return(v => v.As<Object>()).ResultsAsync).FirstOrDefault();

                if (prov == null)
                {
                    return Ok(false);
                }

                return Ok(true);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
