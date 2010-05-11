/*
 * meca.js 1.1.12 markup engineer's coding adminicle javascript library
 *
 * Copyright (c) 2009 Kazuhito Hokamura
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author   Kazuhito Hokamura (http://webtech-walker.com/)
 * @version  1.1.12
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

    $.Meca.pngfix.config.enable              = true;
    $.Meca.pngfix.config.bgpngSelector       = '.bgpng';
    $.Meca.pngfix.config.imgpngSelector      = '.pngfix';
    $.Meca.pngfix.config.imgpngHoverSelector = '.pngfix.btn';
    $.Meca.pngfix.config.postfix             = '_o';
    $.Meca.pngfix.config.blankGif            = false;
    $.Meca.pngfix.config.wrapSpanClass       = 'imgpngWrapSpan';


    /**
     * heightAlign config setting
     */

    $.Meca.heightAlign = {};
    $.Meca.heightAlign.config = {};

    $.Meca.heightAlign.config.enable         = true;
    $.Meca.heightAlign.config.selectorParent = '.heightAlign';
    $.Meca.heightAlign.config.selectorChild  = '> *';

    /**
     * position fiexd config setting
     */

    $.Meca.positionFixed = {};
    $.Meca.positionFixed.config = {};

    $.Meca.positionFixed.config.enable = true;

    /**
     * word break config setting
     */

    $.Meca.wordBreak = {};
    $.Meca.wordBreak.config = {};

    $.Meca.wordBreak.config.enable = false;
    $.Meca.wordBreak.config.selector = '.wordBreak';

    /**
     * smooth scroll config setting
     */

    $.Meca.smoothScroll = {};
    $.Meca.smoothScroll.config = {};

    $.Meca.smoothScroll.config.enable   = true;
    $.Meca.smoothScroll.config.duration = 'normal';
    $.Meca.smoothScroll.config.easing   = 'swing';
    $.Meca.smoothScroll.config.excludeHashSelector = 'p.goPageTop a';

    /**
     * add os class config setting
     */
    
    $.Meca.addOsClass = {};
    $.Meca.addOsClass.config = {};

    $.Meca.addOsClass.config.enable = true;
    $.Meca.addOsClass.config.winClass = 'osWin';
    $.Meca.addOsClass.config.macClass = 'osMac';

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

        var getImgpngStyle = function(elem) {
            return {
                'filter': getFilterStyle(elem.attr('src'), 'crop'),
                'width':  elem.width(),
                'height': elem.height(),
                'zoom':   '1'
            };
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

        // with hover
        $($.Meca.pngfix.config.imgpngHoverSelector).each(function() {
            var $self = $(this);
            var src = $self.attr('src');
            var src_o = src.replace(/\.\w+$/, $.Meca.pngfix.config.postfix + '$&');
            var img   = new Image();
            img.src   = src_o;

            if ($.Meca.pngfix.config.blankGif) {
                $self.css(getImgpngStyle($self))
                     .attr('src', $.Meca.pngfix.config.blankGif);

                $(this).hover(
                    function() { $self.css('filter', getFilterStyle(src_o, 'proc')) },
                    function() { $self.css('filter', getFilterStyle(src, 'proc')) }
                );
            }
            else {
                var wrapSpan = $(document.createElement('span'))
                    .addClass($.Meca.pngfix.config.wrapSpanClass)
                    .css(getImgpngStyle($self));
                $self
                    .css('visibility', 'hidden').wrap(wrapSpan).parent()
                    .hover(
                        function() { $(this).css('filter', getFilterStyle(src_o, 'proc')) },
                        function() { $(this).css('filter', getFilterStyle(src, 'proc')) }
                    )
                ;
            }

            $.data(this, 'pngfixed', 'fixed');
        });

        // img element png to alpha png
        $($.Meca.pngfix.config.imgpngSelector).each(function() {
            if ($.data(this, 'pngfixed') == 'fixed') return;
            if ($.Meca.pngfix.config.blankGif) {
                $(this).css(getImgpngStyle($(this)))
                       .attr('src', $.Meca.pngfix.config.blankGif);
            }
            else {
                var wrapSpan = $(document.createElement('span'))
                    .addClass($.Meca.pngfix.config.wrapSpanClass)
                    .css(getImgpngStyle($(this)));
                $(this).css('visibility', 'hidden').wrap(wrapSpan);
            }
        });
    };

    /**
     * heightAlign adujst
     */
    $.Meca.heightAlign.exec = function() {
        if (!$.Meca.heightAlign.config.enable) return;
        var heightAlignExec = function() {
            $($.Meca.heightAlign.config.selectorParent).each(function() {
                var maxHeight = 0;
                $(this).find($.Meca.heightAlign.config.selectorChild).each(function() {
                    var height = $(this).height();
                    if (maxHeight < height) {
                        maxHeight = height;
                    }
                }).height(maxHeight);
            });
        };
        if ($.browser.opera == true) {
            heightAlignExec();
        }
        else {
            $(window).load(heightAlignExec);
        }
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
                $.Meca.util.fixed(elem);
            }
        }
    };

    /**
     * word break
     */
    $.Meca.wordBreak.exec = function() {
        if (!$.Meca.wordBreak.config.enable) return;
        $($.Meca.wordBreak.config.selector).each(function() {
            if($.browser.msie) {
                $(this).css('word-break', 'break-all');
            }
            else {
                $.Meca.util.splitText($(this));
            }
        });
    };


    $.Meca.util = {
        splitText: function(elem) {
            var span;
            var splited;
            var splitter = (navigator.userAgent.indexOf('Firefox/2') != -1) ? '<wbr />' : String.fromCharCode(8203);
            elem.contents().each(function() {
                if (this.nodeType == 1) {
                    $.Meca.util.splitText($(this));
                }
                else if (this.nodeType == 3) {
                    span    = $(this).wrap('<span/>').parent();
                    splited = span.text().split('').join(splitter);
                    span.after(splited).remove();
                }
            });
        },

        fixed: function(elem) {
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

            $('html').css({
                'background-image': 'url(null)',
                'background-attachment': 'fixed'
            });

            elem['topVal'] = baseTop;
            elem.style.setExpression('top', 'documentElement.scrollTop + this.topVal + "px"');
        }
    };


    $.Meca.smoothScroll.exec = function() {
        if (!$.Meca.smoothScroll.config.enable) return;

        $('a[href^="#"]').click(function() {
            var $elem = $(this);
            
            // ターゲット要素がなかったら何もしない
            var $target = $($elem.attr('href'));
            if (!$target.length) return;

            // スムーズスクロールにする
            $('html, body').animate({
                    scrollTop: $target.offset().top
                },
                $.Meca.smoothScroll.config.duration,
                $.Meca.smoothScroll.config.easing,
                function() {
                    if ($elem.is($.Meca.smoothScroll.config.excludeHashSelector)) {
                        if (location.hash) location.hash = '';
                    }
                    else {
                        location.hash = $elem.attr('href');
                    }
                }
            );
            return false;
        });
    };

    $.Meca.addOsClass.exec = function() {
        if (!$.Meca.addOsClass.config.enable) return;

        var ua = navigator.userAgent.toLowerCase();
        if (/windows/.test(ua)) {
            $('body').addClass($.Meca.addOsClass.config.winClass);
        }
        else if (/mac os x/.test(ua)) {
            $('body').addClass($.Meca.addOsClass.config.macClass);
        }
    }

    $(function() {
        for (var module in $.Meca) {
            if ($.Meca[module].exec) {
                $.Meca[module].exec();
            }
        }
    });
})(jQuery);
