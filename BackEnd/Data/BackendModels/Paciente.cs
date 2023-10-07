using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class Paciente
    {
        public int Id {get;set;}
        public int IdUsuario { get; set; }
        public string Telefono { get; set; }
        public string Genero { get; set; }

        public Usuario? Usuario { get; set; }
        public ICollection<Cita>? Citas { get; set; }
    }
}
