using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Cookbook.Models
{
	public class Meal
	{
		[DatabaseGenerated(DatabaseGeneratedOption.None)]
		public int Id { get; set; }
		public string Name { get; set; }
    }
}

