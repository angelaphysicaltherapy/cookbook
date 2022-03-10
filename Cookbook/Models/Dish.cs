using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cookbook.Models
{
	public class Dish
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public int MealId { get; set; }
        public Meal? Meal { get; set; }
        public List<Label>? Labels { get; set; }
    }
}

