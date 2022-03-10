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

app.UseHttpsRedirection();
app.UseStaticFiles();
// app.UseSpaStaticFiles();

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
    spa.Options.SourcePath = "ClientApp";

    if (app.Environment.IsDevelopment())
    {
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

        context.Dishes.Add(new Dish
        {
            MealId = 2,
            Name = "Tomato and Egg",
            Labels = new List<Label>
            {
                new Label() {Name = "Stir fry"},
                new Label() {Name = "Healthy"},
                new Label() {Name = "Vegetarian"},
                new Label() {Name = "Quickdish"}
            }
        });

        context.SaveChanges();
    }
}

app.Run();
