$(document).ready(function(){
    $('.hyperlink').on('click', function(e) {
        window.location.href = $(this).attr('href');
        e.stopPropagation();
        e.preventDefault();
    });
});
