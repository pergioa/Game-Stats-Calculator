using System.Text.Json.Serialization;
using ArcDamageCalculator.Api.Repositories;
using ArcDamageCalculator.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers()                                                                                                                                                                                                                                                                                
    .AddJsonOptions(options =>                                                                                                                                                                                                                                                                                   
    {                                                                                                                                                                                                                                                                                                            
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddCors(fileOptions =>
{
    fileOptions.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=arcdamage.db"));

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IGunRepository, GunRepository>();
builder.Services.AddScoped<IGrenadeRepository, GrenadeRepository>();
builder.Services.AddScoped<IShieldRepository, ShieldRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

if (!context.Guns.Any())
{
    var gunRepo = scope.ServiceProvider.GetRequiredService<IGunRepository>();
    context.Guns.AddRange(gunRepo.GetAll());
    context.SaveChanges();
}

if (!context.Grenades.Any())
{
    var grenadeRepo = scope.ServiceProvider.GetRequiredService<IGrenadeRepository>();
    context.Grenades.AddRange(grenadeRepo.GetAll());
    context.SaveChanges();
}

if (!context.Shields.Any())
{
    var shieldRepo = scope.ServiceProvider.GetRequiredService<IShieldRepository>();
    context.Shields.AddRange(shieldRepo.GetAll());
    context.SaveChanges();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularDev");

app.UseAuthorization();

app.MapControllers();

app.Run();
