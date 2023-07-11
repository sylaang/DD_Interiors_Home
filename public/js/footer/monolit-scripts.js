(function ($) {
  "use strict";
  function initMonolit() {
    "use strict";
    var ss = jQuery(".single-slider");
    var ss_ops = ss.data("options")
      ? ss.data("options")
      : {
          smartSpeed: 1300,
          autoplay: !1,
          autoplaySpeed: 3600,
          items: 1,
          autoplayTimeout: 4000,
          responsive: !1,
          autoHeight: !0,
          loop: !0,
          dots: !0,
          center: !1,
          autoWidth: !1,
        };
    if (ss_ops.responsive) {
      var respArr = ss_ops.responsive.split(",");
      ss_ops.responsive = {};
      for (var i = 0; i < respArr.length; i++) {
        var tempVal = respArr[i].split(":");
        ss_ops.responsive[tempVal[0]] = { items: tempVal[1] };
      }
    } else {
      ss_ops.responsive = !1;
    }
    ss.imagesLoaded(function () {
      ss.owlCarousel({
        margin: 0,
        items: ss_ops.items,
        smartSpeed: ss_ops.smartSpeed,
        loop: ss_ops.loop,
        nav: !1,
        dots: ss_ops.dots,
        autoHeight: ss_ops.autoHeight,
        autoplay: ss_ops.autoplay,
        autoplayTimeout: ss_ops.autoplayTimeout,
        autoplaySpeed: ss_ops.autoplaySpeed,
        responsive: ss_ops.responsive,
        center: ss_ops.center,
        autoWidth: ss_ops.autoWidth,
      });
    });
    jQuery(document).on("keydown.carousel-ss", function (e) {
      if (e.keyCode == 37) {
        ss.trigger("prev.owl");
      }
      if (e.keyCode == 39) {
        ss.trigger("next.owl");
      }
    });
    jQuery(".single-slider-holder a.next-slide").on("click", function () {
      jQuery(this)
        .closest(".single-slider-holder")
        .find(ss)
        .trigger("next.owl.carousel");
      return !1;
    });
    jQuery(".single-slider-holder a.prev-slide").on("click", function () {
      jQuery(this)
        .closest(".single-slider-holder")
        .find(ss)
        .trigger("prev.owl.carousel");
      return !1;
    });
    var sync1 = jQuery(".hero-wrap-image-slider"),
      sync2 = jQuery(".hero-wrap-text-slider"),
      flag = !1,
      duration = parseInt(sync1.data("dur")),
      rtlt = eval(jQuery(this).data("rtlt"));
    var sync2_ops = sync2.data("options")
      ? sync2.data("options")
      : {
          smartSpeed: 1200,
          autoplay: !1,
          autoplaySpeed: 3600,
          items: 1,
          autoplayTimeout: 4000,
          responsive: !1,
          loop: !1,
          dots: !0,
          center: !1,
        };
    if (sync2_ops.responsive) {
      var respArr = sync2_ops.responsive.split(",");
      sync2_ops.responsive = {};
      for (var i = 0; i < respArr.length; i++) {
        var tempVal = respArr[i].split(":");
        sync2_ops.responsive[tempVal[0]] = { items: tempVal[1] };
      }
    } else {
      sync2_ops.responsive = !1;
    }
    sync1
      .owlCarousel({
        loop: !1,
        margin: 0,
        nav: !1,
        items: sync2_ops.items,
        dots: !1,
        smartSpeed: sync2_ops.smartSpeed,
        autoHeight: !1,
        autoplay: !1,
        autoplayTimeout: sync2_ops.autoplayTimeout,
        autoplaySpeed: sync2_ops.autoplaySpeed,
        responsive: sync2_ops.responsive,
        center: sync2_ops.center,
        autoWidth: !1,
      })
      .on("changed.owl.carousel", function (a) {
        if (!flag) {
          flag = !0;
          sync2.trigger("to.owl.carousel", [a.item.index, duration, !0]);
          flag = !1;
        }
      });
    sync2
      .owlCarousel({
        loop: !1,
        margin: 0,
        nav: !1,
        items: sync2_ops.items,
        dots: sync2_ops.dots,
        smartSpeed: sync2_ops.smartSpeed,
        autoHeight: !1,
        autoplay: sync2_ops.autoplay,
        autoplayTimeout: sync2_ops.autoplayTimeout,
        autoplaySpeed: sync2_ops.autoplaySpeed,
        responsive: sync2_ops.responsive,
        center: sync2_ops.center,
        autoWidth: !1,
      })
      .on("changed.owl.carousel", function (a) {
        if (!flag) {
          flag = !0;
          sync1.trigger("to.owl.carousel", [a.item.index, duration, !0]);
          flag = !1;
        }
      });
    jQuery(".hero-wrap-text-slider-holder a.next-slide").on(
      "click",
      function () {
        jQuery(this)
          .closest(".hero-wrap-text-slider-holder")
          .find(sync2)
          .trigger("next.owl.carousel");
        return !1;
      }
    );
    jQuery(".hero-wrap-text-slider-holder a.prev-slide").on(
      "click",
      function () {
        jQuery(this)
          .closest(".hero-wrap-text-slider-holder")
          .find(sync2)
          .trigger("prev.owl.carousel");
        return !1;
      }
    );
    jQuery(".home-slider-loop").each(function () {
      var slloop = jQuery(this);
      var slloop_ops = slloop.data("options")
        ? slloop.data("options")
        : {
            smartSpeed: 1200,
            autoplay: !1,
            autoplaySpeed: 3600,
            items: 1,
            autoplayTimeout: 4000,
            responsive: !1,
            loop: !0,
            dots: !0,
            center: !1,
          };
      if (slloop_ops.responsive) {
        var respArr = slloop_ops.responsive.split(",");
        slloop_ops.responsive = {};
        for (var i = 0; i < respArr.length; i++) {
          var tempVal = respArr[i].split(":");
          slloop_ops.responsive[tempVal[0]] = { items: tempVal[1] };
        }
      } else {
        slloop_ops.responsive = !1;
      }
      slloop.owlCarousel({
        loop: slloop_ops.loop,
        margin: 0,
        nav: !1,
        items: slloop_ops.items,
        dots: slloop_ops.dots,
        smartSpeed: slloop_ops.smartSpeed,
        autoHeight: !1,
        autoplay: slloop_ops.autoplay,
        autoplayTimeout: slloop_ops.autoplayTimeout,
        autoplaySpeed: slloop_ops.autoplaySpeed,
        responsive: slloop_ops.responsive,
        center: slloop_ops.center,
        autoWidth: !1,
      });
      jQuery(".hero-wrap-image-slider-holder a.next-slide").on(
        "click",
        function () {
          jQuery(this)
            .closest(".hero-wrap-image-slider-holder")
            .find(slloop)
            .trigger("next.owl.carousel");
          return !1;
        }
      );
      jQuery(".hero-wrap-image-slider-holder a.prev-slide").on(
        "click",
        function () {
          jQuery(this)
            .closest(".hero-wrap-image-slider-holder")
            .find(slloop)
            .trigger("prev.owl.carousel");
          return !1;
        }
      );
    });
    var gR = jQuery(".gallery_horizontal"),
      w = jQuery(window);
    var gR_ops = gR.data("options")
      ? gR.data("options")
      : {
          smartSpeed: 1300,
          autoplay: !1,
          items: 1,
          loop: !0,
          center: !0,
          autoWidth: !0,
          thumbs: !0,
        };
    function initGalleryhorizontal() {
      var a = jQuery(window).height(),
        b = jQuery("header.monolit-header").outerHeight(),
        c = jQuery(".gallery_horizontal");
      var d = 0;
      if (
        jQuery(".control-panel").length > 0 &&
        !jQuery(".control-panel").hasClass("hide-cpanel")
      )
        d = jQuery(".control-panel").outerHeight();
      c.find("img").css({ height: a - b - d - 20 });
      if (w.width() > 1036) {
        gR.owlCarousel({
          autoWidth: gR_ops.autoWidth,
          margin: 10,
          items: gR_ops.items,
          smartSpeed: gR_ops.smartSpeed,
          loop: gR_ops.loop,
          autoplay: gR_ops.autoplay,
          center: gR_ops.center,
          nav: !1,
          thumbs: gR_ops.thumbs,
          thumbImage: !0,
          thumbContainerClass: "owl-thumbs",
          thumbItemClass: "owl-thumb-item",
          onInitialized: function () {
            if (gR.find(".owl-item.active.center").length) {
              var c = gR
                .find(".owl-item.active.center")
                .find(".horizontal_item");
            } else {
              var c = gR.find(".owl-item.active").find(".horizontal_item");
            }
            var e = c.data("phdesc");
            var f = c.data("phname");
            if (e)
              jQuery(".caption").html("<h4>" + f + "</h4><p>" + e + "</p>");
          },
        }).on("changed.owl.carousel", function (e) {
          gR.find(".owl-stage").css({ height: a - b - d, overflow: "hidden" });
        });
        var full_in_mousewheel_pro = !1;
        gR.on("translated.owl.carousel", function (a) {
          full_in_mousewheel_pro = !1;
        });
        gR.on("mousewheel", ".owl-stage", function (a) {
          if (!full_in_mousewheel_pro) {
            full_in_mousewheel_pro = !0;
            if (a.deltaY < 0) gR.trigger("next.owl");
            else gR.trigger("prev.owl");
          }
          a.preventDefault();
        });
        gR.closest(".monolit_sec").css("height", a);
      } else {
        if (gR.find(".owl-stage-outer").length) {
          gR.trigger("destroy.owl.carousel");
        }
        gR.closest(".monolit_sec").css("height", c.outerHeight());
      }
    }
    if (gR.length) {
      gR.imagesLoaded(function () {
        initGalleryhorizontal();
        w.on("resize.destroyhorizontal", function () {
          setTimeout(initGalleryhorizontal, 150);
        });
      });
    }
    jQuery(document).on("keydown.carousel-hz", function (e) {
      if (e.keyCode == 37) {
        gR.trigger("prev.owl");
      }
      if (e.keyCode == 39) {
        gR.trigger("next.owl");
      }
    });
    jQuery(".keyboardcontr").each(function () {
      var slider = jQuery(this);
      jQuery(document).on("keydown.slider-carousel", function (e) {
        if (e.keyCode == 37) {
          slider.trigger("prev.owl");
        }
        if (e.keyCode == 39) {
          slider.trigger("next.owl");
        }
      });
    });
    jQuery(".refrestonresizeowl").each(function () {
      var slider = jQuery(this);
      jQuery(window).on("resize", function () {
        if (slider.find(".owl-stage-outer").length)
          slider.trigger("refresh.owl.carousel");
      });
    });
    gR.on("translated.owl.carousel", function (a) {
      if (jQuery(this).find(".owl-item.active.center").length) {
        var b = jQuery(this)
          .find(".owl-item.active.center")
          .find(".horizontal_item")
          .data("phdesc");
        var c = jQuery(this)
          .find(".owl-item.active.center")
          .find(".horizontal_item")
          .data("phname");
      } else {
        var b = jQuery(this)
          .find(".owl-item.active")
          .find(".horizontal_item")
          .data("phdesc");
        var c = jQuery(this)
          .find(".owl-item.active")
          .find(".horizontal_item")
          .data("phname");
      }
      if (b) jQuery(".caption").html("<h4>" + c + "</h4><p>" + b + "</p>");
    });
    jQuery(".resize-carousel-holder a.next-slide").on("click", function () {
      jQuery(this)
        .closest(".resize-carousel-holder")
        .find(gR)
        .trigger("next.owl.carousel");
      return !1;
    });
    jQuery(".resize-carousel-holder a.prev-slide").on("click", function () {
      jQuery(this)
        .closest(".resize-carousel-holder")
        .find(gR)
        .trigger("prev.owl.carousel");
      return !1;
    });
    var gf = jQuery(".full-screen-gallery"),
      w2 = jQuery(window);
    var gf_ops = gf.data("options")
      ? gf.data("options")
      : {
          smartSpeed: 1300,
          autoplay: !1,
          items: 1,
          loop: !0,
          center: !1,
          autoWidth: !1,
          thumbs: !1,
          responsive: !1,
        };
    if (gf_ops.responsive) {
      var respArr = gf_ops.responsive.split(",");
      gf_ops.responsive = {};
      for (var i = 0; i < respArr.length; i++) {
        var tempVal = respArr[i].split(":");
        gf_ops.responsive[tempVal[0]] = { items: tempVal[1] };
      }
    } else {
      gf_ops.responsive = !1;
    }
    function initGalleryFullscreen() {
      var a = jQuery(window).height(),
        b = jQuery(".full-screen-gallery"),
        c = jQuery(".control-panel").outerHeight(),
        d = jQuery(".resize-carousel-holder").outerHeight(),
        e = jQuery(".full-screen-gallery .full-screen-item");
      if (!b.is(".autowidth-yes") && !b.is(".autoheight-yes")) {
        b.css({ height: d - c });
        e.css({ height: d });
      }
      gf.owlCarousel({
        autoWidth: gf_ops.autoWidth,
        margin: 0,
        items: gf_ops.items,
        smartSpeed: gf_ops.smartSpeed,
        loop: gf_ops.loop,
        autoplay: gf_ops.autoplay,
        center: gf_ops.center,
        nav: !1,
        thumbs: gf_ops.thumbs,
        responsive: gf_ops.responsive,
        autoHeight: b.is(".autoheight-yes"),
      });
    }
    if (gf.length) {
      gf.imagesLoaded(function () {
        initGalleryFullscreen();
        w2.on("resize.destroyfullscreen", function () {
          setTimeout(initGalleryFullscreen, 150);
        });
      });
    }
    jQuery(document).on("keydown.carousel-fs", function (e) {
      if (e.keyCode == 37) {
        gf.trigger("prev.owl");
      }
      if (e.keyCode == 39) {
        gf.trigger("next.owl");
      }
    });
    jQuery(".full-screen-gallery-holder a.next-slide").on("click", function () {
      jQuery(this)
        .closest(".full-screen-gallery-holder")
        .find(gf)
        .trigger("next.owl.carousel");
      return !1;
    });
    jQuery(".full-screen-gallery-holder a.prev-slide").on("click", function () {
      jQuery(this)
        .closest(".full-screen-gallery-holder")
        .find(gf)
        .trigger("prev.owl.carousel");
      return !1;
    });
    jQuery(".single-popup-image").lightGallery({
      selector: "this",
      cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
      download: !1,
      counter: !1,
    });
    if (jQuery(".woocommerce-product-gallery__wrapper").length) {
      jQuery(".woocommerce-product-gallery__wrapper").each(function () {
        var $woolg = jQuery(this);
        $woolg.lightGallery({
          selector: ".woocommerce-product-gallery__image a",
          cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
          download: !1,
          loop: !0,
          thumbnail: !1,
        });
      });
    }
    var $lg = jQuery(".lightgallery"),
      dlt = $lg.data("looped");
    $lg.lightGallery({
      selector: ".lightgallery a.popup-image",
      cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
      download: !1,
      loop: dlt,
      thumbnail: !1,
    });
    jQuery(".lightgallery").on("onBeforeNextSlide.lg", function (a) {
      gR.trigger("next.owl.carousel");
      gf.trigger("next.owl.carousel");
      ss.trigger("next.owl.carousel");
    });
    jQuery(".lightgallery").on("onBeforePrevSlide.lg", function (a) {
      gR.trigger("prev.owl.carousel");
      gf.trigger("prev.owl.carousel");
      ss.trigger("prev.owl.carousel");
    });
    function initFolioGal() {
      if (jQuery(".folio-gallery").length) {
        jQuery(".folio-gallery").each(function () {
          var $folg = jQuery(this),
            dlt = $folg.data("looped");
          if ($folg.data("lightGallery") != undefined) {
            $folg.data("lightGallery").destroy(!0);
          }
          $folg.lightGallery({
            selector:
              ".folio-gallery .portfolio_item:not([style*='display: none']) .folio-popup-gallery,.folio-gallery .gallery-item:not([style*='display: none']) .folio-popup-gallery",
            cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
            download: !1,
            loop: dlt,
            thumbnail: !1,
            youtubePlayerParams: {
              modestbranding: 1,
              showinfo: 0,
              controls: 1,
            },
            vimeoPlayerParams: { byline: 0, portrait: 0, color: "CCCCCC" },
            dailymotionPlayerParams: {},
          });
        });
      }
    }
    initFolioGal();
    var slsl = jQuery(".slideshow-item");
    var slsl_ops = slsl.data("options")
      ? slsl.data("options")
      : { autoplaySpeed: 3600, items: 1, autoplayTimeout: 4000 };
    slsl.owlCarousel({
      loop: !0,
      margin: 0,
      nav: !1,
      items: slsl_ops.items,
      dots: !1,
      animateOut: "fadeOut",
      animateIn: "fadeIn",
      autoplay: !0,
      autoplayTimeout: slsl_ops.autoplayTimeout,
      autoplayHoverPause: !1,
      autoplaySpeed: slsl_ops.autoplaySpeed,
    });
    var tsh = jQuery(".testimon-slider");
    var tsh_ops = tsh.data("options")
      ? tsh.data("options")
      : {
          smartSpeed: 1300,
          autoplay: !1,
          autoplaySpeed: 3600,
          items: 1,
          autoplayTimeout: 4000,
          responsive: !1,
          autoHeight: !0,
          loop: !0,
          dots: !1,
          center: !1,
          autoWidth: !1,
        };
    if (tsh_ops.responsive) {
      var respArr = tsh_ops.responsive.split(",");
      tsh_ops.responsive = {};
      for (var i = 0; i < respArr.length; i++) {
        var tempVal = respArr[i].split(":");
        tsh_ops.responsive[tempVal[0]] = { items: tempVal[1] };
      }
    } else {
      tsh_ops.responsive = !1;
    }
    tsh.owlCarousel({
      margin: 0,
      items: tsh_ops.items,
      smartSpeed: tsh_ops.smartSpeed,
      loop: tsh_ops.loop,
      nav: !1,
      dots: tsh_ops.dots,
      autoHeight: tsh_ops.autoHeight,
      autoplay: tsh_ops.autoplay,
      autoplayTimeout: tsh_ops.autoplayTimeout,
      autoplaySpeed: tsh_ops.autoplaySpeed,
      responsive: tsh_ops.responsive,
      center: tsh_ops.center,
      autoWidth: tsh_ops.autoWidth,
    });
    jQuery(".testimon-slider-holder a.next-slide").on("click", function () {
      jQuery(this)
        .closest(".testimon-slider-holder")
        .find(tsh)
        .trigger("next.owl.carousel");
    });
    jQuery(".testimon-slider-holder a.prev-slide").on("click", function () {
      jQuery(this)
        .closest(".testimon-slider-holder")
        .find(tsh)
        .trigger("prev.owl.carousel");
    });
    var ts = jQuery(".show-thumbs").data("textshow");
    var th = jQuery(".show-thumbs").data("texthide");
    jQuery(".show-thumbs").text(ts);
    function showThumbs() {
      jQuery(".show-thumbs").removeClass("vis-t");
      jQuery(".owl-thumbs").addClass("vis-thumbs");
      jQuery(".show-thumbs").text(th);
      setTimeout(function () {
        jQuery(".owl-thumb-item").addClass("himask");
      }, 650);
    }
    function hideThumbs() {
      jQuery(".show-thumbs").text(ts);
      jQuery(".show-thumbs").addClass("vis-t");
      jQuery(".owl-thumbs").removeClass("vis-thumbs");
      jQuery(".owl-thumb-item").removeClass("himask");
    }
    jQuery(".show-thumbs").on("click", function () {
      if (jQuery(this).hasClass("vis-t")) showThumbs();
      else hideThumbs();
      return !1;
    });
    jQuery(document).on("click", ".owl-thumb-item", function () {
      hideThumbs();
      return !1;
    });
    function a() {
      jQuery(".hero-wrap-image-slider .item").css({
        height: jQuery(".hero-wrap-image-slider").outerHeight(!0),
      });
      jQuery(".hero-wrap-text-slider .item").css({
        height: jQuery(".hero-wrap-text-slider").outerHeight(!0),
      });
      jQuery(".home-slider-loop .item").css({
        height: jQuery(".home-slider-loop").outerHeight(!0),
      });
      jQuery(".slideshow-item .item").css({
        height: jQuery(".slideshow-item ").outerHeight(!0),
      });
      setTimeout(function () {
        jQuery(".height-emulator").css({
          height: jQuery(".content-footer").outerHeight(!0),
        });
      }, 1000);
      jQuery(".team-social").css({
        "margin-top": (-1 * jQuery(".team-social").height()) / 2 + "px",
      });
      var a = jQuery(window).height(),
        b = jQuery("header.monolit-header").outerHeight(),
        c = jQuery(".p_horizontal_wrap");
      var d = jQuery(window).width();
      var e = 0;
      if (jQuery(".portfolio-pagination").length)
        e = jQuery(".portfolio-pagination").outerHeight();
      c.css("height", a - b - 30 - e);
      if (jQuery(".portfolio-pagination").length)
        jQuery(".resize-carousel-holder").css("height", a - b - e);
      var hoz_folio_height = jQuery(
        "#portfolio_horizontal_container"
      ).outerHeight();
      if (d <= 768) c.css("height", hoz_folio_height);
      jQuery(" #portfolio_horizontal_container .portfolio_item img  ").css({
        height: jQuery(".portfolio_item").outerHeight(!0),
      });
      if (jQuery(window).width() > 1036) {
        jQuery(".nav-holder").css("display", "block");
      } else {
        jQuery(".nav-holder").css("display", "none");
      }
      if (jQuery(".landing-logo-inner").length) {
        jQuery(".landing-logo-inner").css({
          "margin-top":
            (-1 * jQuery(".landing-logo-inner").height()) / 2 + "px",
        });
        jQuery(".box-inner").css({
          "margin-top": (-1 * jQuery(".box-inner").height()) / 2 + "px",
        });
      }
    }
    a();
    jQuery(window).on("resize", function () {
      a();
    });
    if (jQuery("#iframe-demo").length) {
      jQuery(".box li a").on("mouseenter", function () {
        var goTo = jQuery(this).attr("href");
        jQuery("#iframe-demo").attr("src", goTo);
      });
    }
    var i = 1;
    jQuery(document.body).on("appear", ".stats", function (a) {
      if (1 === i) k(2600);
      i++;
    });
    function number(a, b, c, d) {
      if (d) {
        var e = 0;
        var f = parseInt(d / a);
        var g = setInterval(function () {
          if (e - 1 < a) c.html(e);
          else {
            c.html(b);
            clearInterval(g);
          }
          e++;
        }, f);
      } else c.html(b);
    }
    function k(a) {
      jQuery(".stats .num").each(function () {
        var b = jQuery(this);
        var c = b.attr("data-num");
        var d = b.attr("data-content");
        number(c, d, b, a);
      });
    }
    jQuery(".animaper").appear();
    jQuery(document.body).on("appear", ".piechart-holder", function () {
      jQuery(this)
        .find(".chart")
        .each(function () {
          var a = jQuery(".piechart-holder").data("skcolor"),
            b = jQuery(".piechart-holder").data("pies"),
            c = jQuery(".piechart-holder").data("pielw");
          jQuery(".chart").easyPieChart({
            barColor: a,
            trackColor: "transparent",
            scaleColor: "transparent",
            size: b,
            lineWidth: c,
            lineCap: "butt",
            onStep: function (a, b, c) {
              jQuery(this.el).find(".percent").text(Math.round(c));
            },
          });
        });
    });
    jQuery(document.body).on("appear", ".skillbar-box", function () {
      jQuery(this)
        .find("div.skillbar-bg")
        .each(function () {
          jQuery(this)
            .find(".custom-skillbar")
            .delay(600)
            .animate({ width: jQuery(this).attr("data-percent") }, 1500);
        });
    });
    jQuery(".background-youtube").each(function () {
      var $that = jQuery(this),
        vid = $that.data("vid"),
        mt = $that.data("mv"),
        ql = $that.data("ql") ? $that.data("ql") : "highres",
        pos = $that.data("pos");
      $that.YTPlayer({
        fitToBackground: !0,
        videoId: vid,
        pauseOnScroll: pos,
        mute: mt,
        callback: function () {
          var a = $that.data("ytPlayer").player;
          a.setPlaybackQuality(ql);
        },
        playerVars: {
          modestbranding: 0,
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          wmode: "transparent",
          branding: 0,
          rel: 0,
          autohide: 0,
          origin: window.location.origin,
        },
      });
    });
    jQuery(".background-vimeo").each(function () {
      var $that = jQuery(this),
        options = $that.data("opts")
          ? $that.data("opts")
          : { video: "143243001", quality: "1080p", mute: "1", loop: "1" };
      var url = "//player.vimeo.com/video/" + options.video;
      if (options.mute == "1")
        url +=
          "?autoplay=1&background=1&quality=" +
          options.quality +
          "&loop=" +
          options.loop;
      else
        url +=
          "?autoplay=1&quality=" + options.quality + "&loop=" + options.loop;
      $that.append(
        '<iframe src="' +
          url +
          '"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay"></iframe>'
      );
    });
    jQuery(".video-holder").height(jQuery(".media-container").height());
    if (jQuery(window).width() > 1024) {
      if (jQuery(".video-holder").length > 0) {
        if (
          (jQuery(".media-container").height() / 9) * 16 >
          jQuery(".media-container").width()
        ) {
          jQuery(".background-vimeo iframe ")
            .height(jQuery(".media-container").height())
            .width((jQuery(".media-container").height() / 9) * 16);
          jQuery(".background-vimeo iframe ").css({
            "margin-left": (-1 * jQuery("iframe").width()) / 2 + "px",
            top: "-75px",
            "margin-top": "0px",
          });
        } else {
          jQuery(".background-vimeo iframe ")
            .width(jQuery(window).width())
            .height((jQuery(window).width() / 16) * 9);
          jQuery(".background-vimeo iframe ").css({
            "margin-left": (-1 * jQuery("iframe").width()) / 2 + "px",
            "margin-top": (-1 * jQuery("iframe").height()) / 2 + "px",
            top: "50%",
          });
        }
      }
    } else if (jQuery(window).width() < 760) {
      jQuery(".video-holder").height(jQuery(".media-container").height());
      jQuery(".background-vimeo iframe ").height(
        jQuery(".media-container").height()
      );
    } else {
      jQuery(".video-holder").height(jQuery(".media-container").height());
      jQuery(".background-vimeo iframe ").height(
        jQuery(".media-container").height()
      );
    }
    jQuery(".cthiso-filters").on("click", "a.cthiso-filter", function (b) {
      b.preventDefault();
      var c = jQuery(this).attr("data-filter"),
        $wrap = jQuery(this).closest(".cthiso-wrapper");
      if (c == "*") {
        $wrap.find(".cthiso-flex").children().fadeIn();
      } else {
        $wrap.find(".cthiso-flex").children().not(c).fadeOut("fast");
        $wrap.find(".cthiso-flex").children(c).fadeIn();
      }
      jQuery(".cthiso-filters a.cthiso-filter").removeClass(
        "gallery-filter_active"
      );
      jQuery(this).addClass("gallery-filter_active");
      return !1;
    });
    function n() {
      if (jQuery(".gallery-items").length) {
        var a = jQuery(".gallery-items").isotope({
          itemSelector:
            ".gallery-item, .gallery-item-second, .gallery-item-three",
          percentPosition: !0,
          masonry: {
            columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
          },
          transformsEnabled: !0,
          transitionDuration: "700ms",
        });
        a.imagesLoaded(function () {
          a.isotope("layout");
        });
        a.isotope("on", "layoutComplete", function (a, b) {
          jQuery.each(a, function (index, value) {
            var $this = jQuery(value.element);
            if ($this.is(".is_folio_video")) {
              var a = $this.outerHeight();
            }
          });
          var b = a.length;
          jQuery(".num-album").html(b);
        });
        a.on("arrangeComplete", function (event, filteredItems) {
          initFolioGal();
        });
      }
      var b = {
        touchbehavior: !0,
        emulatetouch: !0,
        cursoropacitymax: 1,
        cursorborderradius: "0",
        background: "transparent",
        cursorwidth: "4px",
        cursorborder: "0px",
        cursorcolor: "transparent",
        autohidemode: !0,
        bouncescroll: !1,
        scrollspeed: 120,
        mousescrollstep: 90,
        grabcursorenabled: !0,
        horizrailenabled: !1,
        preservenativescrolling: !0,
        cursordragontouch: !0,
      };
      if (jQuery(".p_horizontal_wrap").is(".hoz_has_headfoot_wrap"))
        c.enablemousewheel = !1;
      var d = jQuery("#portfolio_horizontal_container");
      d.imagesLoaded(function (a, b, e) {
        var f = {
          itemSelector: ".portfolio_item",
          layoutMode: "packery",
          packery: { isHorizontal: !0, gutter: 0 },
          resizable: !0,
          transformsEnabled: !0,
          transitionDuration: "700ms",
        };
        var g = {
          itemSelector: ".portfolio_item",
          layoutMode: "packery",
          packery: { isHorizontal: !1, gutter: 0 },
          resizable: !0,
          transformsEnabled: !0,
          transitionDuration: "700ms",
        };
        d.isotope("on", "layoutComplete", function (a, b) {
          jQuery.each(a, function (index, value) {
            var $this = jQuery(value.element);
            if ($this.is(".is_folio_video")) {
              var a = $this.outerHeight();
              $this
                .find(".resp-video-holder")
                .css("height", a)
                .find("iframe")
                .css("height", a);
              $this
                .find(".resp-video-holder")
                .css("width", a * 1.61)
                .find("iframe")
                .css("width", a * 1.61);
            }
          });
          var hoz_folio_height = jQuery(
            "#portfolio_horizontal_container"
          ).outerHeight();
          if (jQuery(window).width() <= 768) {
            jQuery(".p_horizontal_wrap").css("height", hoz_folio_height);
            jQuery(".resize-carousel-holder").css("height", hoz_folio_height);
            jQuery(".portfolio-horizontal").css(
              "height",
              hoz_folio_height +
                jQuery(".portfolio-pagination").outerHeight() +
                60
            );
          }
          var b = a.length;
          jQuery(".num-album").html(b);
        });
        d.on("arrangeComplete", function (event, filteredItems) {
          initFolioGal();
        });
      });
    }
    if (jQuery(".particular").length) {
      jQuery(window).on("scroll", function () {
        if (
          jQuery(window).scrollTop() + jQuery(window).height() >
          jQuery(document).height() - 50
        )
          jQuery(".particular.footer-canvas").fadeIn(1);
        else jQuery(".particular.footer-canvas").fadeOut(1);
      });
      var windowWidth = window.innerWidth;
      var radius = (windowWidth < 768) ? 150 : 350;
      var cscl = jQuery(".particular").data("color")
        ? jQuery(".particular").data("color")
        : "rgba(255, 255, 255, .5)";
      jQuery(".particular").constellation({
        star: { width: 1 },
        line: { color: cscl },
        radius: radius,
      });
    }
    var bgImage = jQuery(".bg");
    bgImage.each(function (a) {
      if (jQuery(this).attr("data-bg"))
        jQuery(this).css(
          "background-image",
          "url(" + jQuery(this).data("bg") + ")"
        );
    });
    var shs = eval(jQuery(".share-container").attr("data-share"));
    if (shs) {
      jQuery(".share-container").share({ networks: shs });
    }
    var blshs = eval(jQuery(".blog-share-container").attr("data-share"));
    if (blshs) {
      jQuery(".blog-share-container").share({ networks: blshs });
    }
    function hideShare() {
      jQuery(".share-inner").removeClass("visshare");
      jQuery(".show-share").addClass("isShare");
      jQuery(".share-container ").removeClass("vissc");
      jQuery("header.monolit-header").removeClass("vis-header-b");
    }
    function showShare() {
      jQuery(".share-inner").addClass("visshare");
      jQuery(".show-share").removeClass("isShare");
      setTimeout(function () {
        jQuery("header.monolit-header").addClass("vis-header-b");
        jQuery(".share-container ").addClass("vissc");
      }, 400);
    }
    jQuery(".show-share").on("click", function (a) {
      a.preventDefault();
      if (jQuery(".show-share").hasClass("isShare")) showShare();
      else hideShare();
    });
    var nb = jQuery(".nav-button"),
      nh = jQuery(".nav-holder");
    function showMenu() {
      nb.removeClass("vis-m");
      nh.slideDown(500);
    }
    function hideMenu() {
      nb.addClass("vis-m");
      nh.slideUp(500);
    }
    nb.on("click", function () {
      if (jQuery(this).hasClass("vis-m")) showMenu();
      else hideMenu();
    });
    var mobileHover = function () {
      jQuery(".portfolio_item,.grid-item-holder , nav li")
        .on("touchstart", function () {
          jQuery(this).trigger("hover");
        })
        .on("touchend", function () {
          jQuery(this).trigger("hover");
        });
    };
    mobileHover();
  }
  function contanimshow() {
    var a = window.location.href;
    var b = jQuery(".dynamic-title").text();
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    jQuery(".footer-title a").attr("href", a);
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
      jQuery(".footer-title a").html(b);
    }
    return !1;
  }
  function initparallax() {
    var a = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows()
        );
      },
    };
    var trueMobile = a.any();
    if (null == trueMobile != "1") {
      var b = jQuery("#main-theme");
      if (b.find("[data-top-bottom]").length > 0) {
        b.imagesLoaded(function () {
          s = skrollr.init();
          s.destroy();
          jQuery(window).on("resize", function () {
            var a = jQuery(window).width();
            if (a < 1036) s.destroy();
            else
              skrollr.init({
                forceHeight: !1,
                easing: "easeInOutElastic",
                mobileCheck: function () {
                  return !1;
                },
              });
          });
          skrollr.init({
            forceHeight: !1,
            easing: "easeInOutElastic",
            mobileCheck: function () {
              return !1;
            },
          });
        });
      }
      var c = jQuery(window).width();
      if (c < 1036) {
        s = skrollr.init();
        s.destroy();
      }
    }
    if (trueMobile) jQuery(".background-youtube , .background-vimeo").remove();
  }
  jQuery(document).ready(function ($) {
    initMonolit();
    initparallax();
    if (jQuery("#monolit-loader").length) {
      jQuery(".loader").fadeOut(500, function () {
        jQuery("#main-theme").animate({ opacity: "1" }, function () {
          contanimshow();
        });
      });
    } else {
      contanimshow();
    }
    $(document).on(
      "click",
      "li.menu-item-language a, li.wpml-ls-item a",
      function (e) {
        e.preventDefault();
        var a = $(this).attr("href");
        window.location.href = a;
      }
    );
    if (jQuery("main .products > .product").length) {
      jQuery(".gallery-filters").on("click", "a.gallery-filter", function (b) {
        b.preventDefault();
        var c = jQuery(this).attr("data-filter");
        var $products = jQuery(".products > .product");
        if (c == "*") {
          $products.fadeIn();
        } else {
          $products.fadeOut();
          jQuery(".products > .product" + c).fadeIn();
        }
        jQuery(".gallery-filters a.gallery-filter").removeClass(
          "gallery-filter-active"
        );
        jQuery(this).addClass("gallery-filter-active");
        return !1;
      });
    }
  });
})(jQuery);
