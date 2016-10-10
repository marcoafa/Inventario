//$('#myTabs a').click(function (e) {
//    e.preventDefault()
//    $(this).tab('show')
//})

//$('#agregarComponente').click(function ()
//{
//    alert('Hola');  
   
//    var nuevoComponente = '<button class="btn btn-danger"  type="button" data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false"' 
//    +'aria-controls="collapseExample" style="width:50%;height:50%;">Tipo</button>' 
//    +'<div class="collapse" id="collapseExample1">;<div class="well"> <div class="componente"><select name="" id=""> <option value="volvo">Monitor</option>'
//    + '<option value="saab">Teclado</option> <option value="mercedes">Mouse</option> <option value="audi">Dockin</option> </select> </div> <div class="componente"></div>'
//    + '<div class="componente"></div> <div class="componente"></div> <div class="componente"></div></div></div>';
//    var papa = $('.columna1')[1];
//    $(papa).append($(nuevoComponente));
//});




$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});

$('.titulo').click(function (e){
    var titulo = $(this).text();
    var idHardware = $(this).data('id');
    $('#tituloHardware').text(titulo);
    
    
    

    $('#Hardware').val(idHardware);
    
    
});
 

//$('#FormPrincipal').on('submit',function(e){
//    //e.preventDefault();
//    //alert('lerolero no te fuiste');
//    //Columnas
//    var columnaComponentes = $("#accordion");  
//    var columnaCPU = $(columna2).find("#FormPrincipal");
//    //Numero de Componentes
//    var num = $('accordion').children().length;
//    //Arreglo
//    var listaComponentes = [];
//    //Datos principales de la Compuradora Principal
//    var ComponentUser = $(columnaCPU).find("[name='UserName']").val();
//    var ComponentUserRed = $(columnaCPU).find("[name='UserNetworkName']").val();
//    var ComponentSerial = $(columnaCPU).find("[name='SerialNumber']").val();
//    var ComponentModel = $(columnaCPU).find("[name='Model']").val();
//    //InvoiceID
//    var ComponentNameEquip = $(columnaCPU).find("[name='NameEquip']").val();
//    var ComponentCriticalEquip = $(columnaCPU).find("[name='CriticalEquip']").val();
//    var ComponentArea = parseInt($(columnaCPU).find("#areaID").val());
//    var ComponentMarca = parseInt($(columnaCPU).find("#marcaID").val()); 
//    var TipoHardware = parseInt($(columnaCPU).find("[name='TypeHardwareID']").val());
//    //COMPONENTES    
//    for(var i = 0; i <= num; i++)
//    {
//        TipoHardware =  parseInt($($(columnaComponentes).children())).find(".tipoComponente").val();
//        Serie = $($(columnaComponentes[i])).find(".SerialNumberComponente").val();
//        Marca =  parseInt($($($(columnaComponentes[i])).find(".MarcaComponente")).val());
//        Modelo = $($(columnaComponentes[i])).find(".ModeloComponente").val();         
//            listaComponentes[i]={
//                ComponentUser: ComponentUser,
//                ComponentUserRed: ComponentUserRed,
//                ComponentSerial  :  Serie,
//                ComponentModel :  Modelo,
//                ComponentNameEquip: ComponentNameEquip,
//                ComponentCriticalEquip: ComponentCriticalEquip,
//                ComponentArea : ComponentArea,
//                ComponentMarca : Marca,
//                TipoHardware :TipoHardware,
//                serialAsignacion: ComponentSerial
//            //listaComponentes[i]={
//            //    clUsuario: Usuario,
//            //    clSerie : Serie,
//            //    clModelo : Modelo,
//            //    clNoEquipo: NombreEquipo,
//            //    clEquipoCritico: EquipoCritico,
//            //    clArea : Area,
//            //    clMarca :Marca,
//            //    tipoHardware :TipoHardware,
//            //    serialAsignacion: listaComponentes[0].clSerie
//        }
//    }
//    //Crear Arreglo de Objetos
//    //Url de la Accion
//    var url =  "../Home/GuardarComponentes";
//    listaComponentes = JSON.stringify({ 'listaComponentes': listaComponentes });
//    $.ajax({
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json',
//        async: false,
//        type: 'POST',
//        url: url,
//        data: listaComponentes,
//        success: function (r) {          
//            debugger;
//        },
//        failure: function (response) {          
//            alert('Error Al Guardar');
//        }
//});
//$("#crearComponentes").on('click', function () {
//    }); 
//});


