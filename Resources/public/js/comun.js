$('.link-disabled').click(function () {return false;});

function getLocale(locale){
    var lang = {};
    if(locale == "es"){
        lang = {
    "sProcessing":   "Procesando...",
    "sLengthMenu":   "Mostrar _MENU_ registros",
    "sZeroRecords":  "No se encontraron resultados",
    "sInfo":         "Mostrando desde _START_ hasta _END_ de _TOTAL_ registros",
    "sInfoEmpty":    "Mostrando desde 0 hasta 0 de 0 registros",
    "sInfoFiltered": "(filtrado de _MAX_ registros en total)",
    "sInfoPostFix":  "",
    "sSearch":       "",
    "sUrl":          "",
    "oPaginate": {
        "sFirst":    "Primero",
        "sPrevious": "Anterior",
        "sNext":     "Siguiente",
        "sLast":     "Último"
    }
};
       
    }
    return lang
    
}

function humaneAlert (type, message){
    humane.timeout = 2500;
    
    if(type == 'success'){
        humane.success(message);
    }
    if(type == 'error'){
        //    humane.timeout = 0;
        //    humane.clickToClose = true;
        humane.error(message);
    
    }
    if(type == 'info'){
        //    humane.timeout = 0;
        //    humane.clickToClose = true;
        humane.info(message);

    }
    if(type == 'log'){
        //    humane.timeout = 0;
        //    humane.clickToClose = true;
        humane.log(message);

    }
}

function block_screen() {
    $('<div id="screenBlock"></div>').appendTo('body');
    $('#screenBlock').css({  opacity: 0, width: $(document).width(), height: $(document).height() });
    $('#screenBlock').addClass('blockDiv');
    $('#screenBlock').animate({opacity: 0.7}, 200);
    $('#screenBlock').append('<div id="blockcontainer" style="position:fixed;top:50%;left:50%"></div>');
    $('#blockcontainer').spin({ color: '#21A9B8'});
}

function unblock_screen() {
    $('#screenBlock').animate({opacity: 0}, 200, function () {
        $('#screenBlock').remove();
    });
}

$('body').on('click', 'a', function (event) {
    if ($(this).attr("href") === "#") {
        event.preventDefault();
    }
});