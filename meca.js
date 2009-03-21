/*
 * meca.js 1.0.0 markup engineer's coding adminicle javascript library
 *
 * Copyright (c) 2009 Kazuhito Hokamura
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author   Kazuhito Hokamura (http://webtech-walker.com/)
 * @version  1.0.0
 * @url      http://webtech-walker.com/meca/
 *
 */

(function($) {
    $.Meca = {};

    $.Meca.config = {
        // image hover config setting
        hoverEnable:   true,    // enable hover image. true or false
        hoverSelector: '.btn',  // target selector
        hoverPostfix:  '_o',    // postfix string

        // external link config setting
        externalEnable:   true,                // enable external link. true or false
        externalSelector: 'a[rel="external"]', // target selector

        // pngfix config setting
        pngfixEnable:        true,            // enable hover image. true or false
        bgpngfixSelector:    '.bgpng',        // background png fix target selector
        imgpngSelector:      '.pngfix',       // img element png fix target selector
        imgpngBlankGif:      false,           // blank.gif path. if value is false then img elem wrap span
        imgpngWrapSpanClass: 'imgpngWrapSpan' // wrap span class that when blank.gif is false
    };

    // hover image
    $.Meca.hover = function() {
        if (!$.Meca.config.hoverEnable) return;
        $($.Meca.config.hoverSelector).each(function() {
            var src   = this.src;
            var src_o = this.src.replace(/\.\w+$/, $.Meca.config.hoverPostfix + '$&');
            var img   = new Image();
            img.src   = src_o;
            $(this).hover(
                function() { this.src = src_o; },
                function() { this.src = src; }
            );
        });
    };

    // external link
    $.Meca.external = function() {
        if (!$.Meca.config.externalEnable) return;
        $($.Meca.config.externalSelector).attr('target', '_blank');
    };

    // alpha png image for IE6
    $.Meca.pngfix = function() {
        if (!$.Meca.config.pngfixEnable) return;
        if (!($.browser.msie && $.browser.version == "6.0")) return;

        var getFilterStyle = function(src, sizing) {
            var dx = 'DXImageTransform.Microsoft.AlphaImageLoader';
            return 'progid:' + dx + '(src="' + src + '",sizingMethod=' + sizing +')';
        };

        // background png to alpha png
        $($.Meca.config.bgpngfixSelector).each(function() {
            var bgpngSrc    = $(this).css('backgroundImage').slice(5,-2);
            var bgpngSizing = ($(this).css('backgroundRepeat') === 'no-repeat') ? 'crop' : 'scale';
            var bgpngStyle  = {
                'filter': getFilterStyle(bgpngSrc, bgpngSizing),
                'background-image': 'none',
                'zoom': '1'
            };
            $(this).css(bgpngStyle);
        });

        // img element png to alpha png
        $($.Meca.config.imgpngSelector).each(function() {
            var imgpngStyle  = {
                'filter': getFilterStyle($(this).attr('src'), 'crop'),
                'width':  $(this).width(),
                'height': $(this).height(),
                'zoom':   '1'
            };

            if ($.Meca.config.imgpngBlankGif) {
                $(this).css(imgpngStyle).attr('src', $.Meca.config.imgpngBlankGif);
            }
            else {
                var wrapSpan = $(document.createElement('span'))
                    .addClass($.Meca.config.imgpngWrapSpanClass)
                    .css(imgpngStyle);
                $(this).css('display', 'none').wrap(wrapSpan);
            }
        });
    };

    $(function() {
        $.Meca.hover();
        $.Meca.external();
        $.Meca.pngfix();
    });
})(jQuery);
