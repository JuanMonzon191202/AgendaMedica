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
        var especialidadEspecialista =
            await _context.EspecialidadesEspecialistas.SingleOrDefaultAsync(
                e => e.IdEspecialistaCmc == id
            );

        if (especialidadEspecialista == null)
        {
            Console.WriteLine($"EspecialidadEspecialista con ID {id} no encontrado.");
        }

        return especialidadEspecialista;
    }

    public async Task<EspecialidadEspecialista> CreateAsync(
        EspecialidadEspecialista newEspecialidadEspecialista
    )
    {
        // Verificar duplicados antes de agregar
        var existing = await _context.EspecialidadesEspecialistas.FirstOrDefaultAsync(
            e =>
                e.IdEspecialidad == newEspecialidadEspecialista.IdEspecialidad
                && e.IdEspecialistaCmc == newEspecialidadEspecialista.IdEspecialistaCmc
        );

        if (existing != null)
        {
            return null;
        }

        _context.EspecialidadesEspecialistas.Add(newEspecialidadEspecialista);
        await _context.SaveChangesAsync();

        return newEspecialidadEspecialista;
    }

    public async Task UpdateAsync(EspecialidadEspecialista especialidadEspecialista)
    {
        var existingEsp = await GetByIdAsync(especialidadEspecialista.Id);

        if (existingEsp != null)
        {
            // Copiar otros campos si es necesario
            existingEsp.IdEspecialidad = especialidadEspecialista.IdEspecialidad;

            await _context.SaveChangesAsync();
        }
    }
}
