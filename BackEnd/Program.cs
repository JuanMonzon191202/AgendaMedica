using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using BackEdn.Services;
using BackEdn.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System
            .Text
            .Json
            .Serialization
            .ReferenceHandler
            .Preserve;
    });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DBcontext
builder.Services.AddSqlServer<CitasContext>(
    builder.Configuration.GetConnectionString("BackConnetion")
);

// ******** Servicios ********\\

builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<RolService>();
builder.Services.AddScoped<PacienteService>();
builder.Services.AddScoped<EspecialistaCmcService>();
builder.Services.AddScoped<EspecialidadEspecialistaService>();
builder.Services.AddScoped<EspecialidadService>();
builder.Services.AddScoped<CitasService>();
// builder.Services.AddScoped<UsuarioService>(); // Asegúrate de registrar UsuarioService si aún no lo has hecho
builder.Services.AddScoped<AuthService>(_ => new AuthService("zXB1vrgVMYuio4Z4fxEAL8w7aVI1ZBDkLvqRLA2U", _.GetService<UsuarioService>()));



// Configuración de la autenticación JWT
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes("zXB1vrgVMYuio4Z4fxEAL8w7aVI1ZBDkLvqRLA2U")
            ),
            ValidateIssuer = false,
            ValidateAudience = false,
           
        };
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Añade autenticación al pipeline
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
