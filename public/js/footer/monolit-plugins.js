/*! lightgallery - v1.6.12 - 2019-02-19
 * http://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2019 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = b(require("jquery")))
    : b(a.jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    function b(b, d) {
      if (
        ((this.el = b),
        (this.$el = a(b)),
        (this.s = a.extend({}, c, d)),
        this.s.dynamic &&
          "undefined" !== this.s.dynamicEl &&
          this.s.dynamicEl.constructor === Array &&
          !this.s.dynamicEl.length)
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      return (
        (this.modules = {}),
        (this.lGalleryOn = !1),
        (this.lgBusy = !1),
        (this.hideBartimeout = !1),
        (this.isTouch = "ontouchstart" in document.documentElement),
        this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
        this.s.dynamic
          ? (this.$items = this.s.dynamicEl)
          : "this" === this.s.selector
          ? (this.$items = this.$el)
          : "" !== this.s.selector
          ? this.s.selectWithin
            ? (this.$items = a(this.s.selectWithin).find(this.s.selector))
            : (this.$items = this.$el.find(a(this.s.selector)))
          : (this.$items = this.$el.children()),
        (this.$slide = ""),
        (this.$outer = ""),
        this.init(),
        this
      );
    }
    var c = {
      mode: "lg-slide",
      cssEasing: "ease",
      easing: "linear",
      speed: 600,
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 150,
      hideBarsDelay: 6e3,
      useLeft: !1,
      closable: !0,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimatoin: !0,
      hideControlOnEnd: !1,
      mousewheel: !0,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 1,
      showAfterLoad: !0,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: !1,
      iframeMaxWidth: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      galleryId: 1,
    };
    (b.prototype.init = function () {
      var b = this;
      b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
      var c = window.location.hash;
      c.indexOf("lg=" + this.s.galleryId) > 0 &&
        ((b.index = parseInt(c.split("&slide=")[1], 10)),
        a("body").addClass("lg-from-hash"),
        a("body").hasClass("lg-on") ||
          (setTimeout(function () {
            b.build(b.index);
          }),
          a("body").addClass("lg-on"))),
        b.s.dynamic
          ? (b.$el.trigger("onBeforeOpen.lg"),
            (b.index = b.s.index || 0),
            a("body").hasClass("lg-on") ||
              setTimeout(function () {
                b.build(b.index), a("body").addClass("lg-on");
              }))
          : b.$items.on("click.lgcustom", function (c) {
              try {
                c.preventDefault(), c.preventDefault();
              } catch (a) {
                c.returnValue = !1;
              }
              b.$el.trigger("onBeforeOpen.lg"),
                (b.index = b.s.index || b.$items.index(this)),
                a("body").hasClass("lg-on") ||
                  (b.build(b.index), a("body").addClass("lg-on"));
            });
    }),
      (b.prototype.build = function (b) {
        var c = this;
        c.structure(),
          a.each(a.fn.lightGallery.modules, function (b) {
            c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
          }),
          c.slide(b, !1, !1, !1),
          c.s.keyPress && c.keyPress(),
          c.$items.length > 1
            ? (c.arrow(),
              setTimeout(function () {
                c.enableDrag(), c.enableSwipe();
              }, 50),
              c.s.mousewheel && c.mousewheel())
            : c.$slide.on("click.lg", function () {
                c.$el.trigger("onSlideClick.lg");
              }),
          c.counter(),
          c.closeGallery(),
          c.$el.trigger("onAfterOpen.lg"),
          c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
            c.$outer.removeClass("lg-hide-items"),
              clearTimeout(c.hideBartimeout),
              (c.hideBartimeout = setTimeout(function () {
                c.$outer.addClass("lg-hide-items");
              }, c.s.hideBarsDelay));
          }),
          c.$outer.trigger("mousemove.lg");
      }),
      (b.prototype.structure = function () {
        var b,
          c = "",
          d = "",
          e = 0,
          f = "",
          g = this;
        for (
          a("body").append('<div class="lg-backdrop"></div>'),
            a(".lg-backdrop").css(
              "transition-duration",
              this.s.backdropDuration + "ms"
            ),
            e = 0;
          e < this.$items.length;
          e++
        )
          c += '<div class="lg-item"></div>';
        if (
          (this.s.controls &&
            this.$items.length > 1 &&
            (d =
              '<div class="lg-actions"><button class="lg-prev lg-icon">' +
              this.s.prevHtml +
              '</button><button class="lg-next lg-icon">' +
              this.s.nextHtml +
              "</button></div>"),
          ".lg-sub-html" === this.s.appendSubHtmlTo &&
            (f = '<div class="lg-sub-html"></div>'),
          (b =
            '<div class="lg-outer ' +
            this.s.addClass +
            " " +
            this.s.startClass +
            '"><div class="lg" style="width:' +
            this.s.width +
            "; height:" +
            this.s.height +
            '"><div class="lg-inner">' +
            c +
            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
            d +
            f +
            "</div></div>"),
          a("body").append(b),
          (this.$outer = a(".lg-outer")),
          (this.$slide = this.$outer.find(".lg-item")),
          this.s.useLeft
            ? (this.$outer.addClass("lg-use-left"), (this.s.mode = "lg-slide"))
            : this.$outer.addClass("lg-use-css3"),
          g.setTop(),
          a(window).on("resize.lg orientationchange.lg", function () {
            setTimeout(function () {
              g.setTop();
            }, 100);
          }),
          this.$slide.eq(this.index).addClass("lg-current"),
          this.doCss()
            ? this.$outer.addClass("lg-css3")
            : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
          this.$outer.addClass(this.s.mode),
          this.s.enableDrag &&
            this.$items.length > 1 &&
            this.$outer.addClass("lg-grab"),
          this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
          this.doCss())
        ) {
          var h = this.$outer.find(".lg-inner");
          h.css("transition-timing-function", this.s.cssEasing),
            h.css("transition-duration", this.s.speed + "ms");
        }
        setTimeout(function () {
          a(".lg-backdrop").addClass("in");
        }),
          setTimeout(function () {
            g.$outer.addClass("lg-visible");
          }, this.s.backdropDuration),
          this.s.download &&
            this.$outer
              .find(".lg-toolbar")
              .append(
                '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
              ),
          (this.prevScrollTop = a(window).scrollTop());
      }),
      (b.prototype.setTop = function () {
        if ("100%" !== this.s.height) {
          var b = a(window).height(),
            c = (b - parseInt(this.s.height, 10)) / 2,
            d = this.$outer.find(".lg");
          b >= parseInt(this.s.height, 10)
            ? d.css("top", c + "px")
            : d.css("top", "0px");
        }
      }),
      (b.prototype.doCss = function () {
        return !!(function () {
          var a = [
              "transition",
              "MozTransition",
              "WebkitTransition",
              "OTransition",
              "msTransition",
              "KhtmlTransition",
            ],
            b = document.documentElement,
            c = 0;
          for (c = 0; c < a.length; c++) if (a[c] in b.style) return !0;
        })();
      }),
      (b.prototype.isVideo = function (a, b) {
        var c;
        if (
          ((c = this.s.dynamic
            ? this.s.dynamicEl[b].html
            : this.$items.eq(b).attr("data-html")),
          !a)
        )
          return c
            ? { html5: !0 }
            : (console.error(
                "lightGallery :- data-src is not pvovided on slide item " +
                  (b + 1) +
                  ". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"
              ),
              !1);
        var d = a.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
          ),
          e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
          f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
          g = a.match(
            /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
          );
        return d
          ? { youtube: d }
          : e
          ? { vimeo: e }
          : f
          ? { dailymotion: f }
          : g
          ? { vk: g }
          : void 0;
      }),
      (b.prototype.counter = function () {
        this.s.counter &&
          a(this.s.appendCounterTo).append(
            '<div id="lg-counter"><span id="lg-counter-current">' +
              (parseInt(this.index, 10) + 1) +
              '</span> / <span id="lg-counter-all">' +
              this.$items.length +
              "</span></div>"
          );
      }),
      (b.prototype.addHtml = function (b) {
        var c,
          d,
          e = null;
        if (
          (this.s.dynamic
            ? this.s.dynamicEl[b].subHtmlUrl
              ? (c = this.s.dynamicEl[b].subHtmlUrl)
              : (e = this.s.dynamicEl[b].subHtml)
            : ((d = this.$items.eq(b)),
              d.attr("data-sub-html-url")
                ? (c = d.attr("data-sub-html-url"))
                : ((e = d.attr("data-sub-html")),
                  this.s.getCaptionFromTitleOrAlt &&
                    !e &&
                    (e =
                      d.attr("title") || d.find("img").first().attr("alt")))),
          !c)
        )
          if (void 0 !== e && null !== e) {
            var f = e.substring(0, 1);
            ("." !== f && "#" !== f) ||
              (e =
                this.s.subHtmlSelectorRelative && !this.s.dynamic
                  ? d.find(e).html()
                  : a(e).html());
          } else e = "";
        ".lg-sub-html" === this.s.appendSubHtmlTo
          ? c
            ? this.$outer.find(this.s.appendSubHtmlTo).load(c)
            : this.$outer.find(this.s.appendSubHtmlTo).html(e)
          : c
          ? this.$slide.eq(b).load(c)
          : this.$slide.eq(b).append(e),
          void 0 !== e &&
            null !== e &&
            ("" === e
              ? this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
          this.$el.trigger("onAfterAppendSubHtml.lg", [b]);
      }),
      (b.prototype.preload = function (a) {
        var b = 1,
          c = 1;
        for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++)
          this.loadContent(a + b, !1, 0);
        for (c = 1; c <= this.s.preload && !(a - c < 0); c++)
          this.loadContent(a - c, !1, 0);
      }),
      (b.prototype.loadContent = function (b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k = this,
          l = !1,
          m = function (b) {
            for (var c = [], d = [], e = 0; e < b.length; e++) {
              var g = b[e].split(" ");
              "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1]);
            }
            for (var h = a(window).width(), i = 0; i < c.length; i++)
              if (parseInt(c[i], 10) > h) {
                f = d[i];
                break;
              }
          };
        if (k.s.dynamic) {
          if (
            (k.s.dynamicEl[b].poster &&
              ((l = !0), (g = k.s.dynamicEl[b].poster)),
            (j = k.s.dynamicEl[b].html),
            (f = k.s.dynamicEl[b].src),
            k.s.dynamicEl[b].responsive)
          ) {
            m(k.s.dynamicEl[b].responsive.split(","));
          }
          (h = k.s.dynamicEl[b].srcset), (i = k.s.dynamicEl[b].sizes);
        } else {
          if (
            (k.$items.eq(b).attr("data-poster") &&
              ((l = !0), (g = k.$items.eq(b).attr("data-poster"))),
            (j = k.$items.eq(b).attr("data-html")),
            (f =
              k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src")),
            k.$items.eq(b).attr("data-responsive"))
          ) {
            m(k.$items.eq(b).attr("data-responsive").split(","));
          }
          (h = k.$items.eq(b).attr("data-srcset")),
            (i = k.$items.eq(b).attr("data-sizes"));
        }
        var n = !1;
        k.s.dynamic
          ? k.s.dynamicEl[b].iframe && (n = !0)
          : "true" === k.$items.eq(b).attr("data-iframe") && (n = !0);
        var o = k.isVideo(f, b);
        if (!k.$slide.eq(b).hasClass("lg-loaded")) {
          if (n)
            k.$slide
              .eq(b)
              .prepend(
                '<div class="lg-video-cont lg-has-iframe" style="max-width:' +
                  k.s.iframeMaxWidth +
                  '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                  f +
                  '"  allowfullscreen="true"></iframe></div></div>'
              );
          else if (l) {
            var p = "";
            (p =
              o && o.youtube
                ? "lg-has-youtube"
                : o && o.vimeo
                ? "lg-has-vimeo"
                : "lg-has-html5"),
              k.$slide
                .eq(b)
                .prepend(
                  '<div class="lg-video-cont ' +
                    p +
                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                    g +
                    '" /></div></div>'
                );
          } else
            o
              ? (k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                  ),
                k.$el.trigger("hasVideo.lg", [b, f, j]))
              : k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                      f +
                      '" /></div>'
                  );
          if (
            (k.$el.trigger("onAferAppendSlide.lg", [b]),
            (e = k.$slide.eq(b).find(".lg-object")),
            i && e.attr("sizes", i),
            h)
          ) {
            e.attr("srcset", h);
            try {
              picturefill({ elements: [e[0]] });
            } catch (a) {
              console.warn(
                "lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document."
              );
            }
          }
          ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b),
            k.$slide.eq(b).addClass("lg-loaded");
        }
        k.$slide
          .eq(b)
          .find(".lg-object")
          .on("load.lg error.lg", function () {
            var c = 0;
            d && !a("body").hasClass("lg-from-hash") && (c = d),
              setTimeout(function () {
                k.$slide.eq(b).addClass("lg-complete"),
                  k.$el.trigger("onSlideItemLoad.lg", [b, d || 0]);
              }, c);
          }),
          o && o.html5 && !l && k.$slide.eq(b).addClass("lg-complete"),
          !0 === c &&
            (k.$slide.eq(b).hasClass("lg-complete")
              ? k.preload(b)
              : k.$slide
                  .eq(b)
                  .find(".lg-object")
                  .on("load.lg error.lg", function () {
                    k.preload(b);
                  }));
      }),
      (b.prototype.slide = function (b, c, d, e) {
        var f = this.$outer.find(".lg-current").index(),
          g = this;
        if (!g.lGalleryOn || f !== b) {
          var h = this.$slide.length,
            i = g.lGalleryOn ? this.s.speed : 0;
          if (!g.lgBusy) {
            if (this.s.download) {
              var j;
              (j = g.s.dynamic
                ? !1 !== g.s.dynamicEl[b].downloadUrl &&
                  (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src)
                : "false" !== g.$items.eq(b).attr("data-download-url") &&
                  (g.$items.eq(b).attr("data-download-url") ||
                    g.$items.eq(b).attr("href") ||
                    g.$items.eq(b).attr("data-src"))),
                j
                  ? (a("#lg-download").attr("href", j),
                    g.$outer.removeClass("lg-hide-download"))
                  : g.$outer.addClass("lg-hide-download");
            }
            if (
              (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]),
              (g.lgBusy = !0),
              clearTimeout(g.hideBartimeout),
              ".lg-sub-html" === this.s.appendSubHtmlTo &&
                setTimeout(function () {
                  g.addHtml(b);
                }, i),
              this.arrowDisable(b),
              e || (b < f ? (e = "prev") : b > f && (e = "next")),
              c)
            ) {
              this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
              var k, l;
              h > 2
                ? ((k = b - 1),
                  (l = b + 1),
                  0 === b && f === h - 1
                    ? ((l = 0), (k = h - 1))
                    : b === h - 1 && 0 === f && ((l = 0), (k = h - 1)))
                : ((k = 0), (l = 1)),
                "prev" === e
                  ? g.$slide.eq(l).addClass("lg-next-slide")
                  : g.$slide.eq(k).addClass("lg-prev-slide"),
                g.$slide.eq(b).addClass("lg-current");
            } else
              g.$outer.addClass("lg-no-trans"),
                this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                "prev" === e
                  ? (this.$slide.eq(b).addClass("lg-prev-slide"),
                    this.$slide.eq(f).addClass("lg-next-slide"))
                  : (this.$slide.eq(b).addClass("lg-next-slide"),
                    this.$slide.eq(f).addClass("lg-prev-slide")),
                setTimeout(function () {
                  g.$slide.removeClass("lg-current"),
                    g.$slide.eq(b).addClass("lg-current"),
                    g.$outer.removeClass("lg-no-trans");
                }, 50);
            g.lGalleryOn
              ? (setTimeout(function () {
                  g.loadContent(b, !0, 0);
                }, this.s.speed + 50),
                setTimeout(function () {
                  (g.lgBusy = !1),
                    g.$el.trigger("onAfterSlide.lg", [f, b, c, d]);
                }, this.s.speed))
              : (g.loadContent(b, !0, g.s.backdropDuration),
                (g.lgBusy = !1),
                g.$el.trigger("onAfterSlide.lg", [f, b, c, d])),
              (g.lGalleryOn = !0),
              this.s.counter && a("#lg-counter-current").text(b + 1);
          }
          g.index = b;
        }
      }),
      (b.prototype.goToNextSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index + 1 < b.$slide.length
              ? (b.index++,
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : c
              ? ((b.index = 0),
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-right-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-right-end");
                }, 400)));
      }),
      (b.prototype.goToPrevSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index > 0
              ? (b.index--,
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : c
              ? ((b.index = b.$items.length - 1),
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-left-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-left-end");
                }, 400)));
      }),
      (b.prototype.keyPress = function () {
        var b = this;
        this.$items.length > 1 &&
          a(window).on("keyup.lg", function (a) {
            b.$items.length > 1 &&
              (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()),
              39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()));
          }),
          a(window).on("keydown.lg", function (a) {
            !0 === b.s.escKey &&
              27 === a.keyCode &&
              (a.preventDefault(),
              b.$outer.hasClass("lg-thumb-open")
                ? b.$outer.removeClass("lg-thumb-open")
                : b.destroy());
          });
      }),
      (b.prototype.arrow = function () {
        var a = this;
        this.$outer.find(".lg-prev").on("click.lg", function () {
          a.goToPrevSlide();
        }),
          this.$outer.find(".lg-next").on("click.lg", function () {
            a.goToNextSlide();
          });
      }),
      (b.prototype.arrowDisable = function (a) {
        !this.s.loop &&
          this.s.hideControlOnEnd &&
          (a + 1 < this.$slide.length
            ? this.$outer
                .find(".lg-next")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-next")
                .attr("disabled", "disabled")
                .addClass("disabled"),
          a > 0
            ? this.$outer
                .find(".lg-prev")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-prev")
                .attr("disabled", "disabled")
                .addClass("disabled"));
      }),
      (b.prototype.setTranslate = function (a, b, c) {
        this.s.useLeft
          ? a.css("left", b)
          : a.css({ transform: "translate3d(" + b + "px, " + c + "px, 0px)" });
      }),
      (b.prototype.touchMove = function (b, c) {
        var d = c - b;
        Math.abs(d) > 15 &&
          (this.$outer.addClass("lg-dragging"),
          this.setTranslate(this.$slide.eq(this.index), d, 0),
          this.setTranslate(
            a(".lg-prev-slide"),
            -this.$slide.eq(this.index).width() + d,
            0
          ),
          this.setTranslate(
            a(".lg-next-slide"),
            this.$slide.eq(this.index).width() + d,
            0
          ));
      }),
      (b.prototype.touchEnd = function (a) {
        var b = this;
        "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"),
          this.$slide
            .not(".lg-current, .lg-prev-slide, .lg-next-slide")
            .css("opacity", "0"),
          setTimeout(function () {
            b.$outer.removeClass("lg-dragging"),
              a < 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToNextSlide(!0)
                : a > 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToPrevSlide(!0)
                : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"),
              b.$slide.removeAttr("style");
          }),
          setTimeout(function () {
            b.$outer.hasClass("lg-dragging") ||
              "lg-slide" === b.s.mode ||
              b.$outer.removeClass("lg-slide");
          }, b.s.speed + 100);
      }),
      (b.prototype.enableSwipe = function () {
        var a = this,
          b = 0,
          c = 0,
          d = !1;
        a.s.enableSwipe &&
          a.doCss() &&
          (a.$slide.on("touchstart.lg", function (c) {
            a.$outer.hasClass("lg-zoomed") ||
              a.lgBusy ||
              (c.preventDefault(),
              a.manageSwipeClass(),
              (b = c.originalEvent.targetTouches[0].pageX));
          }),
          a.$slide.on("touchmove.lg", function (e) {
            a.$outer.hasClass("lg-zoomed") ||
              (e.preventDefault(),
              (c = e.originalEvent.targetTouches[0].pageX),
              a.touchMove(b, c),
              (d = !0));
          }),
          a.$slide.on("touchend.lg", function () {
            a.$outer.hasClass("lg-zoomed") ||
              (d
                ? ((d = !1), a.touchEnd(c - b))
                : a.$el.trigger("onSlideClick.lg"));
          }));
      }),
      (b.prototype.enableDrag = function () {
        var b = this,
          c = 0,
          d = 0,
          e = !1,
          f = !1;
        b.s.enableDrag &&
          b.doCss() &&
          (b.$slide.on("mousedown.lg", function (d) {
            b.$outer.hasClass("lg-zoomed") ||
              b.lgBusy ||
              a(d.target).text().trim() ||
              (d.preventDefault(),
              b.manageSwipeClass(),
              (c = d.pageX),
              (e = !0),
              (b.$outer.scrollLeft += 1),
              (b.$outer.scrollLeft -= 1),
              b.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
              b.$el.trigger("onDragstart.lg"));
          }),
          a(window).on("mousemove.lg", function (a) {
            e &&
              ((f = !0),
              (d = a.pageX),
              b.touchMove(c, d),
              b.$el.trigger("onDragmove.lg"));
          }),
          a(window).on("mouseup.lg", function (g) {
            f
              ? ((f = !1), b.touchEnd(d - c), b.$el.trigger("onDragend.lg"))
              : (a(g.target).hasClass("lg-object") ||
                  a(g.target).hasClass("lg-video-play")) &&
                b.$el.trigger("onSlideClick.lg"),
              e &&
                ((e = !1),
                b.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
          }));
      }),
      (b.prototype.manageSwipeClass = function () {
        var a = this.index + 1,
          b = this.index - 1;
        this.s.loop &&
          this.$slide.length > 2 &&
          (0 === this.index
            ? (b = this.$slide.length - 1)
            : this.index === this.$slide.length - 1 && (a = 0)),
          this.$slide.removeClass("lg-next-slide lg-prev-slide"),
          b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"),
          this.$slide.eq(a).addClass("lg-next-slide");
      }),
      (b.prototype.mousewheel = function () {
        var a = this;
        a.$outer.on("mousewheel.lg", function (b) {
          b.deltaY &&
            (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(),
            b.preventDefault());
        });
      }),
      (b.prototype.closeGallery = function () {
        var b = this,
          c = !1;
        this.$outer.find(".lg-close").on("click.lg", function () {
          b.destroy();
        }),
          b.s.closable &&
            (b.$outer.on("mousedown.lg", function (b) {
              c = !!(
                a(b.target).is(".lg-outer") ||
                a(b.target).is(".lg-item ") ||
                a(b.target).is(".lg-img-wrap")
              );
            }),
            b.$outer.on("mousemove.lg", function () {
              c = !1;
            }),
            b.$outer.on("mouseup.lg", function (d) {
              (a(d.target).is(".lg-outer") ||
                a(d.target).is(".lg-item ") ||
                (a(d.target).is(".lg-img-wrap") && c)) &&
                (b.$outer.hasClass("lg-dragging") || b.destroy());
            }));
      }),
      (b.prototype.destroy = function (b) {
        var c = this;
        b ||
          (c.$el.trigger("onBeforeClose.lg"),
          a(window).scrollTop(c.prevScrollTop)),
          b &&
            (c.s.dynamic || this.$items.off("click.lg click.lgcustom"),
            a.removeData(c.el, "lightGallery")),
          this.$el.off(".lg.tm"),
          a.each(a.fn.lightGallery.modules, function (a) {
            c.modules[a] && c.modules[a].destroy();
          }),
          (this.lGalleryOn = !1),
          clearTimeout(c.hideBartimeout),
          (this.hideBartimeout = !1),
          a(window).off(".lg"),
          a("body").removeClass("lg-on lg-from-hash"),
          c.$outer && c.$outer.removeClass("lg-visible"),
          a(".lg-backdrop").removeClass("in"),
          setTimeout(function () {
            c.$outer && c.$outer.remove(),
              a(".lg-backdrop").remove(),
              b || c.$el.trigger("onCloseAfter.lg");
          }, c.s.backdropDuration + 50);
      }),
      (a.fn.lightGallery = function (c) {
        return this.each(function () {
          if (a.data(this, "lightGallery"))
            try {
              a(this).data("lightGallery").init();
            } catch (a) {
              console.error("lightGallery has not initiated properly");
            }
          else a.data(this, "lightGallery", new b(this, c));
        });
      }),
      (a.fn.lightGallery.modules = {});
  })();
}),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = {
          autoplay: !1,
          pause: 5e3,
          progressBar: !0,
          fourceAutoplay: !1,
          autoplayControls: !0,
          appendAutoplayControlsTo: ".lg-toolbar",
        },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.$el = a(c)),
            !(this.core.$items.length < 2) &&
              ((this.core.s = a.extend({}, b, this.core.s)),
              (this.interval = !1),
              (this.fromAuto = !0),
              (this.canceledOnTouch = !1),
              (this.fourceAutoplayTemp = this.core.s.fourceAutoplay),
              this.core.doCss() || (this.core.s.progressBar = !1),
              this.init(),
              this)
          );
        };
      (c.prototype.init = function () {
        var a = this;
        a.core.s.autoplayControls && a.controls(),
          a.core.s.progressBar &&
            a.core.$outer
              .find(".lg")
              .append(
                '<div class="lg-progress-bar"><div class="lg-progress"></div></div>'
              ),
          a.progress(),
          a.core.s.autoplay &&
            a.$el.one("onSlideItemLoad.lg.tm", function () {
              a.startlAuto();
            }),
          a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function () {
            a.interval && (a.cancelAuto(), (a.canceledOnTouch = !0));
          }),
          a.$el.on(
            "onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm",
            function () {
              !a.interval &&
                a.canceledOnTouch &&
                (a.startlAuto(), (a.canceledOnTouch = !1));
            }
          );
      }),
        (c.prototype.progress = function () {
          var a,
            b,
            c = this;
          c.$el.on("onBeforeSlide.lg.tm", function () {
            c.core.s.progressBar &&
              c.fromAuto &&
              ((a = c.core.$outer.find(".lg-progress-bar")),
              (b = c.core.$outer.find(".lg-progress")),
              c.interval &&
                (b.removeAttr("style"),
                a.removeClass("lg-start"),
                setTimeout(function () {
                  b.css(
                    "transition",
                    "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"
                  ),
                    a.addClass("lg-start");
                }, 20))),
              c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(),
              (c.fromAuto = !1);
          });
        }),
        (c.prototype.controls = function () {
          var b = this;
          a(this.core.s.appendAutoplayControlsTo).append(
            '<span class="lg-autoplay-button lg-icon"></span>'
          ),
            b.core.$outer
              .find(".lg-autoplay-button")
              .on("click.lg", function () {
                a(b.core.$outer).hasClass("lg-show-autoplay")
                  ? (b.cancelAuto(), (b.core.s.fourceAutoplay = !1))
                  : b.interval ||
                    (b.startlAuto(),
                    (b.core.s.fourceAutoplay = b.fourceAutoplayTemp));
              });
        }),
        (c.prototype.startlAuto = function () {
          var a = this;
          a.core.$outer
            .find(".lg-progress")
            .css(
              "transition",
              "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"
            ),
            a.core.$outer.addClass("lg-show-autoplay"),
            a.core.$outer.find(".lg-progress-bar").addClass("lg-start"),
            (a.interval = setInterval(function () {
              a.core.index + 1 < a.core.$items.length
                ? a.core.index++
                : (a.core.index = 0),
                (a.fromAuto = !0),
                a.core.slide(a.core.index, !1, !1, "next");
            }, a.core.s.speed + a.core.s.pause));
        }),
        (c.prototype.cancelAuto = function () {
          clearInterval(this.interval),
            (this.interval = !1),
            this.core.$outer.find(".lg-progress").removeAttr("style"),
            this.core.$outer.removeClass("lg-show-autoplay"),
            this.core.$outer.find(".lg-progress-bar").removeClass("lg-start");
        }),
        (c.prototype.destroy = function () {
          this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove();
        }),
        (a.fn.lightGallery.modules.autoplay = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = b(require("jquery")))
      : b(a.jQuery);
  })(this, function (a) {
    !(function () {
      "use strict";
      function b() {
        return (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        );
      }
      var c = { fullScreen: !0 },
        d = function (b) {
          return (
            (this.core = a(b).data("lightGallery")),
            (this.$el = a(b)),
            (this.core.s = a.extend({}, c, this.core.s)),
            this.init(),
            this
          );
        };
      (d.prototype.init = function () {
        var a = "";
        if (this.core.s.fullScreen) {
          if (
            !(
              document.fullscreenEnabled ||
              document.webkitFullscreenEnabled ||
              document.mozFullScreenEnabled ||
              document.msFullscreenEnabled
            )
          )
            return;
          (a = '<span class="lg-fullscreen lg-icon"></span>'),
            this.core.$outer.find(".lg-toolbar").append(a),
            this.fullScreen();
        }
      }),
        (d.prototype.requestFullscreen = function () {
          var a = document.documentElement;
          a.requestFullscreen
            ? a.requestFullscreen()
            : a.msRequestFullscreen
            ? a.msRequestFullscreen()
            : a.mozRequestFullScreen
            ? a.mozRequestFullScreen()
            : a.webkitRequestFullscreen && a.webkitRequestFullscreen();
        }),
        (d.prototype.exitFullscreen = function () {
          document.exitFullscreen
            ? document.exitFullscreen()
            : document.msExitFullscreen
            ? document.msExitFullscreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.webkitExitFullscreen && document.webkitExitFullscreen();
        }),
        (d.prototype.fullScreen = function () {
          var c = this;
          a(document).on(
            "fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg",
            function () {
              c.core.$outer.toggleClass("lg-fullscreen-on");
            }
          ),
            this.core.$outer.find(".lg-fullscreen").on("click.lg", function () {
              b() ? c.exitFullscreen() : c.requestFullscreen();
            });
        }),
        (d.prototype.destroy = function () {
          b() && this.exitFullscreen(),
            a(document).off(
              "fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg"
            );
        }),
        (a.fn.lightGallery.modules.fullscreen = d);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = { pager: !1 },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.$el = a(c)),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.pager && this.core.$items.length > 1 && this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var b,
          c,
          d,
          e = this,
          f = "";
        if (
          (e.core.$outer
            .find(".lg")
            .append('<div class="lg-pager-outer"></div>'),
          e.core.s.dynamic)
        )
          for (var g = 0; g < e.core.s.dynamicEl.length; g++)
            f +=
              '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
              e.core.s.dynamicEl[g].thumb +
              '" /></div></span>';
        else
          e.core.$items.each(function () {
            e.core.s.exThumbImage
              ? (f +=
                  '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
                  a(this).attr(e.core.s.exThumbImage) +
                  '" /></div></span>')
              : (f +=
                  '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
                  a(this).find("img").attr("src") +
                  '" /></div></span>');
          });
        (c = e.core.$outer.find(".lg-pager-outer")),
          c.html(f),
          (b = e.core.$outer.find(".lg-pager-cont")),
          b.on("click.lg touchend.lg", function () {
            var b = a(this);
            (e.core.index = b.index()), e.core.slide(e.core.index, !1, !0, !1);
          }),
          c.on("mouseover.lg", function () {
            clearTimeout(d), c.addClass("lg-pager-hover");
          }),
          c.on("mouseout.lg", function () {
            d = setTimeout(function () {
              c.removeClass("lg-pager-hover");
            });
          }),
          e.core.$el.on("onBeforeSlide.lg.tm", function (a, c, d) {
            b.removeClass("lg-pager-active"),
              b.eq(d).addClass("lg-pager-active");
          });
      }),
        (c.prototype.destroy = function () {}),
        (a.fn.lightGallery.modules.pager = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = {
          thumbnail: !0,
          animateThumb: !0,
          currentPagerPosition: "middle",
          thumbWidth: 100,
          thumbHeight: "80px",
          thumbContHeight: 100,
          thumbMargin: 5,
          exThumbImage: !1,
          showThumbByDefault: !0,
          toogleThumb: !0,
          pullCaptionUp: !0,
          enableThumbDrag: !0,
          enableThumbSwipe: !0,
          swipeThreshold: 50,
          loadYoutubeThumbnail: !0,
          youtubeThumbSize: 1,
          loadVimeoThumbnail: !0,
          vimeoThumbSize: "thumbnail_small",
          loadDailymotionThumbnail: !0,
        },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.core.s = a.extend({}, b, this.core.s)),
            (this.$el = a(c)),
            (this.$thumbOuter = null),
            (this.thumbOuterWidth = 0),
            (this.thumbTotalWidth =
              this.core.$items.length *
              (this.core.s.thumbWidth + this.core.s.thumbMargin)),
            (this.thumbIndex = this.core.index),
            this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"),
            (this.left = 0),
            this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var a = this;
        this.core.s.thumbnail &&
          this.core.$items.length > 1 &&
          (this.core.s.showThumbByDefault &&
            setTimeout(function () {
              a.core.$outer.addClass("lg-thumb-open");
            }, 700),
          this.core.s.pullCaptionUp &&
            this.core.$outer.addClass("lg-pull-caption-up"),
          this.build(),
          this.core.s.animateThumb && this.core.doCss()
            ? (this.core.s.enableThumbDrag && this.enableThumbDrag(),
              this.core.s.enableThumbSwipe && this.enableThumbSwipe(),
              (this.thumbClickable = !1))
            : (this.thumbClickable = !0),
          this.toogle(),
          this.thumbkeyPress());
      }),
        (c.prototype.build = function () {
          function b(a, b, c) {
            var g,
              h = d.core.isVideo(a, c) || {},
              i = "";
            h.youtube || h.vimeo || h.dailymotion
              ? h.youtube
                ? (g = d.core.s.loadYoutubeThumbnail
                    ? "//img.youtube.com/vi/" +
                      h.youtube[1] +
                      "/" +
                      d.core.s.youtubeThumbSize +
                      ".jpg"
                    : b)
                : h.vimeo
                ? d.core.s.loadVimeoThumbnail
                  ? ((g = "//i.vimeocdn.com/video/error_" + f + ".jpg"),
                    (i = h.vimeo[1]))
                  : (g = b)
                : h.dailymotion &&
                  (g = d.core.s.loadDailymotionThumbnail
                    ? "//www.dailymotion.com/thumbnail/video/" +
                      h.dailymotion[1]
                    : b)
              : (g = b),
              (e +=
                '<div data-vimeo-id="' +
                i +
                '" class="lg-thumb-item" style="width:' +
                d.core.s.thumbWidth +
                "px; height: " +
                d.core.s.thumbHeight +
                "; margin-right: " +
                d.core.s.thumbMargin +
                'px"><img src="' +
                g +
                '" /></div>'),
              (i = "");
          }
          var c,
            d = this,
            e = "",
            f = "",
            g =
              '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
          switch (this.core.s.vimeoThumbSize) {
            case "thumbnail_large":
              f = "640";
              break;
            case "thumbnail_medium":
              f = "200x150";
              break;
            case "thumbnail_small":
              f = "100x75";
          }
          if (
            (d.core.$outer.addClass("lg-has-thumb"),
            d.core.$outer.find(".lg").append(g),
            (d.$thumbOuter = d.core.$outer.find(".lg-thumb-outer")),
            (d.thumbOuterWidth = d.$thumbOuter.width()),
            d.core.s.animateThumb &&
              d.core.$outer
                .find(".lg-thumb")
                .css({ width: d.thumbTotalWidth + "px", position: "relative" }),
            this.core.s.animateThumb &&
              d.$thumbOuter.css("height", d.core.s.thumbContHeight + "px"),
            d.core.s.dynamic)
          )
            for (var h = 0; h < d.core.s.dynamicEl.length; h++)
              b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h);
          else
            d.core.$items.each(function (c) {
              d.core.s.exThumbImage
                ? b(
                    a(this).attr("href") || a(this).attr("data-src"),
                    a(this).attr(d.core.s.exThumbImage),
                    c
                  )
                : b(
                    a(this).attr("href") || a(this).attr("data-src"),
                    a(this).find("img").attr("src"),
                    c
                  );
            });
          d.core.$outer.find(".lg-thumb").html(e),
            (c = d.core.$outer.find(".lg-thumb-item")),
            c.each(function () {
              var b = a(this),
                c = b.attr("data-vimeo-id");
              c &&
                a.getJSON(
                  "//www.vimeo.com/api/v2/video/" + c + ".json?callback=?",
                  { format: "json" },
                  function (a) {
                    b.find("img").attr("src", a[0][d.core.s.vimeoThumbSize]);
                  }
                );
            }),
            c.eq(d.core.index).addClass("active"),
            d.core.$el.on("onBeforeSlide.lg.tm", function () {
              c.removeClass("active"), c.eq(d.core.index).addClass("active");
            }),
            c.on("click.lg touchend.lg", function () {
              var b = a(this);
              setTimeout(function () {
                ((d.thumbClickable && !d.core.lgBusy) || !d.core.doCss()) &&
                  ((d.core.index = b.index()),
                  d.core.slide(d.core.index, !1, !0, !1));
              }, 50);
            }),
            d.core.$el.on("onBeforeSlide.lg.tm", function () {
              d.animateThumb(d.core.index);
            }),
            a(window).on(
              "resize.lg.thumb orientationchange.lg.thumb",
              function () {
                setTimeout(function () {
                  d.animateThumb(d.core.index),
                    (d.thumbOuterWidth = d.$thumbOuter.width());
                }, 200);
              }
            );
        }),
        (c.prototype.setTranslate = function (a) {
          this.core.$outer
            .find(".lg-thumb")
            .css({ transform: "translate3d(-" + a + "px, 0px, 0px)" });
        }),
        (c.prototype.animateThumb = function (a) {
          var b = this.core.$outer.find(".lg-thumb");
          if (this.core.s.animateThumb) {
            var c;
            switch (this.core.s.currentPagerPosition) {
              case "left":
                c = 0;
                break;
              case "middle":
                c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                break;
              case "right":
                c = this.thumbOuterWidth - this.core.s.thumbWidth;
            }
            (this.left =
              (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c),
              this.left > this.thumbTotalWidth - this.thumbOuterWidth &&
                (this.left = this.thumbTotalWidth - this.thumbOuterWidth),
              this.left < 0 && (this.left = 0),
              this.core.lGalleryOn
                ? (b.hasClass("on") ||
                    this.core.$outer
                      .find(".lg-thumb")
                      .css("transition-duration", this.core.s.speed + "ms"),
                  this.core.doCss() ||
                    b.animate({ left: -this.left + "px" }, this.core.s.speed))
                : this.core.doCss() || b.css("left", -this.left + "px"),
              this.setTranslate(this.left);
          }
        }),
        (c.prototype.enableThumbDrag = function () {
          var b = this,
            c = 0,
            d = 0,
            e = !1,
            f = !1,
            g = 0;
          b.$thumbOuter.addClass("lg-grab"),
            b.core.$outer
              .find(".lg-thumb")
              .on("mousedown.lg.thumb", function (a) {
                b.thumbTotalWidth > b.thumbOuterWidth &&
                  (a.preventDefault(),
                  (c = a.pageX),
                  (e = !0),
                  (b.core.$outer.scrollLeft += 1),
                  (b.core.$outer.scrollLeft -= 1),
                  (b.thumbClickable = !1),
                  b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
              }),
            a(window).on("mousemove.lg.thumb", function (a) {
              e &&
                ((g = b.left),
                (f = !0),
                (d = a.pageX),
                b.$thumbOuter.addClass("lg-dragging"),
                (g -= d - c),
                g > b.thumbTotalWidth - b.thumbOuterWidth &&
                  (g = b.thumbTotalWidth - b.thumbOuterWidth),
                g < 0 && (g = 0),
                b.setTranslate(g));
            }),
            a(window).on("mouseup.lg.thumb", function () {
              f
                ? ((f = !1),
                  b.$thumbOuter.removeClass("lg-dragging"),
                  (b.left = g),
                  Math.abs(d - c) < b.core.s.swipeThreshold &&
                    (b.thumbClickable = !0))
                : (b.thumbClickable = !0),
                e &&
                  ((e = !1),
                  b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"));
            });
        }),
        (c.prototype.enableThumbSwipe = function () {
          var a = this,
            b = 0,
            c = 0,
            d = !1,
            e = 0;
          a.core.$outer.find(".lg-thumb").on("touchstart.lg", function (c) {
            a.thumbTotalWidth > a.thumbOuterWidth &&
              (c.preventDefault(),
              (b = c.originalEvent.targetTouches[0].pageX),
              (a.thumbClickable = !1));
          }),
            a.core.$outer.find(".lg-thumb").on("touchmove.lg", function (f) {
              a.thumbTotalWidth > a.thumbOuterWidth &&
                (f.preventDefault(),
                (c = f.originalEvent.targetTouches[0].pageX),
                (d = !0),
                a.$thumbOuter.addClass("lg-dragging"),
                (e = a.left),
                (e -= c - b),
                e > a.thumbTotalWidth - a.thumbOuterWidth &&
                  (e = a.thumbTotalWidth - a.thumbOuterWidth),
                e < 0 && (e = 0),
                a.setTranslate(e));
            }),
            a.core.$outer.find(".lg-thumb").on("touchend.lg", function () {
              a.thumbTotalWidth > a.thumbOuterWidth && d
                ? ((d = !1),
                  a.$thumbOuter.removeClass("lg-dragging"),
                  Math.abs(c - b) < a.core.s.swipeThreshold &&
                    (a.thumbClickable = !0),
                  (a.left = e))
                : (a.thumbClickable = !0);
            });
        }),
        (c.prototype.toogle = function () {
          var a = this;
          a.core.s.toogleThumb &&
            (a.core.$outer.addClass("lg-can-toggle"),
            a.$thumbOuter.append(
              '<span class="lg-toogle-thumb lg-icon"></span>'
            ),
            a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function () {
              a.core.$outer.toggleClass("lg-thumb-open");
            }));
        }),
        (c.prototype.thumbkeyPress = function () {
          var b = this;
          a(window).on("keydown.lg.thumb", function (a) {
            38 === a.keyCode
              ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open"))
              : 40 === a.keyCode &&
                (a.preventDefault(),
                b.core.$outer.removeClass("lg-thumb-open"));
          });
        }),
        (c.prototype.destroy = function () {
          this.core.s.thumbnail &&
            this.core.$items.length > 1 &&
            (a(window).off(
              "resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"
            ),
            this.$thumbOuter.remove(),
            this.core.$outer.removeClass("lg-has-thumb"));
        }),
        (a.fn.lightGallery.modules.Thumbnail = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = b(require("jquery")))
      : b(a.jQuery);
  })(this, function (a) {
    !(function () {
      "use strict";
      function b(a, b, c, d) {
        var e = this;
        if (
          (e.core.$slide
            .eq(b)
            .find(".lg-video")
            .append(e.loadVideo(c, "lg-object", !0, b, d)),
          d)
        )
          if (e.core.s.videojs)
            try {
              videojs(
                e.core.$slide.eq(b).find(".lg-html5").get(0),
                e.core.s.videojsOptions,
                function () {
                  !e.videoLoaded && e.core.s.autoplayFirstVideo && this.play();
                }
              );
            } catch (a) {
              console.error("Make sure you have included videojs");
            }
          else
            !e.videoLoaded &&
              e.core.s.autoplayFirstVideo &&
              e.core.$slide.eq(b).find(".lg-html5").get(0).play();
      }
      function c(a, b) {
        var c = this.core.$slide.eq(b).find(".lg-video-cont");
        c.hasClass("lg-has-iframe") ||
          (c.css("max-width", this.core.s.videoMaxWidth),
          (this.videoLoaded = !0));
      }
      function d(b, c, d) {
        var e = this,
          f = e.core.$slide.eq(c),
          g = f.find(".lg-youtube").get(0),
          h = f.find(".lg-vimeo").get(0),
          i = f.find(".lg-dailymotion").get(0),
          j = f.find(".lg-vk").get(0),
          k = f.find(".lg-html5").get(0);
        if (g)
          g.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        else if (h)
          try {
            $f(h).api("pause");
          } catch (a) {
            console.error("Make sure you have included froogaloop2 js");
          }
        else if (i) i.contentWindow.postMessage("pause", "*");
        else if (k)
          if (e.core.s.videojs)
            try {
              videojs(k).pause();
            } catch (a) {
              console.error("Make sure you have included videojs");
            }
          else k.pause();
        j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
        var l;
        l = e.core.s.dynamic
          ? e.core.s.dynamicEl[d].src
          : e.core.$items.eq(d).attr("href") ||
            e.core.$items.eq(d).attr("data-src");
        var m = e.core.isVideo(l, d) || {};
        (m.youtube || m.vimeo || m.dailymotion || m.vk) &&
          e.core.$outer.addClass("lg-hide-download");
      }
      var e = {
          videoMaxWidth: "855px",
          autoplayFirstVideo: !0,
          youtubePlayerParams: !1,
          vimeoPlayerParams: !1,
          dailymotionPlayerParams: !1,
          vkPlayerParams: !1,
          videojs: !1,
          videojsOptions: {},
        },
        f = function (b) {
          return (
            (this.core = a(b).data("lightGallery")),
            (this.$el = a(b)),
            (this.core.s = a.extend({}, e, this.core.s)),
            (this.videoLoaded = !1),
            this.init(),
            this
          );
        };
      (f.prototype.init = function () {
        var e = this;
        e.core.$el.on("hasVideo.lg.tm", b.bind(this)),
          e.core.$el.on("onAferAppendSlide.lg.tm", c.bind(this)),
          e.core.doCss() &&
          e.core.$items.length > 1 &&
          (e.core.s.enableSwipe || e.core.s.enableDrag)
            ? e.core.$el.on("onSlideClick.lg.tm", function () {
                var a = e.core.$slide.eq(e.core.index);
                e.loadVideoOnclick(a);
              })
            : e.core.$slide.on("click.lg", function () {
                e.loadVideoOnclick(a(this));
              }),
          e.core.$el.on("onBeforeSlide.lg.tm", d.bind(this)),
          e.core.$el.on("onAfterSlide.lg.tm", function (a, b) {
            e.core.$slide.eq(b).removeClass("lg-video-playing");
          }),
          e.core.s.autoplayFirstVideo &&
            e.core.$el.on("onAferAppendSlide.lg.tm", function (a, b) {
              if (!e.core.lGalleryOn) {
                var c = e.core.$slide.eq(b);
                setTimeout(function () {
                  e.loadVideoOnclick(c);
                }, 100);
              }
            });
      }),
        (f.prototype.loadVideo = function (b, c, d, e, f) {
          var g = "",
            h = 1,
            i = "",
            j = this.core.isVideo(b, e) || {};
          if (
            (d &&
              (h = this.videoLoaded
                ? 0
                : this.core.s.autoplayFirstVideo
                ? 1
                : 0),
            j.youtube)
          )
            (i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1"),
              this.core.s.youtubePlayerParams &&
                (i = i + "&" + a.param(this.core.s.youtubePlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-youtube ' +
                c +
                '" width="560" height="315" src="//www.youtube.com/embed/' +
                j.youtube[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>');
          else if (j.vimeo)
            (i = "?autoplay=" + h + "&api=1"),
              this.core.s.vimeoPlayerParams &&
                (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-vimeo ' +
                c +
                '" width="560" height="315"  src="//player.vimeo.com/video/' +
                j.vimeo[1] +
                i +
                '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
          else if (j.dailymotion)
            (i = "?wmode=opaque&autoplay=" + h + "&api=postMessage"),
              this.core.s.dailymotionPlayerParams &&
                (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-dailymotion ' +
                c +
                '" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
                j.dailymotion[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>');
          else if (j.html5) {
            var k = f.substring(0, 1);
            ("." !== k && "#" !== k) || (f = a(f).html()), (g = f);
          } else
            j.vk &&
              ((i = "&autoplay=" + h),
              this.core.s.vkPlayerParams &&
                (i = i + "&" + a.param(this.core.s.vkPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-vk ' +
                c +
                '" width="560" height="315" src="//vk.com/video_ext.php?' +
                j.vk[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>'));
          return g;
        }),
        (f.prototype.loadVideoOnclick = function (a) {
          var b = this;
          if (
            a.find(".lg-object").hasClass("lg-has-poster") &&
            a.find(".lg-object").is(":visible")
          )
            if (a.hasClass("lg-has-video")) {
              var c = a.find(".lg-youtube").get(0),
                d = a.find(".lg-vimeo").get(0),
                e = a.find(".lg-dailymotion").get(0),
                f = a.find(".lg-html5").get(0);
              if (c)
                c.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  "*"
                );
              else if (d)
                try {
                  $f(d).api("play");
                } catch (a) {
                  console.error("Make sure you have included froogaloop2 js");
                }
              else if (e) e.contentWindow.postMessage("play", "*");
              else if (f)
                if (b.core.s.videojs)
                  try {
                    videojs(f).play();
                  } catch (a) {
                    console.error("Make sure you have included videojs");
                  }
                else f.play();
              a.addClass("lg-video-playing");
            } else {
              a.addClass("lg-video-playing lg-has-video");
              var g,
                h,
                i = function (c, d) {
                  if (
                    (a
                      .find(".lg-video")
                      .append(b.loadVideo(c, "", !1, b.core.index, d)),
                    d)
                  )
                    if (b.core.s.videojs)
                      try {
                        videojs(
                          b.core.$slide
                            .eq(b.core.index)
                            .find(".lg-html5")
                            .get(0),
                          b.core.s.videojsOptions,
                          function () {
                            this.play();
                          }
                        );
                      } catch (a) {
                        console.error("Make sure you have included videojs");
                      }
                    else
                      b.core.$slide
                        .eq(b.core.index)
                        .find(".lg-html5")
                        .get(0)
                        .play();
                };
              b.core.s.dynamic
                ? ((g = b.core.s.dynamicEl[b.core.index].src),
                  (h = b.core.s.dynamicEl[b.core.index].html),
                  i(g, h))
                : ((g =
                    b.core.$items.eq(b.core.index).attr("href") ||
                    b.core.$items.eq(b.core.index).attr("data-src")),
                  (h = b.core.$items.eq(b.core.index).attr("data-html")),
                  i(g, h));
              var j = a.find(".lg-object");
              a.find(".lg-video").append(j),
                a.find(".lg-video-object").hasClass("lg-html5") ||
                  (a.removeClass("lg-complete"),
                  a
                    .find(".lg-video-object")
                    .on("load.lg error.lg", function () {
                      a.addClass("lg-complete");
                    }));
            }
        }),
        (f.prototype.destroy = function () {
          this.videoLoaded = !1;
        }),
        (a.fn.lightGallery.modules.video = f);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = function () {
          var a = !1,
            b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
          return b && parseInt(b[2], 10) < 54 && (a = !0), a;
        },
        c = {
          scale: 1,
          zoom: !0,
          actualSize: !0,
          enableZoomAfter: 300,
          useLeftForZoom: b(),
        },
        d = function (b) {
          return (
            (this.core = a(b).data("lightGallery")),
            (this.core.s = a.extend({}, c, this.core.s)),
            this.core.s.zoom &&
              this.core.doCss() &&
              (this.init(),
              (this.zoomabletimeout = !1),
              (this.pageX = a(window).width() / 2),
              (this.pageY = a(window).height() / 2 + a(window).scrollTop())),
            this
          );
        };
      (d.prototype.init = function () {
        var b = this,
          c =
            '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
        b.core.s.actualSize &&
          (c += '<span id="lg-actual-size" class="lg-icon"></span>'),
          b.core.s.useLeftForZoom
            ? b.core.$outer.addClass("lg-use-left-for-zoom")
            : b.core.$outer.addClass("lg-use-transition-for-zoom"),
          this.core.$outer.find(".lg-toolbar").append(c),
          b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function (c, d, e) {
            var f = b.core.s.enableZoomAfter + e;
            a("body").hasClass("lg-from-hash") && e
              ? (f = 0)
              : a("body").removeClass("lg-from-hash"),
              (b.zoomabletimeout = setTimeout(function () {
                b.core.$slide.eq(d).addClass("lg-zoomable");
              }, f + 30));
          });
        var d = 1,
          e = function (c) {
            var d,
              e,
              f = b.core.$outer.find(".lg-current .lg-image"),
              g = (a(window).width() - f.prop("offsetWidth")) / 2,
              h =
                (a(window).height() - f.prop("offsetHeight")) / 2 +
                a(window).scrollTop();
            (d = b.pageX - g), (e = b.pageY - h);
            var i = (c - 1) * d,
              j = (c - 1) * e;
            f
              .css("transform", "scale3d(" + c + ", " + c + ", 1)")
              .attr("data-scale", c),
              b.core.s.useLeftForZoom
                ? f
                    .parent()
                    .css({ left: -i + "px", top: -j + "px" })
                    .attr("data-x", i)
                    .attr("data-y", j)
                : f
                    .parent()
                    .css(
                      "transform",
                      "translate3d(-" + i + "px, -" + j + "px, 0)"
                    )
                    .attr("data-x", i)
                    .attr("data-y", j);
          },
          f = function () {
            d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(),
              d < 1 && (d = 1),
              e(d);
          },
          g = function (c, e, g, h) {
            var i,
              j = e.prop("offsetWidth");
            i = b.core.s.dynamic
              ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || j
              : b.core.$items.eq(g).attr("data-width") ||
                e[0].naturalWidth ||
                j;
            var k;
            b.core.$outer.hasClass("lg-zoomed")
              ? (d = 1)
              : i > j && ((k = i / j), (d = k || 2)),
              h
                ? ((b.pageX = a(window).width() / 2),
                  (b.pageY = a(window).height() / 2 + a(window).scrollTop()))
                : ((b.pageX =
                    c.pageX || c.originalEvent.targetTouches[0].pageX),
                  (b.pageY =
                    c.pageY || c.originalEvent.targetTouches[0].pageY)),
              f(),
              setTimeout(function () {
                b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab");
              }, 10);
          },
          h = !1;
        b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function (a, c) {
          var d = b.core.$slide.eq(c).find(".lg-image");
          d.on("dblclick", function (a) {
            g(a, d, c);
          }),
            d.on("touchstart", function (a) {
              h
                ? (clearTimeout(h), (h = null), g(a, d, c))
                : (h = setTimeout(function () {
                    h = null;
                  }, 300)),
                a.preventDefault();
            });
        }),
          a(window).on(
            "resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom",
            function () {
              (b.pageX = a(window).width() / 2),
                (b.pageY = a(window).height() / 2 + a(window).scrollTop()),
                e(d);
            }
          ),
          a("#lg-zoom-out").on("click.lg", function () {
            b.core.$outer.find(".lg-current .lg-image").length &&
              ((d -= b.core.s.scale), f());
          }),
          a("#lg-zoom-in").on("click.lg", function () {
            b.core.$outer.find(".lg-current .lg-image").length &&
              ((d += b.core.s.scale), f());
          }),
          a("#lg-actual-size").on("click.lg", function (a) {
            g(
              a,
              b.core.$slide.eq(b.core.index).find(".lg-image"),
              b.core.index,
              !0
            );
          }),
          b.core.$el.on("onBeforeSlide.lg.tm", function () {
            (d = 1), b.resetZoom();
          }),
          b.zoomDrag(),
          b.zoomSwipe();
      }),
        (d.prototype.resetZoom = function () {
          this.core.$outer.removeClass("lg-zoomed"),
            this.core.$slide
              .find(".lg-img-wrap")
              .removeAttr("style data-x data-y"),
            this.core.$slide.find(".lg-image").removeAttr("style data-scale"),
            (this.pageX = a(window).width() / 2),
            (this.pageY = a(window).height() / 2 + a(window).scrollTop());
        }),
        (d.prototype.zoomSwipe = function () {
          var a = this,
            b = {},
            c = {},
            d = !1,
            e = !1,
            f = !1;
          a.core.$slide.on("touchstart.lg", function (c) {
            if (a.core.$outer.hasClass("lg-zoomed")) {
              var d = a.core.$slide.eq(a.core.index).find(".lg-object");
              (f =
                d.prop("offsetHeight") * d.attr("data-scale") >
                a.core.$outer.find(".lg").height()),
                (e =
                  d.prop("offsetWidth") * d.attr("data-scale") >
                  a.core.$outer.find(".lg").width()),
                (e || f) &&
                  (c.preventDefault(),
                  (b = {
                    x: c.originalEvent.targetTouches[0].pageX,
                    y: c.originalEvent.targetTouches[0].pageY,
                  }));
            }
          }),
            a.core.$slide.on("touchmove.lg", function (g) {
              if (a.core.$outer.hasClass("lg-zoomed")) {
                var h,
                  i,
                  j = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                g.preventDefault(),
                  (d = !0),
                  (c = {
                    x: g.originalEvent.targetTouches[0].pageX,
                    y: g.originalEvent.targetTouches[0].pageY,
                  }),
                  a.core.$outer.addClass("lg-zoom-dragging"),
                  (i = f
                    ? -Math.abs(j.attr("data-y")) + (c.y - b.y)
                    : -Math.abs(j.attr("data-y"))),
                  (h = e
                    ? -Math.abs(j.attr("data-x")) + (c.x - b.x)
                    : -Math.abs(j.attr("data-x"))),
                  (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) &&
                    (a.core.s.useLeftForZoom
                      ? j.css({ left: h + "px", top: i + "px" })
                      : j.css(
                          "transform",
                          "translate3d(" + h + "px, " + i + "px, 0)"
                        ));
              }
            }),
            a.core.$slide.on("touchend.lg", function () {
              a.core.$outer.hasClass("lg-zoomed") &&
                d &&
                ((d = !1),
                a.core.$outer.removeClass("lg-zoom-dragging"),
                a.touchendZoom(b, c, e, f));
            });
        }),
        (d.prototype.zoomDrag = function () {
          var b = this,
            c = {},
            d = {},
            e = !1,
            f = !1,
            g = !1,
            h = !1;
          b.core.$slide.on("mousedown.lg.zoom", function (d) {
            var f = b.core.$slide.eq(b.core.index).find(".lg-object");
            (h =
              f.prop("offsetHeight") * f.attr("data-scale") >
              b.core.$outer.find(".lg").height()),
              (g =
                f.prop("offsetWidth") * f.attr("data-scale") >
                b.core.$outer.find(".lg").width()),
              b.core.$outer.hasClass("lg-zoomed") &&
                a(d.target).hasClass("lg-object") &&
                (g || h) &&
                (d.preventDefault(),
                (c = { x: d.pageX, y: d.pageY }),
                (e = !0),
                (b.core.$outer.scrollLeft += 1),
                (b.core.$outer.scrollLeft -= 1),
                b.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"));
          }),
            a(window).on("mousemove.lg.zoom", function (a) {
              if (e) {
                var i,
                  j,
                  k = b.core.$slide.eq(b.core.index).find(".lg-img-wrap");
                (f = !0),
                  (d = { x: a.pageX, y: a.pageY }),
                  b.core.$outer.addClass("lg-zoom-dragging"),
                  (j = h
                    ? -Math.abs(k.attr("data-y")) + (d.y - c.y)
                    : -Math.abs(k.attr("data-y"))),
                  (i = g
                    ? -Math.abs(k.attr("data-x")) + (d.x - c.x)
                    : -Math.abs(k.attr("data-x"))),
                  b.core.s.useLeftForZoom
                    ? k.css({ left: i + "px", top: j + "px" })
                    : k.css(
                        "transform",
                        "translate3d(" + i + "px, " + j + "px, 0)"
                      );
              }
            }),
            a(window).on("mouseup.lg.zoom", function (a) {
              e &&
                ((e = !1),
                b.core.$outer.removeClass("lg-zoom-dragging"),
                !f ||
                  (c.x === d.x && c.y === d.y) ||
                  ((d = { x: a.pageX, y: a.pageY }),
                  b.touchendZoom(c, d, g, h)),
                (f = !1)),
                b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab");
            });
        }),
        (d.prototype.touchendZoom = function (a, b, c, d) {
          var e = this,
            f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
            g = e.core.$slide.eq(e.core.index).find(".lg-object"),
            h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
            i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
            j =
              (e.core.$outer.find(".lg").height() - g.prop("offsetHeight")) / 2,
            k = Math.abs(
              g.prop("offsetHeight") * Math.abs(g.attr("data-scale")) -
                e.core.$outer.find(".lg").height() +
                j
            ),
            l = (e.core.$outer.find(".lg").width() - g.prop("offsetWidth")) / 2,
            m = Math.abs(
              g.prop("offsetWidth") * Math.abs(g.attr("data-scale")) -
                e.core.$outer.find(".lg").width() +
                l
            );
          (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) &&
            (d && (i <= -k ? (i = -k) : i >= -j && (i = -j)),
            c && (h <= -m ? (h = -m) : h >= -l && (h = -l)),
            d
              ? f.attr("data-y", Math.abs(i))
              : (i = -Math.abs(f.attr("data-y"))),
            c
              ? f.attr("data-x", Math.abs(h))
              : (h = -Math.abs(f.attr("data-x"))),
            e.core.s.useLeftForZoom
              ? f.css({ left: h + "px", top: i + "px" })
              : f.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"));
        }),
        (d.prototype.destroy = function () {
          var b = this;
          b.core.$el.off(".lg.zoom"),
            a(window).off(".lg.zoom"),
            b.core.$slide.off(".lg.zoom"),
            b.core.$el.off(".lg.tm.zoom"),
            b.resetZoom(),
            clearTimeout(b.zoomabletimeout),
            (b.zoomabletimeout = !1);
        }),
        (a.fn.lightGallery.modules.zoom = d);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = { hash: !0 },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.hash &&
              ((this.oldHash = window.location.hash), this.init()),
            this
          );
        };
      (c.prototype.init = function () {
        var b,
          c = this;
        c.core.$el.on("onAfterSlide.lg.tm", function (a, b, d) {
          history.replaceState
            ? history.replaceState(
                null,
                null,
                window.location.pathname +
                  window.location.search +
                  "#lg=" +
                  c.core.s.galleryId +
                  "&slide=" +
                  d
              )
            : (window.location.hash =
                "lg=" + c.core.s.galleryId + "&slide=" + d);
        }),
          a(window).on("hashchange.lg.hash", function () {
            b = window.location.hash;
            var a = parseInt(b.split("&slide=")[1], 10);
            b.indexOf("lg=" + c.core.s.galleryId) > -1
              ? c.core.slide(a, !1, !1)
              : c.core.lGalleryOn && c.core.destroy();
          });
      }),
        (c.prototype.destroy = function () {
          this.core.s.hash &&
            (this.oldHash &&
            this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0
              ? history.replaceState
                ? history.replaceState(null, null, this.oldHash)
                : (window.location.hash = this.oldHash)
              : history.replaceState
              ? history.replaceState(
                  null,
                  document.title,
                  window.location.pathname + window.location.search
                )
              : (window.location.hash = ""),
            this.core.$el.off(".lg.hash"));
        }),
        (a.fn.lightGallery.modules.hash = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = {
          share: !0,
          facebook: !0,
          facebookDropdownText: "Facebook",
          twitter: !0,
          twitterDropdownText: "Twitter",
          googlePlus: !0,
          googlePlusDropdownText: "GooglePlus",
          pinterest: !0,
          pinterestDropdownText: "Pinterest",
        },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.share && this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var b = this,
          c =
            '<span id="lg-share" class="lg-icon"><ul class="lg-dropdown" style="position: absolute;">';
        (c += b.core.s.facebook
          ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
            this.core.s.facebookDropdownText +
            "</span></a></li>"
          : ""),
          (c += b.core.s.twitter
            ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.twitterDropdownText +
              "</span></a></li>"
            : ""),
          (c += b.core.s.googlePlus
            ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.googlePlusDropdownText +
              "</span></a></li>"
            : ""),
          (c += b.core.s.pinterest
            ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.pinterestDropdownText +
              "</span></a></li>"
            : ""),
          (c += "</ul></span>"),
          this.core.$outer.find(".lg-toolbar").append(c),
          this.core.$outer
            .find(".lg")
            .append('<div id="lg-dropdown-overlay"></div>'),
          a("#lg-share").on("click.lg", function () {
            b.core.$outer.toggleClass("lg-dropdown-active");
          }),
          a("#lg-dropdown-overlay").on("click.lg", function () {
            b.core.$outer.removeClass("lg-dropdown-active");
          }),
          b.core.$el.on("onAfterSlide.lg.tm", function (c, d, e) {
            setTimeout(function () {
              a("#lg-share-facebook").attr(
                "href",
                "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(
                    b.getSahreProps(e, "facebookShareUrl") ||
                      window.location.href
                  )
              ),
                a("#lg-share-twitter").attr(
                  "href",
                  "https://twitter.com/intent/tweet?text=" +
                    b.getSahreProps(e, "tweetText") +
                    "&url=" +
                    encodeURIComponent(
                      b.getSahreProps(e, "twitterShareUrl") ||
                        window.location.href
                    )
                ),
                a("#lg-share-googleplus").attr(
                  "href",
                  "https://plus.google.com/share?url=" +
                    encodeURIComponent(
                      b.getSahreProps(e, "googleplusShareUrl") ||
                        window.location.href
                    )
                ),
                a("#lg-share-pinterest").attr(
                  "href",
                  "http://www.pinterest.com/pin/create/button/?url=" +
                    encodeURIComponent(
                      b.getSahreProps(e, "pinterestShareUrl") ||
                        window.location.href
                    ) +
                    "&media=" +
                    encodeURIComponent(b.getSahreProps(e, "src")) +
                    "&description=" +
                    b.getSahreProps(e, "pinterestText")
                );
            }, 100);
          });
      }),
        (c.prototype.getSahreProps = function (a, b) {
          var c = "";
          if (this.core.s.dynamic) c = this.core.s.dynamicEl[a][b];
          else {
            var d = this.core.$items.eq(a).attr("href"),
              e = this.core.$items.eq(a).data(b);
            c = "src" === b ? d || e : e;
          }
          return c;
        }),
        (c.prototype.destroy = function () {}),
        (a.fn.lightGallery.modules.share = c);
    })();
  });
/**
 * Owl carousel
 * @version 2.0.1
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
(function ($, window, document, undefined) {
  function Owl(element, options) {
    this.settings = null;
    this.options = $.extend({}, Owl.Defaults, options);
    this.$element = $(element);
    this._handlers = {};
    this._plugins = {};
    this._supress = {};
    this._current = null;
    this._speed = null;
    this._coordinates = [];
    this._breakpoint = null;
    this._width = null;
    this._items = [];
    this._clones = [];
    this._mergers = [];
    this._widths = [];
    this._invalidated = {};
    this._pipe = [];
    this._drag = {
      time: null,
      target: null,
      pointer: null,
      stage: { start: null, current: null },
      direction: null,
    };
    this._states = {
      current: {},
      tags: {
        initializing: ["busy"],
        animating: ["busy"],
        dragging: ["interacting"],
      },
    };
    $.each(
      ["onResize", "onThrottledResize"],
      $.proxy(function (i, handler) {
        this._handlers[handler] = $.proxy(this[handler], this);
      }, this)
    );
    $.each(
      Owl.Plugins,
      $.proxy(function (key, plugin) {
        this._plugins[key.charAt(0).toLowerCase() + key.slice(1)] = new plugin(
          this
        );
      }, this)
    );
    $.each(
      Owl.Workers,
      $.proxy(function (priority, worker) {
        this._pipe.push({
          filter: worker.filter,
          run: $.proxy(worker.run, this),
        });
      }, this)
    );
    this.setup();
    this.initialize();
  }
  Owl.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  };
  Owl.Width = { Default: "default", Inner: "inner", Outer: "outer" };
  Owl.Type = { Event: "event", State: "state" };
  Owl.Plugins = {};
  Owl.Workers = [
    {
      filter: ["width", "settings"],
      run: function () {
        this._width = this.$element.width();
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        cache.current =
          this._items && this._items[this.relative(this._current)];
      },
    },
    {
      filter: ["items", "settings"],
      run: function () {
        this.$stage.children(".cloned").remove();
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        var margin = this.settings.margin || "",
          grid = !this.settings.autoWidth,
          rtl = this.settings.rtl,
          css = {
            width: "auto",
            "margin-left": rtl ? margin : "",
            "margin-right": rtl ? "" : margin,
          };
        !grid && this.$stage.children().css(css);
        cache.css = css;
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        var width =
            (this.width() / this.settings.items).toFixed(3) -
            this.settings.margin,
          merge = null,
          iterator = this._items.length,
          grid = !this.settings.autoWidth,
          widths = [];
        cache.items = { merge: !1, width: width };
        while (iterator--) {
          merge = this._mergers[iterator];
          merge =
            (this.settings.mergeFit && Math.min(merge, this.settings.items)) ||
            merge;
          cache.items.merge = merge > 1 || cache.items.merge;
          widths[iterator] = !grid
            ? this._items[iterator].width()
            : width * merge;
        }
        this._widths = widths;
      },
    },
    {
      filter: ["items", "settings"],
      run: function () {
        var clones = [],
          items = this._items,
          settings = this.settings,
          view = Math.max(settings.items * 2, 4),
          size = Math.ceil(items.length / 2) * 2,
          repeat =
            settings.loop && items.length
              ? settings.rewind
                ? view
                : Math.max(view, size)
              : 0,
          append = "",
          prepend = "";
        repeat /= 2;
        while (repeat > 0) {
          clones.push(this.normalize(clones.length / 2, !0));
          append = append + items[clones[clones.length - 1]][0].outerHTML;
          clones.push(
            this.normalize(items.length - 1 - (clones.length - 1) / 2, !0)
          );
          prepend = items[clones[clones.length - 1]][0].outerHTML + prepend;
          repeat -= 1;
        }
        this._clones = clones;
        $(append).addClass("cloned").appendTo(this.$stage);
        $(prepend).addClass("cloned").prependTo(this.$stage);
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function () {
        var rtl = this.settings.rtl ? 1 : -1,
          size = this._clones.length + this._items.length,
          iterator = -1,
          previous = 0,
          current = 0,
          coordinates = [];
        while (++iterator < size) {
          previous = coordinates[iterator - 1] || 0;
          current =
            this._widths[this.relative(iterator)] + this.settings.margin;
          coordinates.push(previous + current * rtl);
        }
        this._coordinates = coordinates;
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function () {
        var padding = this.settings.stagePadding,
          coordinates = this._coordinates,
          css = {
            width:
              Math.ceil(Math.abs(coordinates[coordinates.length - 1])) +
              padding * 2,
            "padding-left": padding || "",
            "padding-right": padding || "",
          };
        this.$stage.css(css);
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        var iterator = this._coordinates.length,
          grid = !this.settings.autoWidth,
          items = this.$stage.children();
        if (grid && cache.items.merge) {
          while (iterator--) {
            cache.css.width = this._widths[this.relative(iterator)];
            items.eq(iterator).css(cache.css);
          }
        } else if (grid) {
          cache.css.width = cache.items.width;
          items.css(cache.css);
        }
      },
    },
    {
      filter: ["items"],
      run: function () {
        this._coordinates.length < 1 && this.$stage.removeAttr("style");
      },
    },
    {
      filter: ["width", "items", "settings"],
      run: function (cache) {
        cache.current = cache.current
          ? this.$stage.children().index(cache.current)
          : 0;
        cache.current = Math.max(
          this.minimum(),
          Math.min(this.maximum(), cache.current)
        );
        this.reset(cache.current);
      },
    },
    {
      filter: ["position"],
      run: function () {
        this.animate(this.coordinates(this._current));
      },
    },
    {
      filter: ["width", "position", "items", "settings"],
      run: function () {
        var rtl = this.settings.rtl ? 1 : -1,
          padding = this.settings.stagePadding * 2,
          begin = this.coordinates(this.current()) + padding,
          end = begin + this.width() * rtl,
          inner,
          outer,
          matches = [],
          i,
          n;
        for (i = 0, n = this._coordinates.length; i < n; i++) {
          inner = this._coordinates[i - 1] || 0;
          outer = Math.abs(this._coordinates[i]) + padding * rtl;
          if (
            (this.op(inner, "<=", begin) && this.op(inner, ">", end)) ||
            (this.op(outer, "<", begin) && this.op(outer, ">", end))
          ) {
            matches.push(i);
          }
        }
        this.$stage.children(".active").removeClass("active");
        this.$stage
          .children(":eq(" + matches.join("), :eq(") + ")")
          .addClass("active");
        this.$stage.children(".center").removeClass("center");
        if (this.settings.center) {
          this.$stage.children().eq(this.current()).addClass("center");
        }
      },
    },
  ];
  Owl.prototype.initializeStage = function () {
    this.$stage = this.$element.find("." + this.settings.stageClass);
    if (this.$stage.length) {
      return;
    }
    this.$element.addClass(this.options.loadingClass);
    this.$stage = $("<" + this.settings.stageElement + ">", {
      class: this.settings.stageClass,
    }).wrap($("<div/>", { class: this.settings.stageOuterClass }));
    this.$element.append(this.$stage.parent());
  };
  Owl.prototype.initializeItems = function () {
    var $items = this.$element.find(".owl-item");
    if ($items.length) {
      this._items = $items.get().map(function (item) {
        return $(item);
      });
      this._mergers = this._items.map(function () {
        return 1;
      });
      this.refresh();
      return;
    }
    this.replace(this.$element.children().not(this.$stage.parent()));
    if (this.isVisible()) {
      this.refresh();
    } else {
      this.invalidate("width");
    }
    this.$element
      .removeClass(this.options.loadingClass)
      .addClass(this.options.loadedClass);
  };
  Owl.prototype.initialize = function () {
    this.enter("initializing");
    this.trigger("initialize");
    this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl);
    if (this.settings.autoWidth && !this.is("pre-loading")) {
      var imgs, nestedSelector, width;
      imgs = this.$element.find("img");
      nestedSelector = this.settings.nestedItemSelector
        ? "." + this.settings.nestedItemSelector
        : undefined;
      width = this.$element.children(nestedSelector).width();
      if (imgs.length && width <= 0) {
        this.preloadAutoWidthImages(imgs);
      }
    }
    this.initializeStage();
    this.initializeItems();
    this.registerEventHandlers();
    this.leave("initializing");
    this.trigger("initialized");
  };
  Owl.prototype.isVisible = function () {
    return this.settings.checkVisibility ? this.$element.is(":visible") : !0;
  };
  Owl.prototype.setup = function () {
    var viewport = this.viewport(),
      overwrites = this.options.responsive,
      match = -1,
      settings = null;
    if (!overwrites) {
      settings = $.extend({}, this.options);
    } else {
      $.each(overwrites, function (breakpoint) {
        if (breakpoint <= viewport && breakpoint > match) {
          match = Number(breakpoint);
        }
      });
      settings = $.extend({}, this.options, overwrites[match]);
      if (typeof settings.stagePadding === "function") {
        settings.stagePadding = settings.stagePadding();
      }
      delete settings.responsive;
      if (settings.responsiveClass) {
        this.$element.attr(
          "class",
          this.$element
            .attr("class")
            .replace(
              new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"),
              "$1" + match
            )
        );
      }
    }
    this.trigger("change", { property: { name: "settings", value: settings } });
    this._breakpoint = match;
    this.settings = settings;
    this.invalidate("settings");
    this.trigger("changed", {
      property: { name: "settings", value: this.settings },
    });
  };
  Owl.prototype.optionsLogic = function () {
    if (this.settings.autoWidth) {
      this.settings.stagePadding = !1;
      this.settings.merge = !1;
    }
  };
  Owl.prototype.prepare = function (item) {
    var event = this.trigger("prepare", { content: item });
    if (!event.data) {
      event.data = $("<" + this.settings.itemElement + "/>")
        .addClass(this.options.itemClass)
        .append(item);
    }
    this.trigger("prepared", { content: event.data });
    return event.data;
  };
  Owl.prototype.update = function () {
    var i = 0,
      n = this._pipe.length,
      filter = $.proxy(function (p) {
        return this[p];
      }, this._invalidated),
      cache = {};
    while (i < n) {
      if (
        this._invalidated.all ||
        $.grep(this._pipe[i].filter, filter).length > 0
      ) {
        this._pipe[i].run(cache);
      }
      i++;
    }
    this._invalidated = {};
    !this.is("valid") && this.enter("valid");
  };
  Owl.prototype.width = function (dimension) {
    dimension = dimension || Owl.Width.Default;
    switch (dimension) {
      case Owl.Width.Inner:
      case Owl.Width.Outer:
        return this._width;
      default:
        return (
          this._width - this.settings.stagePadding * 2 + this.settings.margin
        );
    }
  };
  Owl.prototype.refresh = function () {
    this.enter("refreshing");
    this.trigger("refresh");
    this.setup();
    this.optionsLogic();
    this.$element.addClass(this.options.refreshClass);
    this.update();
    this.$element.removeClass(this.options.refreshClass);
    this.leave("refreshing");
    this.trigger("refreshed");
  };
  Owl.prototype.onThrottledResize = function () {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(
      this._handlers.onResize,
      this.settings.responsiveRefreshRate
    );
  };
  Owl.prototype.onResize = function () {
    if (!this._items.length) {
      return !1;
    }
    if (this._width === this.$element.width()) {
      return !1;
    }
    if (!this.isVisible()) {
      return !1;
    }
    this.enter("resizing");
    if (this.trigger("resize").isDefaultPrevented()) {
      this.leave("resizing");
      return !1;
    }
    this.invalidate("width");
    this.refresh();
    this.leave("resizing");
    this.trigger("resized");
  };
  Owl.prototype.registerEventHandlers = function () {
    if ($.support.transition) {
      this.$stage.on(
        $.support.transition.end + ".owl.core",
        $.proxy(this.onTransitionEnd, this)
      );
    }
    if (this.settings.responsive !== !1) {
      this.on(window, "resize", this._handlers.onThrottledResize);
    }
    if (this.settings.mouseDrag) {
      this.$element.addClass(this.options.dragClass);
      this.$stage.on("mousedown.owl.core", $.proxy(this.onDragStart, this));
      this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
        return !1;
      });
    }
    if (this.settings.touchDrag) {
      this.$stage.on("touchstart.owl.core", $.proxy(this.onDragStart, this));
      this.$stage.on("touchcancel.owl.core", $.proxy(this.onDragEnd, this));
    }
  };
  Owl.prototype.onDragStart = function (event) {
    var stage = null;
    if (event.which === 3) {
      return;
    }
    if ($.support.transform) {
      stage = this.$stage
        .css("transform")
        .replace(/.*\(|\)| /g, "")
        .split(",");
      stage = {
        x: stage[stage.length === 16 ? 12 : 4],
        y: stage[stage.length === 16 ? 13 : 5],
      };
    } else {
      stage = this.$stage.position();
      stage = {
        x: this.settings.rtl
          ? stage.left +
            this.$stage.width() -
            this.width() +
            this.settings.margin
          : stage.left,
        y: stage.top,
      };
    }
    if (this.is("animating")) {
      $.support.transform ? this.animate(stage.x) : this.$stage.stop();
      this.invalidate("position");
    }
    this.$element.toggleClass(
      this.options.grabClass,
      event.type === "mousedown"
    );
    this.speed(0);
    this._drag.time = new Date().getTime();
    this._drag.target = $(event.target);
    this._drag.stage.start = stage;
    this._drag.stage.current = stage;
    this._drag.pointer = this.pointer(event);
    $(document).on(
      "mouseup.owl.core touchend.owl.core",
      $.proxy(this.onDragEnd, this)
    );
    $(document).one(
      "mousemove.owl.core touchmove.owl.core",
      $.proxy(function (event) {
        var delta = this.difference(this._drag.pointer, this.pointer(event));
        $(document).on(
          "mousemove.owl.core touchmove.owl.core",
          $.proxy(this.onDragMove, this)
        );
        if (Math.abs(delta.x) < Math.abs(delta.y) && this.is("valid")) {
          return;
        }
        event.preventDefault();
        this.enter("dragging");
        this.trigger("drag");
      }, this)
    );
  };
  Owl.prototype.onDragMove = function (event) {
    var minimum = null,
      maximum = null,
      pull = null,
      delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this.difference(this._drag.stage.start, delta);
    if (!this.is("dragging")) {
      return;
    }
    event.preventDefault();
    if (this.settings.loop) {
      minimum = this.coordinates(this.minimum());
      maximum = this.coordinates(this.maximum() + 1) - minimum;
      stage.x =
        ((((stage.x - minimum) % maximum) + maximum) % maximum) + minimum;
    } else {
      minimum = this.settings.rtl
        ? this.coordinates(this.maximum())
        : this.coordinates(this.minimum());
      maximum = this.settings.rtl
        ? this.coordinates(this.minimum())
        : this.coordinates(this.maximum());
      pull = this.settings.pullDrag ? (-1 * delta.x) / 5 : 0;
      stage.x = Math.max(Math.min(stage.x, minimum + pull), maximum + pull);
    }
    this._drag.stage.current = stage;
    this.animate(stage.x);
  };
  Owl.prototype.onDragEnd = function (event) {
    var delta = this.difference(this._drag.pointer, this.pointer(event)),
      stage = this._drag.stage.current,
      direction = (delta.x > 0) ^ this.settings.rtl ? "left" : "right";
    $(document).off(".owl.core");
    this.$element.removeClass(this.options.grabClass);
    if ((delta.x !== 0 && this.is("dragging")) || !this.is("valid")) {
      this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
      this.current(
        this.closest(stage.x, delta.x !== 0 ? direction : this._drag.direction)
      );
      this.invalidate("position");
      this.update();
      this._drag.direction = direction;
      if (
        Math.abs(delta.x) > 3 ||
        new Date().getTime() - this._drag.time > 300
      ) {
        this._drag.target.one("click.owl.core", function () {
          return !1;
        });
      }
    }
    if (!this.is("dragging")) {
      return;
    }
    this.leave("dragging");
    this.trigger("dragged");
  };
  Owl.prototype.closest = function (coordinate, direction) {
    var position = -1,
      pull = 30,
      width = this.width(),
      coordinates = this.coordinates();
    if (!this.settings.freeDrag) {
      $.each(
        coordinates,
        $.proxy(function (index, value) {
          if (
            direction === "left" &&
            coordinate > value - pull &&
            coordinate < value + pull
          ) {
            position = index;
          } else if (
            direction === "right" &&
            coordinate > value - width - pull &&
            coordinate < value - width + pull
          ) {
            position = index + 1;
          } else if (
            this.op(coordinate, "<", value) &&
            this.op(
              coordinate,
              ">",
              coordinates[index + 1] !== undefined
                ? coordinates[index + 1]
                : value - width
            )
          ) {
            position = direction === "left" ? index + 1 : index;
          }
          return position === -1;
        }, this)
      );
    }
    if (!this.settings.loop) {
      if (this.op(coordinate, ">", coordinates[this.minimum()])) {
        position = coordinate = this.minimum();
      } else if (this.op(coordinate, "<", coordinates[this.maximum()])) {
        position = coordinate = this.maximum();
      }
    }
    return position;
  };
  Owl.prototype.animate = function (coordinate) {
    var animate = this.speed() > 0;
    this.is("animating") && this.onTransitionEnd();
    if (animate) {
      this.enter("animating");
      this.trigger("translate");
    }
    if ($.support.transform3d && $.support.transition) {
      this.$stage.css({
        transform: "translate3d(" + coordinate + "px,0px,0px)",
        transition:
          this.speed() / 1000 +
          "s" +
          (this.settings.slideTransition
            ? " " + this.settings.slideTransition
            : ""),
      });
    } else if (animate) {
      this.$stage.animate(
        { left: coordinate + "px" },
        this.speed(),
        this.settings.fallbackEasing,
        $.proxy(this.onTransitionEnd, this)
      );
    } else {
      this.$stage.css({ left: coordinate + "px" });
    }
  };
  Owl.prototype.is = function (state) {
    return this._states.current[state] && this._states.current[state] > 0;
  };
  Owl.prototype.current = function (position) {
    if (position === undefined) {
      return this._current;
    }
    if (this._items.length === 0) {
      return undefined;
    }
    position = this.normalize(position);
    if (this._current !== position) {
      var event = this.trigger("change", {
        property: { name: "position", value: position },
      });
      if (event.data !== undefined) {
        position = this.normalize(event.data);
      }
      this._current = position;
      this.invalidate("position");
      this.trigger("changed", {
        property: { name: "position", value: this._current },
      });
    }
    return this._current;
  };
  Owl.prototype.invalidate = function (part) {
    if (typeof part === "string") {
      this._invalidated[part] = !0;
      this.is("valid") && this.leave("valid");
    }
    return $.map(this._invalidated, function (v, i) {
      return i;
    });
  };
  Owl.prototype.reset = function (position) {
    position = this.normalize(position);
    if (position === undefined) {
      return;
    }
    this._speed = 0;
    this._current = position;
    this.suppress(["translate", "translated"]);
    this.animate(this.coordinates(position));
    this.release(["translate", "translated"]);
  };
  Owl.prototype.normalize = function (position, relative) {
    var n = this._items.length,
      m = relative ? 0 : this._clones.length;
    if (!this.isNumeric(position) || n < 1) {
      position = undefined;
    } else if (position < 0 || position >= n + m) {
      position = ((((position - m / 2) % n) + n) % n) + m / 2;
    }
    return position;
  };
  Owl.prototype.relative = function (position) {
    position -= this._clones.length / 2;
    return this.normalize(position, !0);
  };
  Owl.prototype.maximum = function (relative) {
    var settings = this.settings,
      maximum = this._coordinates.length,
      iterator,
      reciprocalItemsWidth,
      elementWidth;
    if (settings.loop) {
      maximum = this._clones.length / 2 + this._items.length - 1;
    } else if (settings.autoWidth || settings.merge) {
      iterator = this._items.length;
      if (iterator) {
        reciprocalItemsWidth = this._items[--iterator].width();
        elementWidth = this.$element.width();
        while (iterator--) {
          reciprocalItemsWidth +=
            this._items[iterator].width() + this.settings.margin;
          if (reciprocalItemsWidth > elementWidth) {
            break;
          }
        }
      }
      maximum = iterator + 1;
    } else if (settings.center) {
      maximum = this._items.length - 1;
    } else {
      maximum = this._items.length - settings.items;
    }
    if (relative) {
      maximum -= this._clones.length / 2;
    }
    return Math.max(maximum, 0);
  };
  Owl.prototype.minimum = function (relative) {
    return relative ? 0 : this._clones.length / 2;
  };
  Owl.prototype.items = function (position) {
    if (position === undefined) {
      return this._items.slice();
    }
    position = this.normalize(position, !0);
    return this._items[position];
  };
  Owl.prototype.mergers = function (position) {
    if (position === undefined) {
      return this._mergers.slice();
    }
    position = this.normalize(position, !0);
    return this._mergers[position];
  };
  Owl.prototype.clones = function (position) {
    var odd = this._clones.length / 2,
      even = odd + this._items.length,
      map = function (index) {
        return index % 2 === 0 ? even + index / 2 : odd - (index + 1) / 2;
      };
    if (position === undefined) {
      return $.map(this._clones, function (v, i) {
        return map(i);
      });
    }
    return $.map(this._clones, function (v, i) {
      return v === position ? map(i) : null;
    });
  };
  Owl.prototype.speed = function (speed) {
    if (speed !== undefined) {
      this._speed = speed;
    }
    return this._speed;
  };
  Owl.prototype.coordinates = function (position) {
    var multiplier = 1,
      newPosition = position - 1,
      coordinate;
    if (position === undefined) {
      return $.map(
        this._coordinates,
        $.proxy(function (coordinate, index) {
          return this.coordinates(index);
        }, this)
      );
    }
    if (this.settings.center) {
      if (this.settings.rtl) {
        multiplier = -1;
        newPosition = position + 1;
      }
      coordinate = this._coordinates[position];
      coordinate +=
        ((this.width() - coordinate + (this._coordinates[newPosition] || 0)) /
          2) *
        multiplier;
    } else {
      coordinate = this._coordinates[newPosition] || 0;
    }
    coordinate = Math.ceil(coordinate);
    return coordinate;
  };
  Owl.prototype.duration = function (from, to, factor) {
    if (factor === 0) {
      return 0;
    }
    return (
      Math.min(Math.max(Math.abs(to - from), 1), 6) *
      Math.abs(factor || this.settings.smartSpeed)
    );
  };
  Owl.prototype.to = function (position, speed) {
    var current = this.current(),
      revert = null,
      distance = position - this.relative(current),
      direction = (distance > 0) - (distance < 0),
      items = this._items.length,
      minimum = this.minimum(),
      maximum = this.maximum();
    if (this.settings.loop) {
      if (!this.settings.rewind && Math.abs(distance) > items / 2) {
        distance += direction * -1 * items;
      }
      position = current + distance;
      revert = ((((position - minimum) % items) + items) % items) + minimum;
      if (
        revert !== position &&
        revert - distance <= maximum &&
        revert - distance > 0
      ) {
        current = revert - distance;
        position = revert;
        this.reset(current);
      }
    } else if (this.settings.rewind) {
      maximum += 1;
      position = ((position % maximum) + maximum) % maximum;
    } else {
      position = Math.max(minimum, Math.min(maximum, position));
    }
    this.speed(this.duration(current, position, speed));
    this.current(position);
    if (this.isVisible()) {
      this.update();
    }
  };
  Owl.prototype.next = function (speed) {
    speed = speed || !1;
    this.to(this.relative(this.current()) + 1, speed);
  };
  Owl.prototype.prev = function (speed) {
    speed = speed || !1;
    this.to(this.relative(this.current()) - 1, speed);
  };
  Owl.prototype.onTransitionEnd = function (event) {
    if (event !== undefined) {
      event.stopPropagation();
      if (
        (event.target || event.srcElement || event.originalTarget) !==
        this.$stage.get(0)
      ) {
        return !1;
      }
    }
    this.leave("animating");
    this.trigger("translated");
  };
  Owl.prototype.viewport = function () {
    var width;
    if (this.options.responsiveBaseElement !== window) {
      width = $(this.options.responsiveBaseElement).width();
    } else if (window.innerWidth) {
      width = window.innerWidth;
    } else if (
      document.documentElement &&
      document.documentElement.clientWidth
    ) {
      width = document.documentElement.clientWidth;
    } else {
      console.warn("Can not detect viewport width.");
    }
    return width;
  };
  Owl.prototype.replace = function (content) {
    this.$stage.empty();
    this._items = [];
    if (content) {
      content = content instanceof jQuery ? content : $(content);
    }
    if (this.settings.nestedItemSelector) {
      content = content.find("." + this.settings.nestedItemSelector);
    }
    content
      .filter(function () {
        return this.nodeType === 1;
      })
      .each(
        $.proxy(function (index, item) {
          item = this.prepare(item);
          this.$stage.append(item);
          this._items.push(item);
          this._mergers.push(
            item
              .find("[data-merge]")
              .addBack("[data-merge]")
              .attr("data-merge") * 1 || 1
          );
        }, this)
      );
    this.reset(
      this.isNumeric(this.settings.startPosition)
        ? this.settings.startPosition
        : 0
    );
    this.invalidate("items");
  };
  Owl.prototype.add = function (content, position) {
    var current = this.relative(this._current);
    position =
      position === undefined
        ? this._items.length
        : this.normalize(position, !0);
    content = content instanceof jQuery ? content : $(content);
    this.trigger("add", { content: content, position: position });
    content = this.prepare(content);
    if (this._items.length === 0 || position === this._items.length) {
      this._items.length === 0 && this.$stage.append(content);
      this._items.length !== 0 && this._items[position - 1].after(content);
      this._items.push(content);
      this._mergers.push(
        content
          .find("[data-merge]")
          .addBack("[data-merge]")
          .attr("data-merge") * 1 || 1
      );
    } else {
      this._items[position].before(content);
      this._items.splice(position, 0, content);
      this._mergers.splice(
        position,
        0,
        content
          .find("[data-merge]")
          .addBack("[data-merge]")
          .attr("data-merge") * 1 || 1
      );
    }
    this._items[current] && this.reset(this._items[current].index());
    this.invalidate("items");
    this.trigger("added", { content: content, position: position });
  };
  Owl.prototype.remove = function (position) {
    position = this.normalize(position, !0);
    if (position === undefined) {
      return;
    }
    this.trigger("remove", {
      content: this._items[position],
      position: position,
    });
    this._items[position].remove();
    this._items.splice(position, 1);
    this._mergers.splice(position, 1);
    this.invalidate("items");
    this.trigger("removed", { content: null, position: position });
  };
  Owl.prototype.preloadAutoWidthImages = function (images) {
    images.each(
      $.proxy(function (i, element) {
        this.enter("pre-loading");
        element = $(element);
        $(new Image())
          .one(
            "load",
            $.proxy(function (e) {
              element.attr("src", e.target.src);
              element.css("opacity", 1);
              this.leave("pre-loading");
              !this.is("pre-loading") &&
                !this.is("initializing") &&
                this.refresh();
            }, this)
          )
          .attr(
            "src",
            element.attr("src") ||
              element.attr("data-src") ||
              element.attr("data-src-retina")
          );
      }, this)
    );
  };
  Owl.prototype.destroy = function () {
    this.$element.off(".owl.core");
    this.$stage.off(".owl.core");
    $(document).off(".owl.core");
    if (this.settings.responsive !== !1) {
      window.clearTimeout(this.resizeTimer);
      this.off(window, "resize", this._handlers.onThrottledResize);
    }
    for (var i in this._plugins) {
      this._plugins[i].destroy();
    }
    this.$stage.children(".cloned").remove();
    this.$stage.unwrap();
    this.$stage.children().contents().unwrap();
    this.$stage.children().unwrap();
    this.$stage.remove();
    this.$element
      .removeClass(this.options.refreshClass)
      .removeClass(this.options.loadingClass)
      .removeClass(this.options.loadedClass)
      .removeClass(this.options.rtlClass)
      .removeClass(this.options.dragClass)
      .removeClass(this.options.grabClass)
      .attr(
        "class",
        this.$element
          .attr("class")
          .replace(
            new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
            ""
          )
      )
      .removeData("owl.carousel");
  };
  Owl.prototype.op = function (a, o, b) {
    var rtl = this.settings.rtl;
    switch (o) {
      case "<":
        return rtl ? a > b : a < b;
      case ">":
        return rtl ? a < b : a > b;
      case ">=":
        return rtl ? a <= b : a >= b;
      case "<=":
        return rtl ? a >= b : a <= b;
      default:
        break;
    }
  };
  Owl.prototype.on = function (element, event, listener, capture) {
    if (element.addEventListener) {
      element.addEventListener(event, listener, capture);
    } else if (element.attachEvent) {
      element.attachEvent("on" + event, listener);
    }
  };
  Owl.prototype.off = function (element, event, listener, capture) {
    if (element.removeEventListener) {
      element.removeEventListener(event, listener, capture);
    } else if (element.detachEvent) {
      element.detachEvent("on" + event, listener);
    }
  };
  Owl.prototype.trigger = function (name, data, namespace, state, enter) {
    var status = { item: { count: this._items.length, index: this.current() } },
      handler = $.camelCase(
        $.grep(["on", name, namespace], function (v) {
          return v;
        })
          .join("-")
          .toLowerCase()
      ),
      event = $.Event(
        [name, "owl", namespace || "carousel"].join(".").toLowerCase(),
        $.extend({ relatedTarget: this }, status, data)
      );
    if (!this._supress[name]) {
      $.each(this._plugins, function (name, plugin) {
        if (plugin.onTrigger) {
          plugin.onTrigger(event);
        }
      });
      this.register({ type: Owl.Type.Event, name: name });
      this.$element.trigger(event);
      if (this.settings && typeof this.settings[handler] === "function") {
        this.settings[handler].call(this, event);
      }
    }
    return event;
  };
  Owl.prototype.enter = function (name) {
    $.each(
      [name].concat(this._states.tags[name] || []),
      $.proxy(function (i, name) {
        if (this._states.current[name] === undefined) {
          this._states.current[name] = 0;
        }
        this._states.current[name]++;
      }, this)
    );
  };
  Owl.prototype.leave = function (name) {
    $.each(
      [name].concat(this._states.tags[name] || []),
      $.proxy(function (i, name) {
        this._states.current[name]--;
      }, this)
    );
  };
  Owl.prototype.register = function (object) {
    if (object.type === Owl.Type.Event) {
      if (!$.event.special[object.name]) {
        $.event.special[object.name] = {};
      }
      if (!$.event.special[object.name].owl) {
        var _default = $.event.special[object.name]._default;
        $.event.special[object.name]._default = function (e) {
          if (
            _default &&
            _default.apply &&
            (!e.namespace || e.namespace.indexOf("owl") === -1)
          ) {
            return _default.apply(this, arguments);
          }
          return e.namespace && e.namespace.indexOf("owl") > -1;
        };
        $.event.special[object.name].owl = !0;
      }
    } else if (object.type === Owl.Type.State) {
      if (!this._states.tags[object.name]) {
        this._states.tags[object.name] = object.tags;
      } else {
        this._states.tags[object.name] = this._states.tags[object.name].concat(
          object.tags
        );
      }
      this._states.tags[object.name] = $.grep(
        this._states.tags[object.name],
        $.proxy(function (tag, i) {
          return $.inArray(tag, this._states.tags[object.name]) === i;
        }, this)
      );
    }
  };
  Owl.prototype.suppress = function (events) {
    $.each(
      events,
      $.proxy(function (index, event) {
        this._supress[event] = !0;
      }, this)
    );
  };
  Owl.prototype.release = function (events) {
    $.each(
      events,
      $.proxy(function (index, event) {
        delete this._supress[event];
      }, this)
    );
  };
  Owl.prototype.pointer = function (event) {
    var result = { x: null, y: null };
    event = event.originalEvent || event || window.event;
    event =
      event.touches && event.touches.length
        ? event.touches[0]
        : event.changedTouches && event.changedTouches.length
        ? event.changedTouches[0]
        : event;
    if (event.pageX) {
      result.x = event.pageX;
      result.y = event.pageY;
    } else {
      result.x = event.clientX;
      result.y = event.clientY;
    }
    return result;
  };
  Owl.prototype.isNumeric = function (number) {
    return !isNaN(parseFloat(number));
  };
  Owl.prototype.difference = function (first, second) {
    return { x: first.x - second.x, y: first.y - second.y };
  };
  $.fn.owlCarousel = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var $this = $(this),
        data = $this.data("owl.carousel");
      if (!data) {
        data = new Owl(this, typeof option == "object" && option);
        $this.data("owl.carousel", data);
        $.each(
          [
            "next",
            "prev",
            "to",
            "destroy",
            "refresh",
            "replace",
            "add",
            "remove",
          ],
          function (i, event) {
            data.register({ type: Owl.Type.Event, name: event });
            data.$element.on(
              event + ".owl.carousel.core",
              $.proxy(function (e) {
                if (e.namespace && e.relatedTarget !== this) {
                  this.suppress([event]);
                  data[event].apply(this, [].slice.call(arguments, 1));
                  this.release([event]);
                }
              }, data)
            );
          }
        );
      }
      if (typeof option == "string" && option.charAt(0) !== "_") {
        data[option].apply(data, args);
      }
    });
  };
  $.fn.owlCarousel.Constructor = Owl;
})(window.Zepto || window.jQuery, window, document);
/**
 * Lazy Plugin
 * @version 2.0.1
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  var Lazy = function (carousel) {
    this._core = carousel;
    this._loaded = [];
    this._handlers = {
      "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
        $.proxy(function (e) {
          if (!e.namespace) {
            return;
          }
          if (!this._core.settings || !this._core.settings.lazyLoad) {
            return;
          }
          if (
            (e.property && e.property.name == "position") ||
            e.type == "initialized"
          ) {
            var settings = this._core.settings,
              n =
                (settings.center && Math.ceil(settings.items / 2)) ||
                settings.items,
              i = (settings.center && n * -1) || 0,
              position =
                (e.property && e.property.value !== undefined
                  ? e.property.value
                  : this._core.current()) + i,
              clones = this._core.clones().length,
              load = $.proxy(function (i, v) {
                this.load(v);
              }, this);
            if (settings.lazyLoadEager > 0) {
              n += settings.lazyLoadEager;
              if (settings.loop) {
                position -= settings.lazyLoadEager;
                n++;
              }
            }
            while (i++ < n) {
              this.load(clones / 2 + this._core.relative(position));
              clones &&
                $.each(this._core.clones(this._core.relative(position)), load);
              position++;
            }
          }
        }, this),
    };
    this._core.options = $.extend({}, Lazy.Defaults, this._core.options);
    this._core.$element.on(this._handlers);
  };
  Lazy.Defaults = { lazyLoad: !1, lazyLoadEager: 0 };
  Lazy.prototype.load = function (position) {
    var $item = this._core.$stage.children().eq(position),
      $elements = $item && $item.find(".owl-lazy");
    if (!$elements || $.inArray($item.get(0), this._loaded) > -1) {
      return;
    }
    $elements.each(
      $.proxy(function (index, element) {
        var $element = $(element),
          image,
          url =
            (window.devicePixelRatio > 1 && $element.attr("data-src-retina")) ||
            $element.attr("data-src") ||
            $element.attr("data-srcset");
        this._core.trigger("load", { element: $element, url: url }, "lazy");
        if ($element.is("img")) {
          $element
            .one(
              "load.owl.lazy",
              $.proxy(function () {
                $element.css("opacity", 1);
                this._core.trigger(
                  "loaded",
                  { element: $element, url: url },
                  "lazy"
                );
              }, this)
            )
            .attr("src", url);
        } else if ($element.is("source")) {
          $element
            .one(
              "load.owl.lazy",
              $.proxy(function () {
                this._core.trigger(
                  "loaded",
                  { element: $element, url: url },
                  "lazy"
                );
              }, this)
            )
            .attr("srcset", url);
        } else {
          image = new Image();
          image.onload = $.proxy(function () {
            $element.css({
              "background-image": 'url("' + url + '")',
              opacity: "1",
            });
            this._core.trigger(
              "loaded",
              { element: $element, url: url },
              "lazy"
            );
          }, this);
          image.src = url;
        }
      }, this)
    );
    this._loaded.push($item.get(0));
  };
  Lazy.prototype.destroy = function () {
    var handler, property;
    for (handler in this.handlers) {
      this._core.$element.off(handler, this.handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Lazy = Lazy;
})(window.Zepto || window.jQuery, window, document);
/**
 * AutoHeight Plugin
 * @version 2.0.1
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  var AutoHeight = function (carousel) {
    this._core = carousel;
    this._previousHeight = null;
    this._handlers = {
      "initialized.owl.carousel refreshed.owl.carousel": $.proxy(function (e) {
        if (e.namespace && this._core.settings.autoHeight) {
          this.update();
        }
      }, this),
      "changed.owl.carousel": $.proxy(function (e) {
        if (
          e.namespace &&
          this._core.settings.autoHeight &&
          e.property.name === "position"
        ) {
          this.update();
        }
      }, this),
      "loaded.owl.lazy": $.proxy(function (e) {
        if (
          e.namespace &&
          this._core.settings.autoHeight &&
          e.element.closest("." + this._core.settings.itemClass).index() ===
            this._core.current()
        ) {
          this.update();
        }
      }, this),
    };
    this._core.options = $.extend({}, AutoHeight.Defaults, this._core.options);
    this._core.$element.on(this._handlers);
    this._intervalId = null;
    var refThis = this;
    $(window).on("load", function () {
      if (refThis._core.settings.autoHeight) {
        refThis.update();
      }
    });
    $(window).on("resize", function () {
      if (refThis._core.settings.autoHeight) {
        if (refThis._intervalId != null) {
          clearTimeout(refThis._intervalId);
        }
        refThis._intervalId = setTimeout(function () {
          refThis.update();
        }, 350);
      }
    });
  };
  AutoHeight.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" };
  AutoHeight.prototype.update = function () {
    var start = this._core._current,
      end = start + this._core.settings.items,
      lazyLoadEnabled = this._core.settings.lazyLoad,
      visible = this._core.$stage.children().toArray().slice(start, end),
      heights = [],
      maxheight = 0;
    $.each(visible, function (index, item) {
      heights.push($(item).height());
    });
    maxheight = Math.max.apply(null, heights);
    if (maxheight <= 1 && lazyLoadEnabled && this._previousHeight) {
      maxheight = this._previousHeight;
    }
    this._previousHeight = maxheight;
    this._core.$stage
      .parent()
      .height(maxheight)
      .addClass(this._core.settings.autoHeightClass);
  };
  AutoHeight.prototype.destroy = function () {
    var handler, property;
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] !== "function" && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.AutoHeight = AutoHeight;
})(window.Zepto || window.jQuery, window, document);
/**
 * Video Plugin
 * @version 2.0.1
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 */
(function ($, window, document, undefined) {
  var Video = function (carousel) {
    this._core = carousel;
    this._videos = {};
    this._playing = null;
    this._handlers = {
      "initialized.owl.carousel": $.proxy(function (e) {
        if (e.namespace) {
          this._core.register({
            type: "state",
            name: "playing",
            tags: ["interacting"],
          });
        }
      }, this),
      "resize.owl.carousel": $.proxy(function (e) {
        if (e.namespace && this._core.settings.video && this.isInFullScreen()) {
          e.preventDefault();
        }
      }, this),
      "refreshed.owl.carousel": $.proxy(function (e) {
        if (e.namespace && this._core.is("resizing")) {
          this._core.$stage.find(".cloned .owl-video-frame").remove();
        }
      }, this),
      "changed.owl.carousel": $.proxy(function (e) {
        if (e.namespace && e.property.name === "position" && this._playing) {
          this.stop();
        }
      }, this),
      "prepared.owl.carousel": $.proxy(function (e) {
        if (!e.namespace) {
          return;
        }
        var $element = $(e.content).find(".owl-video");
        if ($element.length) {
          $element.css("display", "none");
          this.fetch($element, $(e.content));
        }
      }, this),
    };
    this._core.options = $.extend({}, Video.Defaults, this._core.options);
    this._core.$element.on(this._handlers);
    this._core.$element.on(
      "click.owl.video",
      ".owl-video-play-icon",
      $.proxy(function (e) {
        this.play(e);
      }, this)
    );
  };
  Video.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 };
  Video.prototype.fetch = function (target, item) {
    var type = (function () {
        if (target.attr("data-vimeo-id")) {
          return "vimeo";
        } else if (target.attr("data-vzaar-id")) {
          return "vzaar";
        } else {
          return "youtube";
        }
      })(),
      id =
        target.attr("data-vimeo-id") ||
        target.attr("data-youtube-id") ||
        target.attr("data-vzaar-id"),
      width = target.attr("data-width") || this._core.settings.videoWidth,
      height = target.attr("data-height") || this._core.settings.videoHeight,
      url = target.attr("href");
    if (url) {
      id = url.match(
        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
      );
      if (id[3].indexOf("youtu") > -1) {
        type = "youtube";
      } else if (id[3].indexOf("vimeo") > -1) {
        type = "vimeo";
      } else if (id[3].indexOf("vzaar") > -1) {
        type = "vzaar";
      } else {
        throw new Error("Video URL not supported.");
      }
      id = id[6];
    } else {
      throw new Error("Missing video URL.");
    }
    this._videos[url] = { type: type, id: id, width: width, height: height };
    item.attr("data-video", url);
    this.thumbnail(target, this._videos[url]);
  };
  Video.prototype.thumbnail = function (target, video) {
    var tnLink,
      icon,
      path,
      dimensions =
        video.width && video.height
          ? "width:" + video.width + "px;height:" + video.height + "px;"
          : "",
      customTn = target.find("img"),
      srcType = "src",
      lazyClass = "",
      settings = this._core.settings,
      create = function (path) {
        icon = '<div class="owl-video-play-icon"></div>';
        if (settings.lazyLoad) {
          tnLink = $("<div/>", {
            class: "owl-video-tn " + lazyClass,
            srcType: path,
          });
        } else {
          tnLink = $("<div/>", {
            class: "owl-video-tn",
            style: "opacity:1;background-image:url(" + path + ")",
          });
        }
        target.after(tnLink);
        target.after(icon);
      };
    target.wrap($("<div/>", { class: "owl-video-wrapper", style: dimensions }));
    if (this._core.settings.lazyLoad) {
      srcType = "data-src";
      lazyClass = "owl-lazy";
    }
    if (customTn.length) {
      create(customTn.attr(srcType));
      customTn.remove();
      return !1;
    }
    if (video.type === "youtube") {
      path = "//img.youtube.com/vi/" + video.id + "/hqdefault.jpg";
      create(path);
    } else if (video.type === "vimeo") {
      $.ajax({
        type: "GET",
        url: "//vimeo.com/api/v2/video/" + video.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function (data) {
          path = data[0].thumbnail_large;
          create(path);
        },
      });
    } else if (video.type === "vzaar") {
      $.ajax({
        type: "GET",
        url: "//vzaar.com/api/videos/" + video.id + ".json",
        jsonp: "callback",
        dataType: "jsonp",
        success: function (data) {
          path = data.framegrab_url;
          create(path);
        },
      });
    }
  };
  Video.prototype.stop = function () {
    this._core.trigger("stop", null, "video");
    this._playing.find(".owl-video-frame").remove();
    this._playing.removeClass("owl-video-playing");
    this._playing = null;
    this._core.leave("playing");
    this._core.trigger("stopped", null, "video");
  };
  Video.prototype.play = function (event) {
    var target = $(event.target),
      item = target.closest("." + this._core.settings.itemClass),
      video = this._videos[item.attr("data-video")],
      width = video.width || "100%",
      height = video.height || this._core.$stage.height(),
      html,
      iframe;
    if (this._playing) {
      return;
    }
    this._core.enter("playing");
    this._core.trigger("play", null, "video");
    item = this._core.items(this._core.relative(item.index()));
    this._core.reset(item.index());
    html = $(
      '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
    );
    html.attr("height", height);
    html.attr("width", width);
    if (video.type === "youtube") {
      html.attr(
        "src",
        "//www.youtube.com/embed/" +
          video.id +
          "?autoplay=1&rel=0&v=" +
          video.id
      );
    } else if (video.type === "vimeo") {
      html.attr("src", "//player.vimeo.com/video/" + video.id + "?autoplay=1");
    } else if (video.type === "vzaar") {
      html.attr(
        "src",
        "//view.vzaar.com/" + video.id + "/player?autoplay=true"
      );
    }
    iframe = $(html)
      .wrap('<div class="owl-video-frame" />')
      .insertAfter(item.find(".owl-video"));
    this._playing = item.addClass("owl-video-playing");
  };
  Video.prototype.isInFullScreen = function () {
    var element =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;
    return element && $(element).parent().hasClass("owl-video-frame");
  };
  Video.prototype.destroy = function () {
    var handler, property;
    this._core.$element.off("click.owl.video");
    for (handler in this._handlers) {
      this._core.$element.off(handler, this._handlers[handler]);
    }
    for (property in Object.getOwnPropertyNames(this)) {
      typeof this[property] != "function" && (this[property] = null);
    }
  };
  $.fn.owlCarousel.Constructor.Plugins.Video = Video;
})(window.Zepto || window.jQuery, window, document);
/**
 * @name		Shuffle Letters
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license		MIT License
 */
