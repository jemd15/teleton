$('document').ready(function () {
    $('#team').on('click', function () {
        toasty();
    });

});

//codigo konami
if ( window.addEventListener ) {
    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
    window.addEventListener("keydown", function(e){
        kkeys.push( e.keyCode );
        if ( kkeys.toString().indexOf( konami ) >= 0 )
            toasty();
        kkeys = [];
    }, true);
}

var toasty = function () {
    console.log('toasty');
    $("#donfran").removeClass('hide').addClass('slideInRight');
    $("#donfran").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $('#sound')[0].play();
        $("#donfran").removeClass("slideInRight").addClass('slideOutRight');
        $("#donfran").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $("#donfran").removeClass("slideOutRight").addClass('hide');
        });
    });
};