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

//spin.js jquery plugin
$.fn.spin = function(opts) {
     
    //     if(opts === false){
    opts = {
        lines: 12, // The number of lines to draw
        length: 4, // The length of each line
        width: 5, // The line thickness
        radius: 13, // The radius of the inner circle
        color: '#0064CD', // #rgb or #rrggbb
        speed: 2.0, // Rounds per second
        trail: 50, // Afterglow percentage
        shadow: false // Whether to render a shadow
    };
    //     }
     
    this.each(function() {
        var $this = $(this),
        data = $this.data();

        if (data.spinner) {
            data.spinner.stop();
            delete data.spinner;
        }
        if (opts !== false) {
            data.spinner = new Spinner($.extend({
                color: $this.css('color')
                }, opts)).spin(this);
        }
    });
    return this;
};