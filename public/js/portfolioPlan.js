document.addEventListener('DOMContentLoaded', () => {
    // Récupérer tous les boutons pour sélectionner les vues
    const buttons = document.querySelectorAll('.select-view li button');
    
    // Récupérer toutes les vues disponibles
    const views = document.querySelectorAll('.views .view');

    // Ajouter un écouteur d'événement pour chaque bouton
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Obtenir la clé de données (data-key) du bouton cliqué
            const key = button.parentElement.getAttribute('data-key');
            
            // Retirer la classe 'active' de tous les boutons et cacher toutes les vues
            buttons.forEach(btn => {
                btn.parentElement.classList.remove('active');
            });
            views.forEach(view => {
                if (view.dataset.key !== key) {
                    // Si la vue n'est pas celle cliquée, retirer la classe 'active', cacher et rendre invisible
                    view.classList.remove('active');
                    view.style.opacity = '0'; // Rendre l'opacité à 0 pour cacher
                    view.style.visibility = 'hidden'; // Masquer l'élément
                }
            });

            // Ajouter la classe 'active' au bouton cliqué
            button.parentElement.classList.add('active');
            
            // Trouver et afficher la vue correspondant à la clé de données du bouton cliqué
            const activeView = document.querySelector(`.views .view[data-key="${key}"]`);
            if (activeView) {
                // Ajouter la classe 'active' à la vue pour la rendre visible
                activeView.classList.add('active');
                activeView.style.opacity = '1'; // Rendre l'opacité à 1 pour afficher
                activeView.style.visibility = 'visible'; // Rendre l'élément visible
            }
        });
    });
});