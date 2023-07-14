  // Sélectionnez tous les liens <a>
  var links = document.querySelectorAll("a");

  // Parcourez tous les liens et ajoutez un gestionnaire d'événements de clic
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      // Empêchez le comportement de lien par défaut
      event.preventDefault();

      // Obtenez le lien de la page cible
      var href = this.getAttribute("href");

      // Créez un nouvel élément <link> pour les CSS
      var cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = href + ".css";

      // Créez un nouvel élément <script> pour les JS
      var jsScript = document.createElement("script");
      jsScript.src = href + ".js";

      // Ajoutez les éléments <link> et <script> au DOM avec un délai de 3 secondes
      setTimeout(function () {
        document.head.appendChild(cssLink);
        document.body.appendChild(jsScript);

        // Naviguez vers la nouvelle page en utilisant l'attribut href du lien
        window.location.href = href;
      }, 2000);
    });
  });