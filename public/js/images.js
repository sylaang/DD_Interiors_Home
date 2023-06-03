// attendre que le DOM soit bien chargé window.onload = () =>{}
window.onload = () => {
    // Gestion des boutons "Supprimer"
    let links = document.querySelectorAll("[data-delete]")

    // boucle sur links
    for(link of links){
        // boucle le clic
        link.addEventListener("click", function(e){

            // empèche la navigation
            e.preventDefault()

            // demande confirmation
            if(confirm("Ma toute belle est tu sûr de vouloir supprimer cette image ?")){

                    //envoie une requête Ajax vers le href du lien avec la méthode POST
                    fetch(this.getAttribute("href"), {
                        method: "DELETE",
                        headers: {
                            "X-Requested-With": "XMLHttpRequest",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({"_token": this.dataset.token})
                    }).then(
                        // récupère la réponse en JSON
                        Response => Response.json()
                    ).then(data => {
                        if(data.success)
                            this.parentElement.remove()
                            else
                            alerte(data.error)
                    }).catch(e => alerte(e))
            }

        })
    }
}