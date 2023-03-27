using Microsoft.AspNetCore.Mvc;
using NBPProj2_2.Models;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NBPProj2_2.Controllers
{
    public class LekarController:Controller
    {
        private readonly IGraphClient _client;

        public LekarController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("AddLekar/{idOdeljenja}")]
        public async Task<ActionResult> AddLekar([FromBody]Lekar lekar, int idOdeljenja)
        {
            try
            {
                if(lekar == null)
                {
                    return BadRequest("Nevalidan ulazni parametar");
                }

                var l = (await _client.Cypher.Match("(l:Lekar)")
                                            .Where((Lekar l) => l.JMBG == lekar.JMBG)
                                            .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if(l != null)
                {
                    return BadRequest("Lekar je vec registrovan u bazi");
                }



                await _client.Cypher.Create("(l:Lekar $info)")
                                    .WithParam("info",lekar)
                                    .ExecuteWithoutResultsAsync();

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", lekar.JMBG);
                dict.Add("ID", idOdeljenja);

                await _client.Cypher.Match(("(l:Lekar) , (o:Odeljenje)"))
                                         .Where("l.JMBG = $JMBG AND id(o) = $ID")
                                         .WithParams(dict)
                                         .Create("(l)-[:RADI_NA]->(o)").ExecuteWithoutResultsAsync();


                return Ok("Uspesno ste registrovali lekara u bazu");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllLekar")]
        public async Task<ActionResult> GetAllLekar()
        {
            try
            {
                var l = (await _client.Cypher.Match("(l:Lekar)")
                                             .Return(l => l.As<Lekar>()).ResultsAsync).ToList();
                return Ok(l);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("VratiOdeljenjeLekara/{jmbg}")]
        public async Task<ActionResult> VratiOdeljenjeLekara(string jmbg)
        {
            try
            {
                var o = (await _client.Cypher.Match("(l:Lekar)-[v:RADI_NA]->(o:Odeljenje)")
                                           .Where((Lekar l) => l.JMBG == jmbg)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }



                return Ok(o);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllLekarFromOdeljenje/{idOdeljenja}")]
        public async Task<ActionResult> GetAllLekarFromOdeljenje(int idOdeljenja)
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

                var l = (await _client.Cypher.Match("(l:Lekar),(o:Odeljenje)")
                                             .Where("id(o) = $idOdeljenja AND (l)-[:RADI_NA]->(o)")
                                             .WithParam("idOdeljenja", idOdeljenja)
                                             .Return(l => l.As<Lekar>())
                                             .ResultsAsync).ToList();
                return Ok(l);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetLekar/{JMBG}")]
        public async Task<ActionResult> GetLekar(string JMBG)
        {
            try
            {
                var l = (await _client.Cypher.Match("(l:Lekar)")
                                           .Where((Lekar l) => l.JMBG == JMBG)
                                           .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                return Ok(l);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("SearchLekar/{ime}/{prezime}")]
        public async Task<ActionResult> SearchLekar(string ime,string prezime)
        {
            try
            {
                string i = ime + ".*";
                string p = prezime + ".*";

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("i", i);
                dict.Add("p", p);

                var l = (await _client.Cypher.Match("(l:Lekar)")
                                             .Where("l.Ime =~ $i AND l.Prezime =~ $p")
                                             .WithParams(dict)
                                             .Return(l => l.As<Lekar>()).ResultsAsync).ToList();

                return Ok(l);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("UpdateLekar")]
        public async Task<ActionResult> UpdateLekar([FromBody] Lekar lekar)
        {
            try
            {
                var l = (await _client.Cypher.Match("(l:Lekar)")
                                            .Where((Lekar l) => l.JMBG == lekar.JMBG)
                                            .WithParam("lekar",lekar)
                                            .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Lekar ne postoji u bazi");
                }

                l.BrojTelefona = string.IsNullOrEmpty(lekar.BrojTelefona) ? l.BrojTelefona : lekar.BrojTelefona;
                l.BrojLicneKarte = string.IsNullOrEmpty(lekar.BrojLicneKarte) ? l.BrojLicneKarte : lekar.BrojLicneKarte;
                l.Prezime = string.IsNullOrEmpty(lekar.Prezime) ? l.Prezime : lekar.Prezime;
                l.Ime = string.IsNullOrEmpty(lekar.Ime) ? l.Ime : lekar.Ime;
                l.SrednjeSlovo = string.IsNullOrEmpty(lekar.SrednjeSlovo) ? l.SrednjeSlovo : lekar.SrednjeSlovo;
                l.DatumRodjenja = string.IsNullOrEmpty(lekar.DatumRodjenja) ? l.DatumRodjenja : lekar.DatumRodjenja;
                l.BrojKancelarije = lekar.BrojKancelarije == 0 ? l.BrojKancelarije : lekar.BrojKancelarije;

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", l.JMBG);
                dict.Add("BrojTelefona", l.BrojTelefona);
                dict.Add("BrojLicneKarte", l.BrojLicneKarte);
                dict.Add("Prezime", l.Prezime);
                dict.Add("Ime", l.Ime);
                dict.Add("SrednjeSlovo", l.SrednjeSlovo);
                dict.Add("DatumRodjenja", l.DatumRodjenja);
                dict.Add("BrojKancelarije", l.BrojKancelarije);

                await _client.Cypher.Match("(l:Lekar)")
                                    .Where("l.JMBG = $JMBG")
                                    .Set("l.BrojTelefona = $BrojTelefona, l.BrojLicneKarte = $BrojLicneKarte, l.Prezime = $Prezime, l.Ime = $Ime, l.SrednjeSlovo = $SrednjeSlovo, l.DatumRodjenja = $DatumRodjenja, l.BrojKancelarije = $BrojKancelarije")
                                    .WithParams(dict)
                                    .ExecuteWithoutResultsAsync();

                return Ok("Podaci su uspesno izmenjeni");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteLekar/{JMBG}")]
        public async Task<ActionResult> DeleteLekar(string JMBG)
        {
            try
            {
                await _client.Cypher.Match("(l:Lekar)-[v:RADI_NA]->(o:Odeljenje)")
                                    .Where("l.JMBG = $JMBG")
                                    .WithParam("JMBG", JMBG)
                                    .Delete("v")
                                    .ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(l:Lekar)-[v:JE_NACELNIK]->(o:Odeljenje)")
                                    .Where("l.JMBG = $JMBG")
                                    .WithParam("JMBG", JMBG)
                                    .Delete("v")
                                    .ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(p:Pregled)-[v:IZVRSIO]->(l:Lekar)")
                                    .Where("l.JMBG = $JMBG")
                                    .WithParam("JMBG", JMBG)
                                    .Delete("v")
                                    .ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(l:Lekar)")
                                .Where((Lekar l) => l.JMBG == JMBG)
                                .Delete("l")
                                .ExecuteWithoutResultsAsync();

                return Ok("Uspesno obrisano");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("PostaviLekaraZaNacelnika/{idOdeljenja}/{JMBG}")]
        public async Task<ActionResult> PostaviLekaraZaNacelnika(int idOdeljenja, string JMBG)
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

                var l = (await _client.Cypher.Match("(l:Lekar)")
                                           .Where((Lekar l) => l.JMBG == JMBG)
                                           .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", JMBG);
                dict.Add("idOdeljenja", idOdeljenja);

                var prov = (await _client.Cypher.Match("(l:Lekar)-[v:RADI_NA]->(o:Odeljenje)")
                                               .Where("l.JMBG = $JMBG AND o.ID = $idOdeljenja")
                                               .WithParams(dict)
                                               .Return(v => v.As<Object>()).ResultsAsync).FirstOrDefault();

                if (prov == null)
                {
                    return BadRequest("Lekar ne radi na zadatom odeljenju");
                }

                await _client.Cypher.Match("(l:Lekar)-[v:JE_NACELNIK]->(o:Odeljenje)")
                                             .Where("o.ID = $idOdeljenja")
                                             .WithParam("idOdeljenja", idOdeljenja)
                                             .Delete("v").ExecuteWithoutResultsAsync();

                await _client.Cypher.Match("(l:Lekar),(o:Odeljenje)")
                                    .Where("l.JMBG = $JMBG AND o.ID = $idOdeljenja")
                                    .WithParams(dict)
                                    .Create("(l)-[:JE_NACELNIK]->(o)").ExecuteWithoutResultsAsync();

                return Ok("Postavljen je novi nacelnik");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("SmeniNacelnika/{idOdeljenja}/{JMBG}")]
        public async Task<ActionResult> SmeniNacelnika(int idOdeljenja, string JMBG)
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

                var l = (await _client.Cypher.Match("(l:Lekar)")
                                           .Where((Lekar l) => l.JMBG == JMBG)
                                           .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                await _client.Cypher.Match("(l:Lekar)-[v:JE_NACELNIK]->(o:Odeljenje)")
                                             .Where("o.ID = $idOdeljenja")
                                             .WithParam("idOdeljenja", idOdeljenja)
                                             .Delete("v").ExecuteWithoutResultsAsync();

                return Ok("Uspesno ste smenili nacelnika");
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("LekarJeNacelnik/{JMBG}")]
        public async Task<ActionResult> LekarJeNacelnik(string JMBG)
        {
            try
            {
                var l = (await _client.Cypher.Match("(l:Lekar)")
                                           .Where((Lekar l) => l.JMBG == JMBG)
                                           .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                var prov = (await _client.Cypher.Match("(l:Lekar)-[v:JE_NACELNIK]->(o:Odeljenje)")
                                               .Where("l.JMBG = $JMBG")
                                               .WithParam("JMBG",JMBG)
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
