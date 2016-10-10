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
 

$('#GuardarEquipo').click(function(){
    
    //Columna principal del hardware
    var columnaHardware= $("#FormPrincipal");  

    //Propiedades del Hardware
    var UserH = $(columnaHardware).find("[name='UserName']").val();
    var UserHNetwork = $(columnaHardware).find("[name='UserNetworkName']").val();
    var SerialH = $(columnaHardware).find("[name='SerialNumber']").val();
    var ModelH = $(columnaHardware).find("[name='Model']").val();
    var NameEqH = $(columnaHardware).find("[name='NameEquip']").val();
    var CriticalEquipH =   $(columnaHardware).find("[name='CriticalEquip']").val();

    if(CriticalEquipH=="on")
        var CriticEquip = true;
    else
        var CriticEquip = false;

    var DivisionH =   parseInt($(columnaHardware).find("[name='DivisionID']").val());
    var AreaH =  parseInt($(columnaHardware).find("[name='AreaID']").val());
    var SubAreaH = parseInt($(columnaHardware).find("[name='SubAreaID']").val());
    var BrandH = parseInt($(columnaHardware).find("[name='BrandID']").val());
    var TipoHardwareH = parseInt($(columnaHardware).find("[name='TypeHardwareID']").val());
    var FacturaH = $(columnaHardware).find("[name='InvoiceID']").val();
    if (FacturaH == "" || FacturaH == null || FacturaH == "N/A")
        FacturaH = null;

    var Hardware ={
        'SerialNumber' : SerialH,
        'Model' : ModelH,
        'BrandID' : BrandH,
        'TypeHardwareID' : TipoHardwareH,
        'DivisionID' : null,
        'AreaID' : AreaH,
        'SubAreaID' :  null,
        'InvoiceID' : FacturaH,
        'UserName': UserH,
        'UserNetworkName' :UserHNetwork ,
        'NameEquip' : NameEqH,
        'CriticEquip' :  CriticEquip,
        'SerialAssigned': null



    };
  
    
   


    //Columna principal de los Componentes del Hardware
    var columnaComponentes = $("#accordion");  
  
    //Numero de Componentes
    var num = $('accordion').children().length;
    //Arreglo
    var listaComponentes = [];
    //Datos principales de la Compuradora Principal
    var ComponentUser = $(columnaComponentes).find("[name='UserName']").val();
    var ComponentUserRed = $(columnaComponentes).find("[name='UserNetworkName']").val();
    var ComponentSerial = $(columnaComponentes).find("[name='SerialNumber']").val();
    var ComponentModel = $(columnaComponentes).find("[name='Model']").val();
    //InvoiceID
    var ComponentNameEquip = $(columnaComponentes).find("[name='NameEquip']").val();
    var ComponentCriticalEquip = $(columnaComponentes).find("[name='CriticalEquip']").val();
    var ComponentArea = parseInt($(columnaComponentes).find("#areaID").val());
    var ComponentMarca = parseInt($(columnaComponentes).find("#marcaID").val()); 
    var TipoHardware = parseInt($(columnaComponentes).find("[name='TypeHardwareID']").val());
    //COMPONENTES    

    for(var i = 0; i <= num; i++)
    {
        TipoHardware =  parseInt($(columnaComponentes).children().find(".tipoComponente").val());
        Serie = $($(columnaComponentes[i])).find(".SerialNumberComponente").val();
        Marca =  parseInt($($($(columnaComponentes[i])).find(".MarcaComponente")).val());
        Modelo = $($(columnaComponentes[i])).find(".ModeloComponente").val();         
            listaComponentes[i]={
                ComponentUser: ComponentUser,
                ComponentUserRed: ComponentUserRed,
                ComponentSerial  :  Serie,
                ComponentModel :  Modelo,
                ComponentNameEquip: ComponentNameEquip,
                ComponentCriticalEquip: ComponentCriticalEquip,
                ComponentArea : ComponentArea,
                ComponentMarca : Marca,
                TipoHardware :TipoHardware,
                serialAsignacion: ComponentSerial
          
        }
    }
    //Crear Arreglo de Objetos
    //Url de la Accion
    var url =  "../Home/GuardarComponentes";
    //listaComponentes = JSON.stringify({ 'listaComponentes': listaComponentes });
    //Hardware = JSON.stringify({ 'Hardware': Hardware });
    debugger;
    $.ajax({
        
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: url,
        data: JSON.stringify({Principal:Hardware, listaComponentes:listaComponentes}),
        success: function (r) {          
            debugger;
        },
        failure: function (response) {          
            alert('Error Al Guardar');
        }
    });
});
$("#crearComponentes").on('click', function () {
    }); 



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