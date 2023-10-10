using Microsoft.EntityFrameworkCore.Metadata.Internal;
using BackEdn.Data;
using BackEdn.Services;
using BackEdn.Data.backendModels;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DBcontext
builder.Services.AddSqlServer<CitasContext>(builder.Configuration.GetConnectionString("BackConnetion"));

// ******** Servicios ********\\ 

builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<RolService>();
builder.Services.AddScoped<PacienteService>();
builder.Services.AddScoped<EspecialistaCmcService>();
builder.Services.AddScoped<EspecialidadEspecialistaService>();
builder.Services.AddScoped<EspecialidadService>();
builder.Services.AddScoped<CitasService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
