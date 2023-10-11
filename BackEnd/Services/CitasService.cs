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

        public async Task<IEnumerable<Cita>> GetAllByUserIdAsync(int userId)
        {
            return await _context.Citas.Where(c => c.IdUsuarioPaciente == userId).ToListAsync();
        }

        public async Task<IEnumerable<Cita>> GetAllByEspecialistaIdAsync(int especialistaId)
        {
            return await _context.Citas
                .Where(c => c.IdUsuarioEspecialistaCmc == especialistaId)
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
}
