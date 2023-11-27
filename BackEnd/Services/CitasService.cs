using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BackEdn.Data;
using BackEdn.Data.backendModels;

namespace BackEdn.Services
{
    public class CitasService
    {
        private readonly CitasContext _context;

        public CitasService(CitasContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cita>> GetAllAsync()
        {
            return await _context.Citas.ToListAsync();
        }

        public async Task<Cita?> GetByIdAsync(int id)
        {
            return await _context.Citas.FindAsync(id);
        }

        public async Task<IEnumerable<CitaInfo>> GetAllByUserIdAsync(int userId)
        {
            return await _context.Citas
                .Include(c => c.Paciente)
                .Include(c => c.EspecialistaCmc)
                .Where(c => c.IdUsuarioPaciente == userId)
                .Select(
                    c =>
                        new CitaInfo
                        {
                            Id = c.Id,
                            HoraCita = c.HoraCita,
                            Fecha = c.Fecha,
                            Status = c.Status,
                            EspecialistaCmc = new UsuarioInfo //en esta parte no tiene que ser asi?
                            {
                                Nombre =
                                    c.EspecialistaCmc != null
                                        ? c.EspecialistaCmc.Nombre
                                        : c.EspecialistaCmc.Nombre,
                                Apellido =
                                    c.EspecialistaCmc != null
                                        ? c.EspecialistaCmc.Apellido
                                        : c.EspecialistaCmc.Apellido,
                                Email =
                                    c.EspecialistaCmc != null
                                        ? c.EspecialistaCmc.Email
                                        : c.EspecialistaCmc.Email,
                            },
                            Paciente = new PacienteInfo
                            {
                                Nombre = c.Paciente.Nombre,
                                Apellido = c.Paciente.Apellido,
                                Email = c.Paciente.Email,
                            }
                        }
                )
                .ToListAsync();
        }

        public async Task<IEnumerable<CitaInfo>> GetAllByEspecialistaIdAsync(int especialistaId)
        {
            return await _context.Citas
                .Where(c => c.IdUsuarioEspecialistaCmc == especialistaId)
                .Select(
                    c =>
                        new CitaInfo
                        {
                            Id = c.Id,
                            HoraCita = c.HoraCita,
                            Fecha = c.Fecha,
                            Status = c.Status,
                            EspecialistaCmc = new UsuarioInfo //en esta parte no tiene que ser asi?
                            {
                                Nombre =
                                    c.EspecialistaCmc != null
                                        ? c.EspecialistaCmc.Nombre
                                        : c.EspecialistaCmc.Nombre,
                                Apellido =
                                    c.EspecialistaCmc != null
                                        ? c.EspecialistaCmc.Apellido
                                        : c.EspecialistaCmc.Apellido,
                                Email =
                                    c.EspecialistaCmc != null
                                        ? c.EspecialistaCmc.Email
                                        : c.EspecialistaCmc.Email,
                            },
                            Paciente = new PacienteInfo
                            {
                                Nombre = c.Paciente.Nombre,
                                Apellido = c.Paciente.Apellido,
                                Email = c.Paciente.Email,
                            }
                        }
                )
                .ToListAsync();
        }

        public async Task<Cita> CreateAsync(Cita newCita)
        {
            _context.Citas.Add(newCita);
            await _context.SaveChangesAsync();

            return newCita;
        }

        public async Task UpdateAsync(Cita cita)
        {
            var existingcita = await GetByIdAsync(cita.Id);

            if (existingcita != null)
            {
                if (cita.IdUsuarioPaciente != 0)
                {
                    existingcita.IdUsuarioPaciente = cita.IdUsuarioPaciente;
                }
                if (cita.IdUsuarioEspecialistaCmc != 0)
                {
                    existingcita.IdUsuarioEspecialistaCmc = cita.IdUsuarioEspecialistaCmc;
                }
            }

            await _context.SaveChangesAsync();
        }
    }

    public class CitaInfo
    {
        public int Id { get; set; }
        public DateTime HoraCita { get; set; }
        public DateTime Fecha { get; set; }
        public string Status { get; set; }
        public PacienteInfo Paciente { get; set; }
        public UsuarioInfo EspecialistaCmc { get; internal set; }
    }

    public class PacienteInfo
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
    }

    public class EspecialistaCmcInfo
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
    }

    public class UsuarioInfo
    {
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Email { get; set; }
    }
}
