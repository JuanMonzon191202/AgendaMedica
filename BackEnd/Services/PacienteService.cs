namespace BackEdn.Services;

using Microsoft.EntityFrameworkCore;
using BackEdn.Services;
using BackEdn.Data.backendModels;
using BackEdn.Data;

public class PacienteService
{
    public readonly CitasContext _context;

    public PacienteService(CitasContext context)
    {
        _context = context;
    }

    public IEnumerable<Paciente> GetAll()
    {
        var pacientesConUsuarios = _context.Pacientes.Include(p => p.Usuario).ToList();

        return pacientesConUsuarios;
    }

    public Paciente? GetById(int id)
    {
        return _context.Pacientes.Find(id);
    }

    public Paciente Create(Paciente newPaciente)
    {
        _context.Pacientes.Add(newPaciente);
        _context.SaveChanges();

        return newPaciente;
    }

    public void Update(Paciente paciente)
    {
        var existingPaciente = GetById(paciente.Id);

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
        _context.SaveChanges();
    }
}
