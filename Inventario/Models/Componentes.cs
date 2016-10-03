using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class Componentes
    {
        public string clUsuario { get; set; }
        public string clSerie { get; set; }
        public string clModelo { get; set; }
        public string clNoEquipo { get; set; }
        public string clEquipoCritico { get; set; }
        public int clArea { get; set; }
        public int clMarca { get; set; }
        public int tipoHardware { get; set; }
        public string serialAsignacion { get; set; }
    }
    
}