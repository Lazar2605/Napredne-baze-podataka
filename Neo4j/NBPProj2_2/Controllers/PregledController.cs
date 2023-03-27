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
    public class PregledController:Controller
    {
        private readonly IGraphClient _client;

        public PregledController(IGraphClient client)
        {
            _client = client;
        }

        [HttpPost]
        [Route("AddPregled/{dijagnoza}/{razlog}/{BZK}/{JMBGLekara}")]
        public async Task<ActionResult> AddPregled(string dijagnoza,string razlog, string BZK, string JMBGLekara)
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
                                           .Where((Lekar l) => l.JMBG == JMBGLekara)
                                           .Return(l => l.As<Lekar>()).ResultsAsync).FirstOrDefault();

                if (l == null)
                {
                    return BadRequest("Ne postoji lekar za zadati JMBG");
                }

                var o = (await _client.Cypher.Match("(l:Lekar)-[:RADI_NA]->(o:Odeljenje)")
                                             .Where("l.JMBG = $JMBGLekara")
                                             .WithParam("JMBGLekara", JMBGLekara)
                                             .Return(o => o.As<Odeljenje>()).ResultsAsync).FirstOrDefault();

                Pregled pregled = new Pregled();

                pregled.Dijagnoza = dijagnoza;
                pregled.DatumPregleda = DateTime.Now.ToShortDateString();
                pregled.Razlog = razlog;
                pregled.Lekar = l.Ime + " " + l.Prezime;

                IDictionary<string, Object> dict = new Dictionary<string, Object>();
                dict.Add("JMBG", JMBGLekara);
                dict.Add("ID", o.ID);
                dict.Add("BZK", BZK);

                await _client.Cypher.Match("(l:Lekar),(o:Odeljenje),(p:Pacijent)")
                                    .Where("l.JMBG = $JMBG AND id(o) = $ID AND p.BrojZdravstveneKnjizice = $BZK")
                                    .Create("(pr:Pregled $info)")
                                    .WithParam("info", pregled)
                                    .WithParams(dict)
                                    .Create("(pr)-[:IZVRSEN_NAD]->(p)")
                                    .Create("(pr)-[:IZVRSEN_NA]->(o)")
                                    .Create("(pr)-[:IZVRSIO]->(l)")
                                    .ExecuteWithoutResultsAsync();



                return Ok("Pregled je uspesno dodat");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
