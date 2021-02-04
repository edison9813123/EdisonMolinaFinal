using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace EdisonMolinaFinal.Controllers
{
    [Produces("application/json")]
    [Route("api/Hero")]
    public class HeroesController : Controller
    {
        private static List<molleja> Heroes = new List<molleja>()
        {
            new molleja{ id= 11, name= "Mr. Nice" },
            new molleja{ id= 12, name= "Narco" },
            new molleja{ id= 13, name= "Bombasto" },
            new molleja{ id= 14, name= "Celeritas" },
            new molleja{ id= 15, name= "Magneta" },
            new molleja{ id= 16, name= "RubberMan" },
            new molleja{ id= 17, name= "Dynama" },
            new molleja{ id= 18, name= "Dr IQ" },
            new molleja{ id= 19, name= "Magma" },
            new molleja{ id= 20, name= "Tornado" }
        };

        [HttpGet]
        public IActionResult GetHeroes([FromQuery] string name)
        {
            List<molleja> heroes = Heroes;
            if (!string.IsNullOrEmpty(name?.Trim()))
            {
                heroes = Heroes.Where(h => h.name.ToLowerInvariant()
                .Contains(name.ToLowerInvariant())).ToList();

            }
            return Ok(heroes.OrderByDescending(h => h.id));
        }

        [HttpGet]
        [Route("top")]
        public IActionResult GetTopHeroes()
        {
            return Ok(Heroes.Take(4));
        }

        [HttpGet("{id}", Name = "GetHero")]
        public IActionResult GetHero([FromRoute] int id)
        {
            var hero = Heroes.FirstOrDefault(h => h.id == id);
            if (hero == null)
            {
                return NotFound();
            }
            return Ok(hero);
        }

        [HttpPost]
        public IActionResult CreateMolleja([FromBody] molleja newMolleja)
        {
            if (newMolleja == null)
            {
                return BadRequest();
            }
            newMolleja.id = Heroes.Max(h => h.id) + 1;
            Heroes.Add(newMolleja);
            return CreatedAtRoute("GetHero", new { id = newMolleja.id }, newHero);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMolleja(int id, [FromBody] molleja input)
        {
            if (input == null || input.id != id)
            {
                return BadRequest();
            }

            var hero = Heroes.FirstOrDefault(t => t.id == id);
            if (hero == null)
            {
                return NotFound();
            }

            hero.name = input.name;

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMolleja(int id)
        {
            var hero = Heroes.FirstOrDefault(t => t.id == id);
            if (hero == null)
            {
                return NotFound();
            }

            Heroes.Remove(hero);
            return new NoContentResult();
        }
    }
}