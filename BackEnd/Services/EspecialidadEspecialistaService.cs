using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class EspecialidadEspecialistaService
{
    private readonly CitasContext _context;

    public EspecialidadEspecialistaService(CitasContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EspecialidadEspecialista>> GetAllAsync()
    {
        return await _context.EspecialidadesEspecialistas.ToListAsync();
    }

    public async Task<EspecialidadEspecialista> GetByIdAsync(int id)
    {
        return await _context.EspecialidadesEspecialistas.SingleOrDefaultAsync(e => e.IdEspecialistaCmc == id);
    }

    public async Task<EspecialidadEspecialista> CreateAsync(EspecialidadEspecialista newEspecialidadEspecialista)
    {
        _context.EspecialidadesEspecialistas.Add(newEspecialidadEspecialista);
        await _context.SaveChangesAsync();

        return newEspecialidadEspecialista;
    }

    public async Task UpdateAsync(EspecialidadEspecialista especialidadEspecialista)
    {
        var existingEsp = await GetByIdAsync(especialidadEspecialista.Id);

        if (existingEsp == null)
        {
            throw new ArgumentException(
                $"EspecialidadEspecialista con ID {especialidadEspecialista.Id} no encontrado."
            );
        }

        if (especialidadEspecialista.IdEspecialidad != null)
        {
            existingEsp.IdEspecialidad = especialidadEspecialista.IdEspecialidad;
        }

        await _context.SaveChangesAsync();
    }
}
