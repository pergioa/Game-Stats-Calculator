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
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddScoped<IGunRepository, GunRepository>();
builder.Services.AddScoped<IGrenadeRepository, GrenadeRepository>();
builder.Services.AddScoped<IShieldRepository, ShieldRepository>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowAngularDev");
app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

app.Run();
