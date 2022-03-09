using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Cookbook.Models
{
	public class Label
	{
		public int Id { get; set; }
		public string Name { get; set; }

		[JsonIgnore]
		public List<Dish> Dishes { get; set; } = new List<Dish>();
	}
}

