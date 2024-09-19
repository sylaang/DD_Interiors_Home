$(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
        // Si le scroll dépasse 50px, on ajoute la classe affix
        $('.nav').addClass('affix');
    } else {
        // Si le scroll est en dessous de 50px, on retire la classe affix
        $('.nav').removeClass('affix');
    }

    // Si on est à la fin de la page, on retire aussi la classe affix
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.nav').removeClass('affix');
    }
});

  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.nav ul li a');

    window.addEventListener('scroll', function () {
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + windowHeight;

        // Vérifier si on est au bas de la page
        if (scrollPosition >= documentHeight) {
            nav.style.background = 'none'; // Enlever le background
            links.forEach(link => link.style.color = 'whitesmoke'); // Changer la couleur des liens
        } else {
            links.forEach(link => link.style.color = '#1a1818'); // Couleur des liens par défaut
        }
    });
});

