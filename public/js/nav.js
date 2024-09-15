$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        $('.nav').addClass('affix');
        console.log("OK");
    } else {
        $('.nav').removeClass('affix');
    }
  });


  $(window).scroll(function() {
    // Vérifier si on est sur la page "portfolio"
    if (window.location.pathname.includes('portfolio')) {
        var scrollTop = $(document).scrollTop();
        var nav = $('.nav');

        // Vérifier si la barre de navigation est fixée (affix) et si on est en haut de la page
        if (scrollTop > 50) {
            nav.addClass('affix');
            var navTop = nav.offset().top;

            // Vérifier si la .nav est au-dessus d'un élément avec une background-image
            var backgroundImageElements = $('div[style*="background-image"]');
            var isAboveBackgroundImage = false;

            backgroundImageElements.each(function() {
                var elementTop = $(this).offset().top;
                var elementBottom = elementTop + $(this).outerHeight();

                if (navTop >= elementTop && navTop <= elementBottom) {
                    isAboveBackgroundImage = true;
                    return false; // Sortir de la boucle each si trouvé
                }
            });

            if (isAboveBackgroundImage) {
                nav.css('background-color', 'rgba(245, 245, 245, 0.674)').addClass('nav-white');
            } else {
                nav.css('background-color', '#0d0d0d6d').removeClass('nav-white'); // Remettre la couleur d'origine
            }
        } else {
            // Réinitialiser la couleur de fond et retirer la classe affix quand on est en haut de la page
            nav.removeClass('affix').css('background-color', 'transparent').removeClass('nav-white');
        }
    }
});

