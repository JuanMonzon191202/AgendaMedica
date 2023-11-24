using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class Usuario
    {
        public int Id { get; set; }
        public int IdRol { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Foto { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
        public bool IsActive { get; set; } = true;

        public Rol? Rol { get; set; }

        public ICollection<Paciente>? Pacientes { get; set; } = new HashSet<Paciente>();
        public ICollection<EspecialistaCmc>? EspecialistasCmc { get; set; } =
            new HashSet<EspecialistaCmc>();
        public ICollection<Cita>? CitasPaciente { get; set; } = new HashSet<Cita>();
        public ICollection<Cita>? CitasEspecialista { get; set; } = new HashSet<Cita>();
    }
}
