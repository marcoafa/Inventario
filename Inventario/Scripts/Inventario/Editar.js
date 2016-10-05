

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
        $('#componentesHardware').empty();
        $('#modalSerie').val(r.SerialNumber);
        $('#modalUsuario').val(r.UserName);
        $('#modalModelo').val(r.Model);
        $('#modalNoEquipo').val(r.NameEquip);
        $('#modalEquipoCritico').attr('checked', r.CriticEquip);
        $('#modalFactura').val(r.InvoiceID);
        $('#modalMarca').val(r.BrandID);
        
        $('#modalAreaSelect').val(r.AreaID).change();
        $('#modalMarcaSelect').val(r.BrandID).change();
       
        if (r.SerialAssigned != null) {
            $('#modalSerieASelect').val(r.SerialAssigned).change();
        }
        else {
            $('#modalSerieASelect').val('N/A').change();
        }
       
        $('#modalhardware').val(r.idHardware);
        $('#modalserialorig').val(r.SerialNumber);

        if (r.Components.length == 0) {
           // $('#componentesHardware').append("<div class='col-sm-12'><h4 class='text-center'>Empty Components</h4></div>");
        }
        else {
           
            r.Components.forEach(function (value, index) {
                createComponent(value);
            });
        }
     
    });
   
});

//Eliminar row

function createComponent(component)
{
    var structureComponent = `<div class=" col-sm-2">
                                       <label>${component.TypeHardware}</label>
                                    </div>
                                        <div class="col-sm-2">
                                            <label>${component.Brand}</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <label>${component.Model}</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <label>${component.SerialNumber}</label>
                                        </div>

                                        <div class="col-sm-4 text-center">
                                            <button type="button" class="btn btn-success" aria-label="Left Align">
                                                <span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                                            </button>
                                            <button type="button" class="btn btn-danger"  aria-label="Left Align">
                                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                                            </button>
                                        </div>`;

    $('#componentesHardware').append(structureComponent);
}

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


$(document).ready(function () {
    $('#FormPrincipal').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {

            TypeHardware: {
                validators: {
                    notEmpty: {
                        message: 'Seleccione un tipo de dispositivo'
                    }
                }
            },
            UserName: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Por favor, supla un nombre de usuario'
                    }
                }
            },
            UserNetworkName: {
                validators: {
                    stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            //},
            //email: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Please supply your email address'
            //        },
            //        emailAddress: {
            //            message: 'Please supply a valid email address'
            //        }
            //    }
            //},
            //phone: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Please supply your phone number'
            //        },
            //        phone: {
            //            country: 'US',
            //            message: 'Please supply a vaild phone number with area code'
            //        }
            //    }
            //},
            //address: {
            //    validators: {
            //        stringLength: {
            //            min: 8,
            //        },
            //        notEmpty: {
            //            message: 'Please supply your street address'
            //        }
            //    }
            //},
            //city: {
            //    validators: {
            //        stringLength: {
            //            min: 4,
            //        },
            //        notEmpty: {
            //            message: 'Please supply your city'
            //        }
            //    }
            //},
            //state: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Please select your state'
            //        }
            //    }
            //},
            //zip: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Please supply your zip code'
            //        },
            //        zipCode: {
            //            country: 'US',
            //            message: 'Please supply a vaild zip code'
            //        }
            //    }
            //},
            //comment: {
            //    validators: {
            //        stringLength: {
            //            min: 10,
            //            max: 200,
            //            message: 'Please enter at least 10 characters and no more than 200'
            //        },
            //        notEmpty: {
            //            message: 'Please supply a description of your project'
            //        }
            //    }
            }
        }
    })
        .on('success.form.bv', function (e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function (result) {
                console.log(result);
            }, 'json');
        });
});