namespace BackEdn.Services;

using BackEdn.Data;
using BackEdn.Data.backendModels;
using Microsoft.AspNetCore.Mvc;

public class EspecialidadService
{
    private readonly CitasContext _context;

    public EspecialidadService(CitasContext context)
    {
        _context = context;
    }

    public IEnumerable<Especialidad> GetAll()
    {
        return _context.Especialidades.ToList();
    }

    public Especialidad? GetById(int id)
    {
        return _context.Especialidades.Find(id);
    }

    public Especialidad Create(Especialidad newEspecialidad)
    {
        _context.Especialidades.Add(newEspecialidad);
        _context.SaveChanges();

        return newEspecialidad;
    }

    public void Update(Especialidad especialidad)
    {
        var existingEspecialidad = GetById(especialidad.Id);

        if (existingEspecialidad != null)
        {
            if (especialidad.NombreEspecialidad != null)
            {
                existingEspecialidad.NombreEspecialidad = especialidad.NombreEspecialidad;
            }
            _context.SaveChanges();
        }
    }
}