$('#eliminarComponente').click(function(){

    //Columna de los componentes
    var componente = $("#accordion .panel").last()
    componente.remove();
});
$('#agregarComponente').click(function ()
{
    //Columna de los componentes
    var columna = $("#accordion");
  

    //Tamano de los los componentes
    var num = $('#accordion').children().length + 1;

    //Agregar nuevo componente
    var nuevoComponente = `<div class="panel panel-default">
                                    <div class="panel-heading color-header" role="tab" id="headingThree">
                                        <h4 class="panel-title">
                                            <a class="collapsed" role="button" data-toggle="collapse" href="#collapse${num}" aria-expanded="false" aria-controls="collapseThree">
                                                Item #${num}
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapse${num}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                        <!-- CONTENIDO 3--> 
                                        <div class="panel-body">
                                            <!-- TIPO DE HARDWARE-->
                                            <div class="row">
                                                <label class="col-md-3 control-label">Hardware:</label>
                                                <div class="col-md-8 selectContainer">
                                                    <div class="input-group">
                                                        <span class="input-group-addon"><i class="glyphicon glyphicon glyphicon-facetime-video"></i></span>
                                                        <select @*name="TypeHardwareID"*@ class="form-control selectpicker input-lg">
                                                            <option value="">Selecciona un Dispositivo</option>
                                                            @{foreach (var item in Model.listaTypeHardware)
                                            {
                                                if (@item.Description != "Desktop" || @item.Description != "Laptop" || @item.Description != "Server" || @item.Description != "Touch" || @item.Description != "Impresora")
                                                {
                                                    <option value="@item.TypeHardwareID">@item.Description</option>
                                                }
                                            }
                                        }

                                        </select>
                                    </div>
                                    </div>
                                    </div>
                                    <br />

                                    <!-- SERIE-->
                                    <div class="row">

                                        <label class="col-md-3 control-label">Serie:</label>
                                        <div class="col-md-8 inputGroupContainer">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon-barcode"></i></span>
                                                <input type="text" name="Model" class="form-control cajas input-lg" placeholder="Serie">
                                            </div>
                                        </div>

                                    </div>
                                    <br />

                                    <!-- MARCA-->
                                    <div class="row">

                                        <label class="col-md-3 control-label">Marca:</label>
                                        <div class="col-md-8 selectContainer">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon glyphicon-facetime-video"></i></span>
                                                <select @*name="TypeHardwareID"*@ class="form-control selectpicker input-lg">
                                                    <option value="">Selecciona un Dispositivo</option>
                                                                                                @{foreach (var item in Model.listaBrand)
                                            {

                                                <option value="@item.BrandID">@item.Name</option>

                                            }
                                        }

                                        </select>
                                    </div>
                                    </div>

                                    </div>
                                    <br />

                                    <!-- MODELO-->
                                    <div class="row">

                                        <label class="col-md-3 control-label">Modelo:</label>
                                        <div class="col-md-8 inputGroupContainer">
                                            <div class="input-group">
                                                <span class="input-group-addon"><i class="glyphicon glyphicon-tag"></i></span>
                                                <input type="text" name="Model" class="form-control cajas input-lg" placeholder="Modelo">
                                            </div>
                                        </div>

                                    </div>



                                    </div>
                                    </div>
                                    </div>`;

      
      

        var papa = $('#accordion');
        $(papa).append($(nuevoComponente));

    


});

function eventoSelect()
{
    console.log(this);
    var text = $(this).find('option:selected').text();
    var col = $(this).parent().parent().parent().prev();
    col.text(text);
}


$('.columna1:eq(1)').on('change','.selectTipo',eventoSelect);




//autocomplete para facturas

$('.autocomplete').autocomplete({
    serviceUrl: '../Home/Facturas',
    
    //appendTo: $('#divfactura'),
    //orientation: 'top'
});