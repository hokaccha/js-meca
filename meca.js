/*
 * meca.js - markup engineer's coding adminicle javascript library
 *
 * Copyright (c) 2009 Kazuhito Hokamura
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author   Kazuhito Hokamura (http://webtech-walker.com/)
 * @version  2.0.0
 * @url      http://webtech-walker.com/meca/
 * @github   http://github.com/hokaccha/meca/tree/master
 *
 */

$.fn.meca = function(action, conf) {
    return this.each(function() {
        $.meca.func[action].call(this, conf);
    });
};

$.meca = {};

$.meca.util = {
    is_msie6: ($.browser.msie && $.browser.version < 7),

    filterStyle: function(src, sizing) {
        var dx = 'DXImageTransform.Microsoft.AlphaImageLoader';
        return 'progid:' + dx + '(src="' + src + '",sizingMethod=' + sizing +')';
    }
};

$.meca.func = {
    hover: function(conf) {
        var $elem = $(this);
        var conf  = $.extend({ postfix:  '_o' }, conf);

        var src  = $elem.attr('src');
        if (!src) return;

        var src_o = src.replace(/\.\w+$/, conf.postfix + '$&');
        var img   = new Image();
        img.src   = src_o;

        $elem.hover(
            function() { this.src = src_o; },
            function() { this.src = src; }
        );
    },

    external: function() {
        $(this).attr('target', '_blank');
    },

    pngfix: function(conf) {
        var self = $.meca;
        if (!self.util.is_msie6) return;

        var $elem = $(this);
        var conf  = $.extend({
            hoverSelector: '.btn',
            hoverPostfix:  '_o',
            blankGif:      false,
            wrapSpanClass: 'imgpngWrapSpan'
        }, conf);

        var css = {
            'filter': self.util.filterStyle($elem.attr('src'), 'crop'),
            'width':  $elem.width(),
            'height': $elem.height(),
            'zoom':   '1'
        };

        var apply = function($elem) {
            if (conf.blankGif) {
                $elem.css(css).attr('src', conf.blankGif);
                return $elem;
            }
            else {
                var wrapSpan = $('<span/>').addClass(conf.wrapSpanClass).css(css);
                $elem.css('display', 'none').wrap(wrapSpan);
                return $elem.parent();
            }
        };

        if ( $elem.is(conf.hoverSelector) ) {
            var src = $elem.attr('src');
            var src_o = src.replace(/\.\w+$/, conf.hoverPostfix + '$&');
            var img = new Image();
            img.src = src_o;

            apply($elem).hover(
                function() { $(this).css('filter', self.util.filterStyle(src_o, 'proc')) },
                function() { $(this).css('filter', self.util.filterStyle(src, 'proc')) }
            );
        }
        else {
            apply($elem);
        }
    },

    bgpngfix: function() {
        var self  = $.meca;
        if (!self.util.is_msie6) return;

        var $elem = $(this);

        var filter = self.util.filterStyle(
            $elem.css('backgroundImage').slice(5,-2),
            ($elem.css('backgroundRepeat') === 'no-repeat') ? 'crop' : 'scale'
        );

        $elem.css({
            'filter': filter,
            'background-image': 'none',
            'zoom': '1'
        });
    },

    heightAlign: function() {
        var maxHeight = 0;
        $(this).find('> *').each(function() {
            var height = $(this).height();
            if (maxHeight < height) {
                maxHeight = height;
            }
        }).height(maxHeight);
    },

    positionFixed: function() {
        var self = $.meca;
        if (!self.util.is_msie6) return;

        var elem = this;
        var $elem = $(elem);

        var baseTop  = parseInt($elem.css('top'))  || 0;
        var baseLeft = parseInt($elem.css('left')) || 0;

        $elem.css({
                position: 'absolute',
                top:  $(document).scrollTop()  + baseTop,
                left: $(document).scrollLeft() + baseLeft
            })
            .parents().each(function() {
                if ($(this).css('position') == 'relative') {
                    $(this).after($elem);
                }
            })
        ;

        $('html').css({
            'background-image': 'url(null)',
            'background-attachment': 'fixed'
        });

        elem['topVal'] = baseTop;
        elem.style.setExpression('top', 'documentElement.scrollTop + this.topVal + "px"');
    },

    smoothScroll: function(conf) {
        var conf = $.extend({
            deleteHashSelector: ''
        }, conf);

        $(this).click(function() {
            var $elem = $(this);
            
            var $target = $($elem.attr('href'));
            if (!$target.length) return;

            $('html, body').animate(
                { scrollTop: $target.offset().top },
                'normal',
                'swing',
                function() {
                    if (conf.deleteHashSelector && $elem.is(conf.deleteHashSelector)) {
                        if (location.hash) location.hash = '';
                    }
                    else {
                        location.hash = $elem.attr('href');
                    }
                }
            );
            return false;
        });
    },

    addOsClass: function(conf) {
        var conf = $.extend({
            winClass: 'osWin',
            macClass: 'osMac'
        }, conf);

        var ua = navigator.userAgent.toLowerCase();
        if (/windows/.test(ua)) {
            $('body').addClass(conf.winClass);
        }
        else if (/mac os x/.test(ua)) {
            $('body').addClass(conf.macClass);
        }
    },

    labelClickable: function() {
        if(!$.browser.msie) return;

        $('label img').click(function(){
            $('#' + $(this).parents('label').attr('for')).focus().click();
        });
    },

    active: function(conf) {
        var $elem = $(this);
        var conf  = $.extend({
            postfix:       '_a',
            hoverSelector: '.btn',
            hoverPostfix:  '_o'
        }, conf);

        if (!$elem.attr('src')) return;

        var src   = this.src;
        var src_a = this.src.replace(/\.\w+$/, conf.postfix + '$&');
        var src_base = src;
        if (conf.hoverSelector && $elem.is(conf.hoverSelector)) {
            src_base = src.replace(/\.\w+$/, conf.hoverPostfix + '$&');
        }

        var img   = new Image();
        img.src   = src_a;

        $elem.mousedown(function() { this.src = src_a; });
        $elem.mouseup(function() { this.src = src_base });
    }
};
