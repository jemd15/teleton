$( document ).ready(function() {
    $(".button-collapse").sideNav();
    $("#texto-categorias").css('height', $("#card-categoria").height());
});

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);


function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });
}
$(window).resize(function () {
    $('#video').reload()
});

$(document).ready(function() {
    $('input#input_text, textarea#descripcion').characterCounter();
  });
  
function irArriba(){
    $(document).on("scroll", function(){
        var desplazamientoActual = $(document).scrollTop();
        var controlArriba = $("#irarriba");
        console.log("Estoy en " , desplazamientoActual);
        if(desplazamientoActual > 100 && controlArriba.css("display") == "none"){
            controlArriba.fadeIn(500);
        }
        if(desplazamientoActual < 100 && controlArriba.css("display") == "block"){
            controlArriba.fadeOut(500);
        }
    });
};