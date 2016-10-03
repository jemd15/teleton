$( document ).ready(function() {
    $(".button-collapse").sideNav();
    $("#texto-categorias").css('height', $("#card-categoria").height());
});

$(document).ready(function() {
    $('input#input_text, textarea#descripcion').characterCounter();
});

$(document).ready(function(){

    $('.ir-arriba').click(function(){
        $('body, html').animate({
            scrollTop: '0px'
        }, 300);
    });

    $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
            $('.ir-arriba').slideDown(300);
        } else {
            $('.ir-arriba').slideUp(300);
        }
    });

});
/*

$(document).ready(function() {
    var heights = $(".igualar-height").map(function() {
            return $(this).height();
        }).get(),

        maxHeight = Math.max.apply(null, heights);

    $(".igualar-height").height(maxHeight);
});*/
