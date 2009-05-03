/*
 * meca.js 1.1.3 markup engineer's coding adminicle javascript library
 *
 * Copyright (c) 2009 Kazuhito Hokamura
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author   Kazuhito Hokamura (http://webtech-walker.com/)
 * @version  1.1.3
 * @url      http://webtech-walker.com/meca/
 * @github   http://github.com/hokaccha/meca/tree/master
 *
 */

(function($) {
    $.Meca = {};

    /*
     * config setting
     -----------------------------------*/

    /**
     * image hover config setting
     */ 

    $.Meca.hover = {};
    $.Meca.hover.config = {};

    $.Meca.hover.config.enable   = true;
    $.Meca.hover.config.selector = '.btn';
    $.Meca.hover.config.postfix  = '_o';


    /**
     * external link config setting
     */

    $.Meca.external = {};
    $.Meca.external.config = {};

    $.Meca.external.config.enable   = true;
    $.Meca.external.config.selector = 'a[rel~="external"]';

        
    /**
     * pngfix config setting
     */

    $.Meca.pngfix = {};
    $.Meca.pngfix.config = {};

    $.Meca.pngfix.config.enable         = true;
    $.Meca.pngfix.config.bgpngSelector  = '.bgpng';
    $.Meca.pngfix.config.imgpngSelector = '.pngfix';
    $.Meca.pngfix.config.blankGif       = false;
    $.Meca.pngfix.config.wrapSpanClass  = 'imgpngWrapSpan';

    /**
     * heightAlign config setting
     */

    $.Meca.heightAlign = {};
    $.Meca.heightAlign.config = {};

    $.Meca.heightAlign.config.enable   = true;
    $.Meca.heightAlign.config.selector = 'ul.heightAlign li';

    /**
     * position fiexd config setting
     */

    $.Meca.positionFixed = {};
    $.Meca.positionFixed.config = {};

    $.Meca.positionFixed.config.enable = true;


    /*
     * exec modules
     -----------------------------------*/

    /**
     * hover image
     */
    $.Meca.hover.exec = function() {
        if (!$.Meca.hover.config.enable) return;
        $($.Meca.hover.config.selector).each(function() {
            if (!$(this).attr('src')) return;
            var src   = this.src;
            var src_o = this.src.replace(/\.\w+$/, $.Meca.hover.config.postfix + '$&');
            var img   = new Image();
            img.src   = src_o;
            $(this).hover(
                function() { this.src = src_o; },
                function() { this.src = src; }
            );
        });
    };


    /**
     * external link
     */
    $.Meca.external.exec = function() {
        if (!$.Meca.external.config.enable) return;
        $($.Meca.external.config.selector).attr('target', '_blank');
    };


    /**
     * alpha png image for IE6
     */
    $.Meca.pngfix.exec = function() {
        if (!$.Meca.pngfix.config.enable) return;
        if (!($.browser.msie && $.browser.version == "6.0")) return;

        var getFilterStyle = function(src, sizing) {
            var dx = 'DXImageTransform.Microsoft.AlphaImageLoader';
            return 'progid:' + dx + '(src="' + src + '",sizingMethod=' + sizing +')';
        };

        // background png to alpha png
        $($.Meca.pngfix.config.bgpngSelector).each(function() {
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
        $($.Meca.pngfix.config.imgpngSelector).each(function() {
            var imgpngStyle  = {
                'filter': getFilterStyle($(this).attr('src'), 'crop'),
                'width':  $(this).width(),
                'height': $(this).height(),
                'zoom':   '1'
            };

            if ($.Meca.pngfix.config.blankGif) {
                $(this).css(imgpngStyle).attr('src', $.Meca.pngfix.config.blankGif);
            }
            else {
                var wrapSpan = $(document.createElement('span'))
                    .addClass($.Meca.pngfix.config.wrapSpanClass)
                    .css(imgpngStyle);
                $(this).css('display', 'none').wrap(wrapSpan);
            }
        });
    };

    /**
     * heightAlign adujst
     */
    $.Meca.heightAlign.exec = function() {
        if (!$.Meca.heightAlign.config.enable) return;
        var maxHeight = 0;
        $($.Meca.heightAlign.config.selector).each(function() {
            var height = $(this).height();
            if (maxHeight < height) {
                maxHeight = height;
            }
        }).height(maxHeight);
    };

    /**
     * posotion fixed for ie6
     */
    $.Meca.positionFixed.exec = function() {
        if (!$.Meca.positionFixed.config.enable) return;
        if (!($.browser.msie && $.browser.version == "6.0")) return;

        var elems = document.all;
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            if (elem.currentStyle.position == 'fixed') {
                var self = $(elem);
                var baseTop  = parseInt(self.css('top'))  || 0;
                var baseLeft = parseInt(self.css('left')) || 0;

                self.css({
                        position: 'absolute',
                        top:  $(document).scrollTop()  + baseTop,
                        left: $(document).scrollLeft() + baseLeft
                    })
                    .parents().each(function() {
                        if ($(this).css('position') == 'relative') {
                            $(this).after(self);
                        }
                    })
                ;

                $(window).scroll(function() {
                    self.css({
                        top:  $(document).scrollTop()  + baseTop,
                        left: $(document).scrollLeft() + baseLeft
                    });
                });
            }
        }
    };

    $(function() {
        for (var module in $.Meca) {
            if ($.Meca[module].exec) {
                $.Meca[module].exec();
            }
        }
    });
})(jQuery);
