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


$("#crearComponentes").on('click', function () {
   
    
    
    //Columnas
    var columna1 = $(".columna1")[0];
    var columna2 = $(".columna1")[1];
    
    var filtroColumna2 = $(columna2).find(".well");
    var num = $(columna2).children("button").length;

    //Arreglo
    var listaComponentes = [];
    //Componentes de la Compuradora Principal
    var Usuario = $(columna1).find("[name='clusuario']").val();
    var Serie = $(columna1).find("[name='clserie']").val();

    var Modelo = $(columna1).find("[name='clmodelo']").val();

    var NombreEquipo = $(columna1).find("[name='clnoequipo']").val();
    var EquipoCritico = $(columna1).find("[name='clequipocritico']").val();
    var Area = parseInt($($(columna1).find(".selectArea")[1]).val());
    var Marca = parseInt($($(columna1).find(".selectMarca")[1]).val());
    
    var TipoHardware = parseInt($(columna1).find("[name='tipoHardware']").val());

    // clusuario clserie clmodelo clnoequipo clequipocritico
    
    for(var i = 0; i <= num; i++)
    {
        if(i==0)
        {
            listaComponentes[i]={
                clUsuario: Usuario,
                clSerie : Serie,
                clModelo : Modelo,
                clNoEquipo: NombreEquipo,
                clEquipoCritico: EquipoCritico,
                clArea : Area,
                clMarca :Marca,
                tipoHardware :TipoHardware,
                serialAsignacion:null
            }
        }
        else
        {
            
            Serie = $($(filtroColumna2[i-1])).find(".serieComponente").val()
            Marca =  parseInt($($($(filtroColumna2[i-1])).find(".marcaComponente")[1]).val())
            Modelo = $($(filtroColumna2[i-1])).find(".modeloComnponente").val()
            TipoHardware =  parseInt($($(filtroColumna2[i-1])).find(".tipoComponente").val())


            listaComponentes[i]={
                clUsuario: Usuario,
                clSerie : Serie,
                clModelo : Modelo,
                clNoEquipo: NombreEquipo,
                clEquipoCritico: EquipoCritico,
                clArea : Area,
                clMarca :Marca,
                tipoHardware :TipoHardware,
                serialAsignacion: listaComponentes[0].clSerie
            }
        }
    }
    //Crear Arreglo de Objetos

    

    //Url de la Accion
    var url =  "../Home/GuardarComponentes";
    listaComponentes = JSON.stringify({ 'listaComponentes': listaComponentes });
    debugger;
   
    $.ajax({
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type: 'POST',
        url: url,
        data: listaComponentes,
        success: function (r) {          
            alert(r);
            window.location = "../Home/inventario";
        },
        failure: function (response) {          
            alert('Error Al Guardar');
        }
    }); 


   
});

$('#agregarComponente').click(function ()
{
    
    var columna = $(".columna1")[1];
  

    //var num = columna.children("button").length;
    var num = $(columna).children("button").length;

    var nuevoComponente = `<button class="btn btn-danger"  type="button" data-toggle="collapse" data-target="#collapseExample${num}" aria-expanded="false" aria-controls="collapseExample" style="width:100%;">Tipo</button>
  <div class="collapse" id="collapseExample${num}">
                        <div class="well">
                            <div class="componente">

                                <select class="selectTipo">
                                    <option value="volvo">monitor</option>
                                    <option value="saab">teclado</option>
                                    <option value="mercedes">mouse</option>
                                    <option value="audi">dockin</option>
                                </select>
                            </div>
                            <div class="componente">
                                <label>serie</label>
                                <input type="text" class="form-control" placeholder="serie">
                            </div>
                            <div class="componente" style="padding-top:15px;padding-bottom:15px;">
                                <label style="padding-right:20px;">
        MARCA:
    </label>
    <select class="selectpicker" data-style="btn-primary">
        @{foreach (var item in Model.listaBrand)
        {
            <option value="@item.BrandID">@item.Name</option>
}

}

                                </select>

                            </div>
                            <div class="componente">
                                <label>MODELO:</label>
                                <input type="text" class="form-control" placeholder="modelo">
                            </div>



                        </div>
  </div>`;

      
      

        var papa = $('.columna1')[1];
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