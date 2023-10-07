using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackEdn.Data.backendModels
{
    public class Rol
    {
        public int Id { get; set; }
        public string NombreRol { get; set; }
    }
}
