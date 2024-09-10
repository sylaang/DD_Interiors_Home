// Attendre que le DOM soit complètement chargé
window.onload = () => {
    // Gestion des boutons "Supprimer"
    let links = document.querySelectorAll("[data-delete]");

    // Boucle sur les liens de suppression
    for (let link of links) {
        // Ajouter un événement de clic à chaque lien
        link.addEventListener("click", function(e) {
            // Empêcher la navigation par défaut
            e.preventDefault();

            // Demander confirmation avant la suppression
            if (confirm("Ma toute belle, es-tu sûr de vouloir supprimer cette image ?")) {
                // Envoyer une requête Ajax vers le href du lien avec la méthode DELETE
                fetch(this.getAttribute("href"), {
                    method: "DELETE",
                    headers: {
                        "X-Requested-With": "XMLHttpRequest",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "_token": this.dataset.token })
                })
                .then(response => response.json()) // Récupérer la réponse en JSON
                .then(data => {
                    if (data.success) {
                        this.parentElement.remove(); // Supprimer l'élément parent si succès
                    } else {
                        alert(data.error); // Afficher une alerte en cas d'erreur
                    }
                })
                .catch(e => alert(e)); // Afficher une alerte en cas d'erreur
            }
        });
    }

    // Fonction pour afficher l'aperçu des images et PDF
    function showImagePreview(input, previewContainer) {
        // Vider le conteneur de prévisualisation avant d'ajouter de nouvelles images
        previewContainer.innerHTML = '';

        // Boucle sur chaque fichier sélectionné
        Array.from(input.files).forEach(file => {
            const reader = new FileReader();

            // Vérification si le fichier est une image ou un PDF
            if (file.type.startsWith('image/')) {
                // Lors du chargement du fichier image, créer un élément d'image et l'ajouter au conteneur de prévisualisation
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '100px';
                    img.style.height = '100px';
                    img.style.objectFit = 'cover';
                    img.classList.add('border', 'rounded');
                    previewContainer.appendChild(img);
                };
                reader.readAsDataURL(file);
            } else if (file.type === 'application/pdf') {
                // Utilisation de pdf.js pour afficher les aperçus PDF
                reader.onload = function(e) {
                    const loadingTask = pdfjsLib.getDocument(e.target.result);
                    loadingTask.promise.then(pdf => {
                        // Récupération de la première page du PDF
                        pdf.getPage(1).then(page => {
                            const scale = 0.5;
                            const viewport = page.getViewport({ scale: scale });
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;

                            // Rendu de la page sur le canvas
                            const renderContext = {
                                canvasContext: context,
                                viewport: viewport,
                            };

                            page.render(renderContext).promise.then(() => {
                                const img = document.createElement('img');
                                img.src = canvas.toDataURL(); // Conversion du canvas en image
                                img.style.width = '100px';
                                img.style.height = '100px';
                                img.style.objectFit = 'cover';
                                img.classList.add('border', 'rounded');
                                previewContainer.appendChild(img);
                            });
                        });
                    }).catch(error => {
                        console.error('Erreur lors du rendu du PDF :', error);
                    });
                };
                reader.readAsArrayBuffer(file);
            }
        });
    }

    // Application des fonctions de prévisualisation sur les champs de formulaire
    document.getElementById('planProjet').addEventListener('change', function() {
        showImagePreview(this, document.getElementById('planProjetPreview'));
    });

    document.getElementById('planExistant').addEventListener('change', function() {
        showImagePreview(this, document.getElementById('planExistantPreview'));
    });
};
