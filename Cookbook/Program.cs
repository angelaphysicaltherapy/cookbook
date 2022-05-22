using Cookbook.Data;
using Cookbook.Models;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/build";
});
builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddDbContext<CookbookContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("CookbookContext")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the HTTP request pipeline.
var app = builder.Build();

// app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(configure => configure.MapControllers());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp/build";

    if (app.Environment.IsDevelopment())
    {
        spa.Options.SourcePath = "ClientApp";
        spa.UseReactDevelopmentServer(npmScript: "start");
    }
});

using (var scope = app.Services.CreateScope())
{
    using var context = scope.ServiceProvider.GetRequiredService<CookbookContext>();
    context.Database.EnsureCreated();
    if (!context.Meals.Any())
    {
        context.Meals.AddRange(new[]
        {
            new Meal() {Id = 1, Name = "Breakfast"},
            new Meal() {Id = 2, Name = "Lunch"},
            new Meal() {Id = 3, Name = "Dinner"}
        });

        var vegetarian = new Label() {Name = "Vegetarian"};
        context.Labels.Add(vegetarian);
        context.SaveChanges();

        context.Dishes.AddRange(new Dish[]
        {
            new Dish(){
            MealId = 1,
            Name = "Tomato and Egg",
            Labels = new List<Label>
                {
                new Label() {Name = "Stir fry"},
                vegetarian,
                new Label() {Name = "Quickdish"}
                }
            },

            new Dish() {
                MealId=1,
                Name= "Shiitake Bun",
                // Labels = [{name:"Vegetarian", id : 3}, new Label() {Name="Blue"}]
                Labels = new List<Label>
                {
                    vegetarian,
                    new Label() {Name="Blue"}

                }
            }
        });

        context.SaveChanges();
    }
}

app.Run();
