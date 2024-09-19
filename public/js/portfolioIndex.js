let lastDirection = null; // Variable pour garder une trace de la dernière direction

function handleButtonClick(event) {
  event.preventDefault(); // Empêche l'action par défaut du bouton

  const category = this.textContent.trim().toLowerCase();
  const container = document.querySelector('#background-container');
  const allItems = document.querySelectorAll('.carousells--item');
  const titleElement = document.getElementById('dynamic-title');

  // Met à jour le texte du titre en fonction du bouton cliqué
  if (category === 'résidentiel') {
    titleElement.textContent = 'Résidentiel';
  } else if (category === 'commercial') {
    titleElement.textContent = 'Commercial';
  }

  // Masquer toutes les images
  allItems.forEach(item => item.style.display = 'none');

  // Afficher seulement les images correspondant à la catégorie sélectionnée
  allItems.forEach(item => {
    const imgAlt = item.querySelector('img').alt.toLowerCase();
    if ((category === 'résidentiel' && imgAlt.includes('residential')) ||
      (category === 'commercial' && imgAlt.includes('commercial'))) {
      item.style.display = 'inline-block';
    }
  });

  // Appliquer les animations de background
  container.classList.remove('split-left', 'split-right'); // Enlève les classes précédentes
  container.classList.add(category === 'résidentiel' ? 'split-left' : 'split-right');
  lastDirection = container.classList.contains('split-left') ? 'split-left' : 'split-right';

  // Attendre que l'animation se termine avant d'effectuer d'autres actions
  setTimeout(() => {
    container.remove();
  }, 2500); // Correspond à la durée de la transition (2.5s)
}

function resetBackground() {
  // Supprimer les éléments existants pour les recréer
  const existingBackgroundContainer = document.getElementById('background-container');
  if (existingBackgroundContainer) {
    existingBackgroundContainer.classList.add('fade-out'); // Ajouter une classe pour une transition douce
    setTimeout(() => existingBackgroundContainer.remove(), 500); // Attendre que la transition se termine avant de supprimer
  }

  // Créer le conteneur de fond avec les boutons "Résidentiel" et "Commercial"
  const backgroundContainer = document.createElement('div');
  backgroundContainer.id = 'background-container';
  backgroundContainer.style = `
        position: relative;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        background: whitesmoke;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 20%;
        transition: transform 2.5s ease;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
    `;

  const backgroundContainer2 = document.createElement('div');
  backgroundContainer2.id = 'background-container2';
  backgroundContainer2.style = 'transition: transform 2.5s ease;';

  const buttonContainer = document.createElement('div');
  buttonContainer.style = 'display: flex; gap: 150px;';

  const buttonResidentiel = document.createElement('button');
  buttonResidentiel.className = 'button pelement barrier';
  buttonResidentiel.style = 'font-size: xx-large; background: none; border: none; color: #1a1818;';
  buttonResidentiel.textContent = 'Résidentiel';

  const buttonCommercial = document.createElement('button');
  buttonCommercial.className = 'button pelement barrier';
  buttonCommercial.style = 'font-size: xx-large; background: none; border: none; color: #1a1818;';
  buttonCommercial.textContent = 'Commercial';

  // Ajouter les boutons au conteneur
  buttonContainer.appendChild(buttonResidentiel);
  buttonContainer.appendChild(buttonCommercial);
  backgroundContainer2.appendChild(buttonContainer);
  backgroundContainer.appendChild(backgroundContainer2);

  // Insérer le nouveau conteneur de fond au début du body
  document.body.insertBefore(backgroundContainer, document.body.firstChild);

  // Réappliquer les écouteurs d'événements aux nouveaux boutons
  document.querySelectorAll('.barrier').forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });

  // Réafficher toutes les images de la galerie après un court délai pour éviter l'affichage des images de la catégorie précédente
  setTimeout(() => {
    document.querySelectorAll('.carousells--item').forEach(item => item.style.display = 'inline-block');
  }, 2000); // Attendre un court moment pour permettre à la réinitialisation du fond d'avoir lieu

  // Appliquer la dernière direction au conteneur de background
  if (lastDirection) {
    backgroundContainer.classList.add(lastDirection);
    setTimeout(() => {
      backgroundContainer.classList.remove(lastDirection);
    }, 10); // Attendre un court moment avant de retirer la classe pour déclencher l'animation inverse
  }
}

// Écouteurs d'événements pour les boutons de catégorie
document.querySelectorAll('.barrier').forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// Écouteur d'événement pour le bouton "Retour"
document.getElementById('reset-background').addEventListener('click', resetBackground);