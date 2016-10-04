using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventario.Models;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using Gma.QrCodeNet.Encoding;
using Gma.QrCodeNet.Encoding.Windows.Render;

namespace Inventario.Controllers
{
    public class HomeController : Controller
    {
        

        InventoryBDMEntities entidad = new InventoryBDMEntities();

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
        public ActionResult BarcodeImage(String barcodeText)
        {
            // generating a barcode here. Code is taken from QrCode.Net library
            QrEncoder qrEncoder = new QrEncoder(ErrorCorrectionLevel.H);
            QrCode qrCode = new QrCode();
            qrEncoder.TryEncode(barcodeText, out qrCode);
            GraphicsRenderer renderer = new GraphicsRenderer(new FixedModuleSize(4, QuietZoneModules.Four), Brushes.Black, Brushes.White);

            Stream memoryStream = new MemoryStream();
            renderer.WriteToStream(qrCode.Matrix, ImageFormat.Png, memoryStream);

            // very important to reset memory stream to a starting position, otherwise you would get 0 bytes returned
            memoryStream.Position = 0;

            var resultStream = new FileStreamResult(memoryStream, "image/png");
            resultStream.FileDownloadName = String.Format("{0}.png", barcodeText);

            return resultStream;
        }
        public ActionResult EditarInventario(string id)
        {
           
                var registro = (from p in entidad.Hardwares
                                where p.SerialNumber == id
                                select new
                                {
                                    SerialNumber = p.SerialNumber,
                                    User = p.UserName,
                                    Model = p.Model,
                                    NameEquip = p.NameEquip,
                                    CriticEquip = p.CriticEquip,
                                    Factura = p.InvoiceID,
                                    idArea = p.AreaID,
                                    idBrand = p.BrandID,
                                    idSerialA = p.SerialAssigned,
                                    idHardware = p.TypeHardwareID

                                }).ToList();
            
           
            return Json(registro, JsonRequestBehavior.AllowGet);
        }
        public ActionResult EditarFactura(string id)
        {

            var registro = (from p in entidad.Invoices
                            where p.PO == id
                            select new
                            {
                               
                                PO = p.PO,
                                NumPedimento = p.RequestDocument,
                               
                            });

            //var fechaFactura = (from f in registro select f.FechaFac).FirstOrDefault().ToString("yyyy-MM-dd");
            var r = (from f in registro
                    select new
                    {
                        
                        PO = f.PO,
                        NumPedimento = f.NumPedimento
                       
                    }).FirstOrDefault();
            

            return Json(r, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Eliminar(string id)
        {
            try
            {
                var registro = (from p in entidad.Hardwares
                                where p.SerialNumber == id
                                select p).FirstOrDefault();



                var Equipos = (from p in entidad.Hardwares
                                where p.SerialAssigned == id
                                select p).ToList();

                foreach (var a in Equipos)
                {
                    a.SerialAssigned = null;
                }

                entidad.SaveChanges();

                entidad.Hardwares.Remove(registro);

                entidad.SaveChanges();
                Response.Write("<script>alert('Registro Eliminado con exito'); </script>");
                return RedirectToAction("inventario");

            }
            catch(Exception ex)
            {
                Response.Write("<script>alert('Error al Eliminar El Registro "+ ex.Message + "');</script>");
                return RedirectToAction("inventario");
            }
        }
        public ActionResult EliminarFactura(string id)
        {
            try
            {
                var factura = (from p in entidad.Invoices
                                where p.PO == id
                                select p).FirstOrDefault();



                entidad.Invoices.Remove(factura);

                entidad.SaveChanges();
                Response.Write("<script>alert('Registro Eliminado con exito'); </script>");
                return RedirectToAction("inventario");

            }
            catch (Exception ex)
            {
                Response.Write("<script>alert('Error al Eliminar El Registro, " + ex.Message + "'); </script>");
                return RedirectToAction("inventario");
            }
        }
        public ActionResult inventario()
        {
            
            if (Session["nombre"] == null)
            {
                return View("Index");
            }
            else
            {

                InventarioModal ent = new InventarioModal();

                if (TempData["verificacion"] != null)
                {
                    ent.veriFicacion = TempData["verificacion"].ToString();
                }

                return View(ent);
            }
        }
        //Guardar registro de un solo item
        public ActionResult Registro(string clUsuario, string clSerie, string clModelo, string clNoEquipo, string clEquipoCritico, int clArea, int clMarca, int tipoHardware, string clSerialAsignar, string clFactura)
        {
            bool criticoOpcion;
            

            if(clEquipoCritico=="on")
            {
                criticoOpcion = true;
            }
            else
            {
                criticoOpcion = false;
                    
            }

            if (clSerialAsignar == "" || clSerialAsignar == null || clSerialAsignar == "N/A")
                clSerialAsignar = null;

            if (clFactura == "" || clFactura == null || clFactura == "N/A")
                clFactura = null;
            try
            {
                Hardware H = new Hardware
                {
                    SerialNumber = clSerie,
                    Model = clModelo,
                    BrandID = clMarca,
                    TypeHardwareID = tipoHardware,
                    AreaID = clArea,
                    InvoiceID = clFactura,
                    UserName = clUsuario,
                    UserNetworkName = clUsuario,
                    NameEquip = clNoEquipo,
                    CriticEquip = criticoOpcion,
                    SerialAssigned = null

                };
               
               
                entidad.Hardwares.Add(H);
                entidad.SaveChanges();
               
                TempData["verificacion"] = "Guardar";
               
            }
            catch (Exception)
            {
                TempData["verificacion"] = "False";
                
            }

        


                return RedirectToAction("inventario");
        }
        //Guardar registro de un item con varios componentes
        public ActionResult GuardarComponentes(List<Componentes> listaComponentes)
        {
            bool criticoOpcion;

            try
            {
                foreach (var item in listaComponentes)
                {
                    if (item.clEquipoCritico == "on")
                    {
                        criticoOpcion = true;
                    }
                    else
                    {
                        criticoOpcion = false;

                    }

                    if (item.clSerie != null)
                    {
                        Hardware H = new Hardware
                        {
                            SerialNumber = item.clSerie,
                            Model = item.clModelo,
                            BrandID = item.clMarca,
                            TypeHardwareID = item.tipoHardware,
                            AreaID = item.clArea,
                            InvoiceID = null,
                            UserName = item.clUsuario,
                            NameEquip = item.clNoEquipo,
                            CriticEquip = criticoOpcion,
                            SerialAssigned = item.serialAsignacion
                        };
                        entidad.Hardwares.Add(H);
                        entidad.SaveChanges();
                       
                    }
                }
               
                return Json("Registro guardado!",JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                
                return Json("Registro guardado con falta de componentes!, " + ex.Message,JsonRequestBehavior.AllowGet);
            }




           
        }
        public ActionResult RegistroEditar(string clUsuario, string clSerie, string clModelo, string clNoEquipo, string clEquipoCritico, int clArea, int clMarca, int tipoHardware, string clSerialAsignar, string serialoriginal, int? clFactura)
        {
            bool criticoOpcion;
            if(clEquipoCritico=="on")
            {
                criticoOpcion = true;
            }
            else
            {
                criticoOpcion = false;
                    
            }

            

            if (clSerialAsignar == "" || clSerialAsignar == null || clSerialAsignar == "N/A")
                clSerialAsignar = null;
            // Consultar hardware asignados a ese serial y ponerlos en null
            var asignados = (from h in entidad.Hardwares
                            where h.SerialAssigned == serialoriginal
                            select h).ToList();
            try
            {
                foreach (var a in asignados)
                {
                    a.SerialAssigned = null;
                }
                entidad.SaveChanges();
                // Actualizar hardware principal
                var updateReg = entidad.Database.ExecuteSqlCommand("UPDATE Hardware SET SerialNumber = {0}, Model = {1}, BrandID = {2}, TypeHardwareID = {3}, AreaID = {4}, InvoiceID = {10}, [User] = {5}, NameEquip = {6}, CriticEquip = {7}, SerialAssigned = {8} where SerialNumber = {9}", clSerie, clModelo, clMarca, tipoHardware, clArea, clUsuario, clNoEquipo, criticoOpcion, clSerialAsignar, serialoriginal, clFactura);

                // Reasignar serial a hardware asignados
                foreach (var a in asignados)
                {
                    a.SerialAssigned = clSerie;
                }
                entidad.SaveChanges();
                TempData["verificacion"] = "Editar";
            }
            catch (Exception)
            {
                TempData["verificacion"] = "False";
            }
            //var registro = (from p in entidad.Hardwares
            //                where p.SerialNumber == serialoriginal
            //                select p).FirstOrDefault();
                       
            //                 registro.SerialNumber = clSerie;
            //                 registro.User = clUsuario;
            //                 registro.Model = clModelo;
            //                 registro.NameEquip = clNoEquipo;
            //                 registro.CriticEquip = criticoOpcion;
            //                 registro.AreaID = clArea;
            //                 registro.BrandID = clMarca;
            //                 registro.SerialAssigned = clSerialAsignar;
            //                 registro.TypeHardwareID = tipoHardware;


                
            //entidad.SaveChanges();

               

            return RedirectToAction("inventario");
        }
        public ActionResult RegistroEditarFactura(string POModal, string NumPedimentoModal, string POOriginal)
        {


            //var dia = modalFechaFac.Date;

           
          
            var factura = (from h in entidad.Invoices
                           where h.PO == POOriginal
                             select h).FirstOrDefault();
            try
            {

                var updateReg = entidad.Database.ExecuteSqlCommand("UPDATE Invoice SET PO = {0}, RequestDocument = {1} where PO = {2}", POModal, NumPedimentoModal, POOriginal);
            
                entidad.SaveChanges();

                TempData["verificacion"] = "Editar";
            }
            catch (Exception)
            {
                TempData["verificacion"] = "False";
            }
            //var registro = (from p in entidad.Hardwares
            //                where p.SerialNumber == serialoriginal
            //                select p).FirstOrDefault();

            //                 registro.SerialNumber = clSerie;
            //                 registro.User = clUsuario;
            //                 registro.Model = clModelo;
            //                 registro.NameEquip = clNoEquipo;
            //                 registro.CriticEquip = criticoOpcion;
            //                 registro.AreaID = clArea;
            //                 registro.BrandID = clMarca;
            //                 registro.SerialAssigned = clSerialAsignar;
            //                 registro.TypeHardwareID = tipoHardware;



            //entidad.SaveChanges();



            return RedirectToAction("inventario");
        }

        public ActionResult CrearFactura(string clPO, string clNumPedimento, HttpPostedFileBase fileup)
        {

            //var dia = FechaFactura.Date;
            int size=0;
            if (fileup != null)
            {
                size = fileup.ContentLength;
                size = (size / 1024) / 1024;
            }
           
            if (size <= 10)
            {

                //Armar Path para guardar archivos
                string path = "../Archivos/" + fileup.FileName.ToLower();
                string savePath = Server.MapPath(path.ToLower());
               

                    Invoice I = new Invoice
                    {
                       
                        PO = clPO,
                        RequestDocument = clNumPedimento,
                        rutaArchivo = path
                    };
                try
                {
                    fileup.SaveAs(savePath);
                    entidad.Invoices.Add(I);
                    entidad.SaveChanges();

                    
                }
                catch (Exception)
                {
                    Response.Write("<script>alert('Error al guardar la información.');</script>");
                }
              return Json(I.PO, JsonRequestBehavior.AllowGet);
            }
            else
            {
                Response.Write("<script>alert('Favor de sólo adjuntar un archivo de tamaño menor a 10MB.');</script>");
                return new EmptyResult();
            }
           

           
        }
        public ActionResult Facturas()
        {
            suggestion sug = new suggestion();

            var registro = (from b in entidad.Invoices
                                select b.PO).ToList();

            sug.suggestions = registro.ConvertAll(x => x.ToString()).ToArray();

            return Json(sug, JsonRequestBehavior.AllowGet);
        }
        public ActionResult Login(string username, string password)
        {
           
            UserVerification LogIn = new UserVerification();
            UserPrincipal usuario = LogIn.ValidateADUser(username, password);

            if (usuario != null)//si tiene valor guardar en variable de sesion
            {


                var usuariosSistemas = (from a in entidad.Responsables
                                        where a.username == usuario.SamAccountName
                                        select a.username).FirstOrDefault();
                if (usuariosSistemas != null)
                {
                    Session["nombre"] = usuario.Name;
                    return RedirectToAction("inventario");
                }
                else
                {
                    Response.Write("<script>alert('No tienes permisos para entrar'); </script>");
                    return View("home");
                }




            }
            else
            {
                Response.Write("<script>alert('Password o Usuario Incorrecto'); </script>");
                return View("Index");
            }
        }
    }
    
}
