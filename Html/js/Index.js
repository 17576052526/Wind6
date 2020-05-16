$(function () {
    $('#case>li').hover(function () {
        $(this).children('div').slideDown(200);
    }, function () {
        $(this).children('div').slideUp(200);
    });
});