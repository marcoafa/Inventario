using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Inventario.Models;


namespace Inventario.Models
{
    public class InventarioModal
    {
        public List<Area> listaAreas;
      
        public List<Brand> listaBrand;

        public List<TypeHardware> listaTypeHardware;

        public List<Hardware> listaHardware;

        public List<Invoice> listaFacturas;

        public string veriFicacion;
       

        public InventarioModal()
        {
            InventoryBDMEntities inv = new InventoryBDMEntities();

            listaAreas = (from a in inv.Areas
                          select a).ToList();

            listaBrand = (from a in inv.Brands
                          select a).ToList();

            listaTypeHardware = (from a in inv.TypeHardwares
                                 select a).ToList();

             listaHardware = (from a in inv.Hardwares
                          select a).ToList();


            listaFacturas = (from a in inv.Invoices
                          select a).ToList();

             veriFicacion = "";
            
            

        }

    }
}