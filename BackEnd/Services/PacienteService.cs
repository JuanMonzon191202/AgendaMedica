using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEdn.Services
{
    public class PacienteService
    {
        private readonly CitasContext _context;

        public PacienteService(CitasContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Paciente>> GetAllAsync()
        {
            var pacientesConUsuarios = await _context.Pacientes.Include(p => p.Usuario).ToListAsync();

            return pacientesConUsuarios;
        }

        public async Task<Paciente?> GetByIdAsync(int id)
        {
            return await _context.Pacientes.FindAsync(id);
        }

        public async Task<Paciente> CreateAsync(Paciente newPaciente)
        {
            _context.Pacientes.Add(newPaciente);
            await _context.SaveChangesAsync();

            return newPaciente;
        }

        public async Task UpdateAsync(Paciente paciente)
        {
            var existingPaciente = await GetByIdAsync(paciente.Id);

            if (existingPaciente != null)
            {
                if (paciente.Telefono != null)
                {
                    existingPaciente.Telefono = paciente.Telefono;
                }
                if (paciente.Genero != null)
                {
                    existingPaciente.Genero = paciente.Genero;
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
