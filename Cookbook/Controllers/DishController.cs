#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Cookbook.Data;
using Cookbook.Models;

namespace Cookbook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishController : ControllerBase
    {
        private readonly CookbookContext _context;

        public DishController(CookbookContext context)
        {
            _context = context;
        }

        // GET: api/Dish
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dish>>> GetDishes()
        {
            return await _context.Dishes.Include(d => d.Meal).Include(d => d.Labels).ToListAsync();
        }

        // GET: api/Dish/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Dish>> GetDish(int id)
        {
            var dish = await _context.Dishes.Include(d => d.Meal).Include(d => d.Labels).FirstOrDefaultAsync(d => d.Id == id);

            if (dish == null)
            {
                return NotFound();
            }

            return dish;
        }

        // PUT: api/Dish/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Dish>> PutDish(int id, [FromBody] Dish update)
        {
            if (id != update.Id)
            {
                return BadRequest();
            }

            var existing = await _context.Dishes.FindAsync(id);
            if (existing == null)
            {
                return NotFound();
            }

            existing.MealId = update.MealId;
            existing.Name = update.Name;
            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // POST: api/Dish
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Dish>> PostDish([FromBody] Dish dish)
        {
            _context.Dishes.Add(dish);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDish", new { id = dish.Id }, dish);
        }

        // DELETE: api/Dish/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Dish>> DeleteDish(int id)
        {
            var dish = await _context.Dishes.FindAsync(id);
            if (dish == null)
            {
                return NotFound();
            }

            _context.Dishes.Remove(dish);
            await _context.SaveChangesAsync();

            return Ok(dish);
        }

        // PUT: api/Dish/5/Label/1
        [HttpPut("{dishId}/Label/{labelId}")]
        public async Task<ActionResult<Dish>> PutLabel(int dishId, int labelId)
        {
            var dish = await _context.Dishes.Include(d => d.Meal).Include(d => d.Labels).FirstOrDefaultAsync(d => d.Id == dishId);
            if (dish == null)
            {
                return NotFound();
            }

            var label = await _context.Labels.FindAsync(labelId);
            if(label == null)
            {
                return NotFound();
            }

            dish.Labels.Add(label);
            await _context.SaveChangesAsync();

            return Ok(dish);
        }

        // POST: api/Dish/5/Label
        [HttpPost("{dishId}/Label")]
        public async Task<ActionResult<Dish>> PostLabel(int dishId, [FromBody] Label label)
        {
            var dish = await _context.Dishes.Include(d => d.Meal).Include(d => d.Labels).FirstOrDefaultAsync(d => d.Id == dishId);
            if (dish == null)
            {
                return NotFound();
            }

            if(label.Id != 0)
            {
                return BadRequest($"Use the /api/Dish/{dishId}/Label/{label.Id} route to add existing labels");
            }

            dish.Labels.Add(label);
            await _context.SaveChangesAsync();

            return Ok(dish);
        }

        // Delete: api/Dish/5/Label/1
        [HttpDelete("{dishId}/Label/{labelId}")]
        public async Task<ActionResult<Dish>> DeleteLabel(int dishId, int labelId)
        {
            var dish = await _context.Dishes.Include(d => d.Meal).Include(d => d.Labels).FirstOrDefaultAsync(d => d.Id == dishId);
            if (dish == null)
            {
                return NotFound();
            }

            var label = dish.Labels.FirstOrDefault(l => l.Id == labelId);
            if(label == null)
            {
                return NotFound();
            }

            dish.Labels.Remove(label);
            await _context.SaveChangesAsync();

            return Ok(dish);
        }

        // GET: api/Dish/random
        [HttpGet("random/{mealId}")]
        public async Task<ActionResult<Dish>> GetRandomDish(int mealId, [FromQuery] int[] labelIds)
        {
            var dishes = await _context.Dishes.Include(d => d.Meal).Include(d => d.Labels)
                .Where(d => d.MealId == mealId && d.Labels.Any(l => labelIds.Contains(l.Id)))
                .ToListAsync();

            var dish = dishes.OrderBy(d => new Random().NextInt64())
                .FirstOrDefault();
            if (dish == null)
            {
                return NotFound();
            }

            return dish;
        }
    }
}
