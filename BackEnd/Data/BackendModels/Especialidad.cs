using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class Especialidad
    {
        public int Id { get; set; }
        public string NombreEspecialidad { get; set; }

        public ICollection<EspecialidadEspecialista> Especialistas { get; set; }
    }
}
