using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class Cita
    {
        public int Id { get; set; }
        public int IdUsuarioPaciente { get; set; }
        public int IdUsuarioEspecialistaCmc { get; set; }
        public DateTime HoraCita { get; set; }
        public DateTime Fecha { get; set; }
        public string Status { get; set; }

        public Usuario? Paciente { get; set; }
        public Usuario? EspecialistaCmc { get; set; }
    }
}
