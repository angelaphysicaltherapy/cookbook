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
    public class LabelController : ControllerBase
    {
        private readonly CookbookContext _context;

        public LabelController(CookbookContext context)
        {
            _context = context;
        }

        // GET: api/Label
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Label>>> GetLabels()
        {
            return await _context.Labels.Include(l=>l.Dishes).ToListAsync();
        }

        // GET: api/Label/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Label>> GetLabel(int id)
        {
            var label = await _context.Labels.FindAsync(id);

            if (label == null)
            {
                return NotFound();
            }

            return label;
        }

        // PUT: api/Label/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabel(int id, Label label)
        {
            if (id != label.Id)
            {
                return BadRequest();
            }

            _context.Entry(label).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Label
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Label>> PostLabel(Label label)
        {
            _context.Labels.Add(label);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLabel), new { id = label.Id }, label);
        }

        // DELETE: api/Label/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabel(int id)
        {
            var label = await _context.Labels.FindAsync(id);
            if (label == null)
            {
                return NotFound();
            }

            _context.Labels.Remove(label);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LabelExists(int id)
        {
            return _context.Labels.Any(e => e.Id == id);
        }
    }
}
