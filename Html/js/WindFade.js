(function ($) {
    $.fn.extend({
        WindFade: function (objs) {
            var obj = $.extend({
                interval: 5000,   //间隔5秒切换一次
                speed: 500    //切换的速度 0.5秒切换一次
            }, objs || {});

            var jq = this;
            var jqDiv = jq.children('.WindDiv');
            var jqLi = jqDiv.find('li');
            var jqBtn = jq.children('.WindBtn');
            var index = 0;    //图片索引
            var tims = null;    //计时器
            var topObj = jqDiv.find('li').eq(0);  //上一个操作对象

            var Wind = {
                load: function () {    //初始化
                    jq.width($(document).width());
                    jqDiv.width($(document).width());
                    jqLi.children('a').width($(document).width());
                    $(window).bind('resize', function () {
                        jq.width($(document).width());
                        jqDiv.width($(document).width());
                        jqLi.children('a').width($(document).width());
                    });
                    //绑定背景图图片
                    jqLi.children('a').each(function () {
                        var url = $(this).attr('url');
                        $(this).css('background-image', 'url(' + url + ')');
                        $(this).css('filter', "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + url + "',sizingMethod='scale')");
                    });
                    //生成按钮
                    for (var i = 0; i < jqLi.length; i++) {
                        jqBtn.append('<li index="' + i + '" class="WindBtn_li"></li>');
                    }
                    //绑定按钮单击事件
                    jqBtn.children('li').bind('mouseover', function () {
                        if (index != $(this).attr('index')) {
                            index = $(this).attr('index');
                            Wind.change();
                        }
                    });
                    //悬浮其上停止计时器
                    jq.hover(function () { clearInterval(tims); jq.children('.WindLeft').fadeIn(300); jq.children('.WindRight').fadeIn(300); }, function () { Wind.interval(); jq.children('.WindLeft').fadeOut(300); jq.children('.WindRight').fadeOut(300); });
                    //左右按钮绑定单击事件
                    jq.children('.WindLeft').bind('click', function () { index--; Wind.change(); });
                    jq.children('.WindRight').bind('click', function () { index++; Wind.change(); });
                    jqBtn.children('li').eq(0).addClass('WindBtn_li_hover');    //设置第一个按钮样式
                    topObj.css('display', 'block');
                }, interval: function () {   //计时器
                    tims = setInterval(function () {
                        index++;
                        Wind.change();
                    }, obj.interval);
                }, change: function () {     //切换图片
                    if (index >= jqLi.length) {
                        index = 0;
                    } else if (index == -1) {
                        index = jqLi.length - 1;
                    }
                    //添加按钮样式
                    jqBtn.children('li').removeClass('WindBtn_li_hover');
                    jqBtn.children('li').each(function (ind) { if (index == ind) { $(this).addClass('WindBtn_li_hover'); } });
                    //执行动画
                    jqDiv.find('li').each(function (ind) {
                        if (index == ind) {
                            topObj.stop(true);
                            $(this).css('position', 'absolute');
                            $(this).fadeIn(obj.speed, function () {
                                topObj.css('display', 'none');
                                $(this).css('position', 'static');
                                topObj = $(this);
                            });
                        }
                    })
                }
            }

            Wind.load();
            Wind.interval();
        }
    });
})(jQuery);