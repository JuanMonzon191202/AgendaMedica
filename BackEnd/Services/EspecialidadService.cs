using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class EspecialidadService
{
    private readonly CitasContext _context;

    public EspecialidadService(CitasContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Especialidad>> GetAllAsync()
    {
        return await _context.Especialidades.ToListAsync();
    }

    public async Task<Especialidad?> GetByIdAsync(int id)
    {
        return await _context.Especialidades.FindAsync(id);
    }

    public async Task<Especialidad> CreateAsync(Especialidad newEspecialidad)
    {
        _context.Especialidades.Add(newEspecialidad);
        await _context.SaveChangesAsync();

        return newEspecialidad;
    }

    public async Task UpdateAsync(Especialidad especialidad)
    {
        var existingEspecialidad = await GetByIdAsync(especialidad.Id);

        if (existingEspecialidad != null)
        {
            if (especialidad.NombreEspecialidad != null)
            {
                existingEspecialidad.NombreEspecialidad = especialidad.NombreEspecialidad;
            }
            await _context.SaveChangesAsync();
        }
    }
}
