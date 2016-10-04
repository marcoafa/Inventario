using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class hardwareWithComnponents
    {
        public Hardware hardware{get;set;}
        public List<Hardware> components{get;set;}

    }
}