(function ($) {
  $.fn.shuffleLetters = function (prop) {
    var options = $.extend(
      { step: 8, fps: 25, text: "", callback: function () {} },
      prop
    );
    return this.each(function () {
      var el = $(this),
        str = "";
      if (el.data("animated")) {
        return !0;
      }
      el.data("animated", !0);
      if (options.text) {
        str = options.text.split("");
      } else {
        str = el.text().split("");
      }
      var types = [],
        letters = [];
      for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        if (ch == " ") {
          types[i] = "space";
          continue;
        } else if (/[a-z]/.test(ch)) {
          types[i] = "lowerLetter";
        } else if (/[A-Z]/.test(ch)) {
          types[i] = "upperLetter";
        } else {
          types[i] = "symbol";
        }
        letters.push(i);
      }
      el.html("");
      (function shuffle(start) {
        var i,
          len = letters.length,
          strCopy = str.slice(0);
        if (start > len) {
          el.data("animated", !1);
          options.callback(el);
          return;
        }
        for (i = Math.max(start, 0); i < len; i++) {
          if (i < start + options.step) {
            strCopy[letters[i]] = randomChar(types[letters[i]]);
          } else {
            strCopy[letters[i]] = "";
          }
        }
        el.text(strCopy.join(""));
        setTimeout(function () {
          shuffle(start + 1);
        }, 1000 / options.fps);
      })(-options.step);
    });
  };
  function randomChar(type) {
    var pool = "";
    if (type == "lowerLetter") {
      pool = "abcdefghijklmnopqrstuvwxyz0123456789";
    } else if (type == "upperLetter") {
      pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    } else if (type == "symbol") {
      pool = ",.?/\\(^)![]{}*&^%$#'\"";
    }
    var arr = pool.split("");
    return arr[Math.floor(Math.random() * arr.length)];
  }
})(jQuery);
(function ($) {
  var selectors = [];
  var check_binded = !1;
  var check_lock = !1;
  var defaults = { interval: 250, force_process: !1 };
  var $window = $(window);
  var $prior_appeared;
  function process() {
    check_lock = !1;
    for (var index in selectors) {
      var $appeared = $(selectors[index]).filter(function () {
        return $(this).is(":appeared");
      });
      $appeared.trigger("appear", [$appeared]);
      if ($prior_appeared) {
        var $disappeared = $prior_appeared.not($appeared);
        $disappeared.trigger("disappear", [$disappeared]);
      }
      $prior_appeared = $appeared;
    }
  }
  $.expr.pseudos.appeared = function (element) {
    var $element = $(element);
    if (!$element.is(":visible")) {
      return !1;
    }
    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;
    if (
      top + $element.height() >= window_top &&
      top - ($element.data("appear-top-offset") || 0) <=
        window_top + $window.height() &&
      left + $element.width() >= window_left &&
      left - ($element.data("appear-left-offset") || 0) <=
        window_left + $window.width()
    ) {
      return !0;
    } else {
      return !1;
    }
  };
  $.fn.extend({
    appear: function (options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function () {
          if (check_lock) {
            return;
          }
          check_lock = !0;
          setTimeout(process, opts.interval);
        };
        $(window).on("scroll", on_check).on("resize", on_check);
        check_binded = !0;
      }
      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      selectors.push(selector);
      return $(selector);
    },
  });
  $.extend({
    force_appear: function () {
      if (check_binded) {
        process();
        return !0;
      }
      return !1;
    },
  });
})(jQuery);
if (typeof Object.create !== "function") {
  Object.create = function (obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}
(function ($, window, document) {
  var loadAPI = function loadAPI(callback) {
      var tag = document.createElement("script"),
        head = document.getElementsByTagName("head")[0];
      if (window.location.origin == "file://") {
        tag.src = "http://www.youtube.com/iframe_api";
      } else {
        tag.src = "//www.youtube.com/iframe_api";
      }
      head.appendChild(tag);
      head = null;
      tag = null;
      iframeIsReady(callback);
    },
    iframeIsReady = function iframeIsReady(callback) {
      if (
        typeof YT === "undefined" &&
        typeof window.loadingPlayer === "undefined"
      ) {
        window.loadingPlayer = !0;
        window.dfd = $.Deferred();
        window.onYouTubeIframeAPIReady = function () {
          window.onYouTubeIframeAPIReady = null;
          window.dfd.resolve("done");
          callback();
        };
      } else if (typeof YT === "object") {
        callback();
      } else {
        window.dfd.done(function (name) {
          callback();
        });
      }
    };
  YTPlayer = {
    player: null,
    defaults: {
      ratio: 16 / 9,
      videoId: "LSmgKRx5pBo",
      mute: !0,
      repeat: !0,
      width: $(window).width(),
      playButtonClass: "YTPlayer-play",
      pauseButtonClass: "YTPlayer-pause",
      muteButtonClass: "YTPlayer-mute",
      volumeUpClass: "YTPlayer-volume-up",
      volumeDownClass: "YTPlayer-volume-down",
      start: 0,
      pauseOnScroll: !1,
      fitToBackground: !0,
      playerVars: {
        iv_load_policy: 3,
        modestbranding: 1,
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        wmode: "opaque",
        branding: 0,
        autohide: 0,
      },
      events: null,
    },
    init: function init(node, userOptions) {
      var self = this;
      self.userOptions = userOptions;
      (self.$body = $("body")),
        (self.$node = $(node)),
        (self.$window = $(window));
      self.defaults.events = {
        onReady: function (e) {
          self.onPlayerReady(e);
          if (self.options.pauseOnScroll) {
            self.pauseOnScroll();
          }
          if (typeof self.options.callback == "function") {
            self.options.callback.call(this);
          }
        },
        onStateChange: function (e) {
          if (e.data === 1) {
            self.$node.find("img").fadeOut(400);
            self.$node.addClass("loaded");
          } else if (e.data === 0 && self.options.repeat) {
            self.player.seekTo(self.options.start);
          }
        },
      };
      self.options = $.extend(!0, {}, self.defaults, self.userOptions);
      self.options.height = Math.ceil(self.options.width / self.options.ratio);
      self.ID = new Date().getTime();
      self.holderID = "YTPlayer-ID-" + self.ID;
      if (self.options.fitToBackground) {
        self.createBackgroundVideo();
      } else {
        self.createContainerVideo();
      }
      self.$window.on("resize.YTplayer" + self.ID, function () {
        self.resize(self);
      });
      loadAPI(self.onYouTubeIframeAPIReady.bind(self));
      self.resize(self);
      return self;
    },
    pauseOnScroll: function pauseOnScroll() {
      var self = this;
      self.$window.on("scroll.YTplayer" + self.ID, function () {
        var state = self.player.getPlayerState();
        if (state === 1) {
          self.player.pauseVideo();
        }
      });
      self.$window.scrollStopped(function () {
        var state = self.player.getPlayerState();
        if (state === 2) {
          self.player.playVideo();
        }
      });
    },
    createContainerVideo: function createContainerVideo() {
      var self = this;
      var $YTPlayerString = $(
        '<div id="ytplayer-container' +
          self.ID +
          '" >\
                                    <div id="' +
          self.holderID +
          '" class="ytplayer-player-inline"></div> \
                                    </div> \
                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>'
      );
      self.$node.append($YTPlayerString);
      self.$YTPlayerString = $YTPlayerString;
      $YTPlayerString = null;
    },
    createBackgroundVideo: function createBackgroundVideo() {
      var self = this,
        $YTPlayerString = $(
          '<div id="ytplayer-container' +
            self.ID +
            '" class="ytplayer-container background">\
                                    <div id="' +
            self.holderID +
            '" class="ytplayer-player"></div>\
                                    </div>\
                                    <div id="ytplayer-shield" class="ytplayer-shield"></div>'
        );
      self.$node.append($YTPlayerString);
      self.$YTPlayerString = $YTPlayerString;
      $YTPlayerString = null;
    },
    resize: function resize(self) {
      var container = $(window);
      if (!self.options.fitToBackground) {
        container = self.$node;
      }
      var width = container.width(),
        pWidth,
        height = container.height(),
        pHeight,
        $YTPlayerPlayer = $("#" + self.holderID);
      if (width / self.options.ratio < height) {
        pWidth = Math.ceil(height * self.options.ratio);
        $YTPlayerPlayer
          .width(pWidth)
          .height(height)
          .css({ left: (width - pWidth) / 2, top: 0 });
      } else {
        pHeight = Math.ceil(width / self.options.ratio);
        $YTPlayerPlayer
          .width(width)
          .height(pHeight)
          .css({ left: 0, top: (height - pHeight) / 2 });
      }
      $YTPlayerPlayer = null;
      container = null;
    },
    onYouTubeIframeAPIReady: function onYouTubeIframeAPIReady() {
      var self = this;
      self.player = new window.YT.Player(self.holderID, self.options);
    },
    onPlayerReady: function onPlayerReady(e) {
      if (this.options.mute) {
        e.target.mute();
      }
    },
    getPlayer: function getPlayer() {
      return this.player;
    },
    destroy: function destroy() {
      var self = this;
      self.$node
        .removeData("yt-init")
        .removeData("ytPlayer")
        .removeClass("loaded");
      self.$YTPlayerString.remove();
      $(window).off("resize.YTplayer" + self.ID);
      $(window).off("scroll.YTplayer" + self.ID);
      self.$body = null;
      self.$node = null;
      self.$YTPlayerString = null;
      self.player.destroy();
      self.player = null;
    },
  };
  $.fn.scrollStopped = function (callback) {
    var $this = $(this),
      self = this;
    $this.scroll(function () {
      if ($this.data("scrollTimeout")) {
        clearTimeout($this.data("scrollTimeout"));
      }
      $this.data("scrollTimeout", setTimeout(callback, 250, self));
    });
  };
  $.fn.YTPlayer = function (options) {
    return this.each(function () {
      var el = this;
      $(el).data("yt-init", !0);
      var player = Object.create(YTPlayer);
      player.init(el, options);
      $.data(el, "ytPlayer", player);
    });
  };
})(jQuery, window, document);
/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 2.0.1
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 * https://codepen.io/acauamontiel/pen/mJdnw
 */
(function ($, window) {
  var $window = $(window);
  function Constellation(canvas, options) {
    var $canvas = $(canvas),
      context = canvas.getContext("2d"),
      defaults = {
        star: { color: "rgba(255, 255, 255, .5)", width: 1, randomWidth: !0 },
        line: { color: "rgba(255, 255, 255, .5)", width: 0.2 },
        position: { x: 0, y: 0 },
        width: window.innerWidth,
        height: window.innerHeight,
        velocity: 0.1,
        length: 100,
        distance: 120,
        radius: 150,
        stars: [],
      },
      config = $.extend(!0, {}, defaults, options);
    function Star() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = config.velocity - Math.random() * 0.5;
      this.vy = config.velocity - Math.random() * 0.5;
      this.radius = config.star.randomWidth
        ? Math.random() * config.star.width
        : config.star.width;
    }
    Star.prototype = {
      create: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, !1);
        context.fill();
      },
      animate: function () {
        var i;
        for (i = 0; i < config.length; i++) {
          var star = config.stars[i];
          if (star.y < 0 || star.y > canvas.height) {
            star.vx = star.vx;
            star.vy = -star.vy;
          } else if (star.x < 0 || star.x > canvas.width) {
            star.vx = -star.vx;
            star.vy = star.vy;
          }
          star.x += star.vx;
          star.y += star.vy;
        }
      },
      line: function () {
        var length = config.length,
          iStar,
          jStar,
          i,
          j;
        for (i = 0; i < length; i++) {
          for (j = 0; j < length; j++) {
            iStar = config.stars[i];
            jStar = config.stars[j];
            if (
              iStar.x - jStar.x < config.distance &&
              iStar.y - jStar.y < config.distance &&
              iStar.x - jStar.x > -config.distance &&
              iStar.y - jStar.y > -config.distance
            ) {
              if (
                iStar.x - config.position.x < config.radius &&
                iStar.y - config.position.y < config.radius &&
                iStar.x - config.position.x > -config.radius &&
                iStar.y - config.position.y > -config.radius
              ) {
                context.beginPath();
                context.moveTo(iStar.x, iStar.y);
                context.lineTo(jStar.x, jStar.y);
                context.stroke();
                context.closePath();
              }
            }
          }
        }
      },
    };
    this.createStars = function () {
      var length = config.length,
        star,
        i;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < length; i++) {
        config.stars.push(new Star());
        star = config.stars[i];
        star.create();
      }
      star.line();
      star.animate();
    };
    this.setCanvas = function () {
      canvas.width = config.width;
      canvas.height = config.height;
    };
    this.setContext = function () {
      context.fillStyle = config.star.color;
      context.strokeStyle = config.line.color;
      context.lineWidth = config.line.width;
    };
    this.setInitialPosition = function () {
      if (!options || !options.hasOwnProperty("position")) {
        config.position = { x: canvas.width * 0.5, y: canvas.height * 0.5 };
      }
    };
    this.loop = function (callback) {
      callback();
      this.rAF = window.requestAnimationFrame(
        function () {
          this.loop(callback);
        }.bind(this)
      );
    };
    this.handlers = {
      window: {
        mousemove: function (e) {
          config.position.x = e.pageX - $canvas.offset().left;
          config.position.y = e.pageY - $canvas.offset().top;
        },
        resize: function () {
          window.cancelAnimationFrame(this.rAF);
        },
      },
    };
    this.bind = function () {
      $window
        .on("mousemove", this.handlers.window.mousemove)
        .on("resize", this.handlers.window.resize.bind(this));
    };
    this.unbind = function () {
      $window
        .off("mousemove", this.handlers.window.mousemove)
        .off("resize", this.handlers.window.resize);
    };
    this.init = function () {
      this.setCanvas();
      this.setContext();
      this.setInitialPosition();
      this.loop(this.createStars);
      this.bind();
    };
  }
  function instantiate(element, options) {
    var c = new Constellation(element, options);
    c.init();
  }
  $.fn.constellation = function (options) {
    return this.each(function () {
      var thisvar = this;
      $window.on("resize", function () {
        instantiate(thisvar, options);
      });
      instantiate(this, options);
    });
  };
})(jQuery, window);