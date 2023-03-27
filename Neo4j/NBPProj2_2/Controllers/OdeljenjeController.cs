using Microsoft.AspNetCore.Mvc;
using NBPProj2_2.Models;
using Neo4jClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NBPProj2_2.Controllers
{
    public class OdeljenjeController : Controller
    {
        private readonly IGraphClient _client;

        public OdeljenjeController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("AddOdeljenje")]
        public async Task<ActionResult> AddOdeljenje([FromBody] Odeljenje odeljenje)
        {
            try
            {
                if (odeljenje == null)
                {
                    return BadRequest("Nevalidan ulazni parametar");
                }

                var l = (await _client.Cypher.Match("(o:Odeljenje)")
                                            .Where((Odeljenje o) => o.Tip == odeljenje.Tip)
                                            .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (l != null)
                {
                    return BadRequest("Odeljenje vec postoji u bazi");
                }

                await _client.Cypher.Create("(o:Odeljenje $info)")
                                    .WithParam("info", odeljenje)
                                    .ExecuteWithoutResultsAsync();

                l = (await _client.Cypher.Match("(o:Odeljenje)")
                                            .Where((Odeljenje o) => o.Tip == odeljenje.Tip)
                                            .Set("o.ID = id(o)")
                                            .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                return Ok("Odeljenje uspesno dodato");


            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetOdeljenje/{id}")]
        public async Task<ActionResult> GetOdeljenje(int id)
        {
            try
            {
                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == id)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if(o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }

                return Ok(o);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("VratiSvaOdeljenja")]
        public async Task<ActionResult> VratiSvaOdeljenja()
        {
            try
            {
                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                             .Return(o => o.As<Odeljenje>()).ResultsAsync).ToList();
                return Ok(o);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetAllPacijent/{idOdeljenja}")]
        public async Task<ActionResult> GetAllPacijent(int idOdeljenja)
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

                var p = (await _client.Cypher.Match("(p:Pacijent)-[:SMESTEN_NA]->(o:Odeljenje)")
                                            .Where("id(o) = $idOdeljenja")
                                            .WithParam("idOdeljenja",idOdeljenja)
                                            .Return(p => p.As<Pacijent>()).ResultsAsync).ToList();

                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("UpdateOdeljenje")]
        public async Task<ActionResult> UpdateOdeljenje([FromBody] Odeljenje odeljenje)
        {
            try
            {
                var o = (await _client.Cypher.Match("(o:Odeljenje)")
                                           .Where((Odeljenje o) => o.ID == odeljenje.ID)
                                           .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                if (o == null)
                {
                    return BadRequest("Ne postoji odeljenje za zadati ID");
                }

                o.Tip = string.IsNullOrEmpty(odeljenje.Tip) ? o.Tip : odeljenje.Tip;
                o.Kapacitet = odeljenje.Kapacitet == 0 ? o.Kapacitet : odeljenje.Kapacitet;
                o.VremePosete = string.IsNullOrEmpty(odeljenje.VremePosete) ? o.VremePosete : odeljenje.VremePosete;
                o.Sprat = odeljenje.Sprat == 0 ? o.Sprat : odeljenje.Sprat;
                o.BrojZauzetihMesta = odeljenje.BrojZauzetihMesta == 0 ? o.BrojZauzetihMesta : odeljenje.BrojZauzetihMesta;

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("kapacitet", o.Kapacitet);
                dict.Add("vremePosete", o.VremePosete);
                dict.Add("sprat", o.Sprat);
                dict.Add("tip", o.Tip);
                dict.Add("brojZauzetihMesta", o.BrojZauzetihMesta);

                o = (await _client.Cypher.Match("(o:Odeljenje)")
                                            .Where((Odeljenje o) => o.ID == odeljenje.ID)
                                            .Set("o.Kapacitet = $kapacitet , o.VremePosete = $vremePosete , o.Sprat = $sprat , o.Tip = $tip , o.BrojZauzetihMesta = $brojZauzetihMesta")
                                            .WithParams(dict)
                                            .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                return Ok("Uspesno ste izmenili odeljenje");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
