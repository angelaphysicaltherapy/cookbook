using System;
using Cookbook.Models;
using Microsoft.EntityFrameworkCore;

namespace Cookbook.Data
{
	public class CookbookContext: DbContext
    {
        public CookbookContext(DbContextOptions<CookbookContext> options)
          : base(options)
       { 
        }

        public DbSet<Dish> Dishes { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Label> Labels { get; set; }
    }
}
