﻿

$("body").on("click", "#QrFactura", function(e){
    e.preventDefault();
    e.stopPropagation();

    
    debugger;
    //Columnas
    var columna1 = $("#FormPrincipal");

   
    //Componentes de la Compuradora Principal
    var Usuario = $(columna1).find("[name='clUsuario']").val();
    var Serie = $(columna1).find("[name='clSerie']").val();

    //var Modelo = $(columna1).find("[name='clmodelo']").val();

    //var NombreEquipo = $(columna1).find("[name='clnoequipo']").val();
   
    var Area = $($(columna1).find(".pull-left")[0]).text();
  
    var Factura =$(columna1).find("[name='clFactura']").val();
  
    debugger;

    $("#ImagenQR").attr('src','../Home/BarcodeImage?barcodeText='+Usuario+','+Serie+','+Area+','+Factura)
})


$("body").on("click", ".editarFactura", function () {

    var url;
    url = "../Home/EditarFactura?id=" + $(this).data("id");

    $.getJSON(url, function (r) {

      
       
        $('#modalPO').val(r.PO);
        $('#modalNumPedimento').val(r.NumPedimento);       
        $('#modalFolioOriginal').val(r.PO);
      
        

      
    });

});


$("body").on("click", ".editarInvetario", function () {
    
    var url;
    url = "../Home/EditarInventario?id=" + $(this).data("id");
   
    $.getJSON(url, function (r) {
                              
        debugger;
        
        $('#modalSerie').val(r[0].SerialNumber);
        $('#modalUsuario').val(r[0].User);
        $('#modalModelo').val(r[0].Model);
        $('#modalNoEquipo').val(r[0].NameEquip);
        $('#modalEquipoCritico').attr('checked', r[0].CriticEquip);
        $('#modalFactura').val(r[0].Factura);
        //$('#modalMarca').val(r[0].Brand);
        
        $('#modalAreaSelect').val(r[0].idArea).change();
        $('#modalMarcaSelect').val(r[0].idBrand).change();
       
        if (r[0].SerialAsig != null) {
            $('#modalSerieASelect').val(r[0].idSerialA).change();
        }
        else {
            $('#modalSerieASelect').val('N/A').change();
        }
       
        $('#modalhardware').val(r[0].idHardware);
        $('#modalserialorig').val(r[0].SerialNumber);
       
       
    });
   
});

//Eliminar row

$("body").on("click", ".Eliminar", function () {

    if (confirm("Deseas eliminar registro?") == true) {
        var url;
        url = "../Home/Eliminar?id=" + $(this).data("id");

        window.location = url;
    }
});

$("body").on("click", ".EliminarFactura", function () {

    if (confirm("Deseas eliminar registro?") == true) {
        var url;
        url = "../Home/EliminarFactura?id=" + $(this).data("id");

        window.location = url;
    }
});


$(".guardarCambios").on("click", function () {


    $("#f1").submit();
   
});

$(".guardarFactura").on("click", function () {
    var serialFactura = $("#Factura [name='clPO']").val();
    

    var data = new FormData($('#Factura')[0]);
    debugger

    if ($("[name='clPO']").val() == "" || $("[name='clPO']").val() == undefined || $("[name='fileup']").val() =="" || $("[name='fileup']").val() == undefined ) {
        alert("Favor de llenar los campos");
    }
    else {
        //Tomar input del archivo para validar extension pdf

        var archivo = $("#Factura [name='fileup']").val();

        //Tipos de Archivo
        var TiposArchivoValidos = ["pdf"];

        //Extension
        var ext = archivo.substring(archivo.lastIndexOf('.') + 1).toLowerCase();
        
        //Validacion      
        if (ext == TiposArchivoValidos) {
              
              debugger;
                $.ajax({
                    url : "../Home/CrearFactura",
                    data: data,
                    //dataType: "JSON",
                    cache: false,
                    contentType: false,
                    processData: false,
                    assign:false,
                    method: "post",
                    success: function (r) {
               
                        $("[name='clFactura']").val(r);
                        alert("Factura agregada correctamente!!");
                       $("#Factura input:text").each(function (index) {
                           $(this).val("");
                       });



                        $(".close").click();

                    },
                    error: function () {
               
                        alert("Error en la creacion de factura");
                    }
                });
        }
        else
        {
            alert("Favor de Agregar un Archivo Valido");
        }
    }
        
    
   

    

});

////Redirigir al editar Factura
//$("body").on("click", "GuardarFac", function(){
//    debugger;
//    $(".Facturas").click();
//});

$(document).ready(function () {
    $("#Facturas").find(".bs-bars").append(`<button type="button" class="btn btn-default" aria-label="Left Align" data-toggle="modal" data-target="#modal2">
                        <span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span> Agregar
                    </button>`);

});


//Mensajes de alertar por medio de input escondido 
$(document).ready(function () {
    if($('.Ver').val()=='Guardar')
       {
       
        alert('Registro Guardado Exitosamente');
       
      
        }
        else {
            if ($('.Ver').val()== 'Editar') {

              
                alert('Registro Editado Exitosamente');
              
            }
            else
            {
                if ($('.Ver').val() == 'False') {

                    alert('Error al Guardar, verifique los datos');
                }
            }
    }
   

});

