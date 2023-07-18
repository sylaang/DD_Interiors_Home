<?php

namespace App\Controller;

use DateTime;
use Stripe\Stripe;
use App\Entity\Facture;
use App\Entity\Commandes;
use App\Service\CartService;
use App\Repository\FactureRepository;
use App\Repository\CommandesRepository;
use App\Repository\PrestationsRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

#[Route('/profil')]
class CommandesController extends AbstractController
{
    #[Route('/commande', name: 'app_commande')]
    public function index(CartService $cart): Response
    {        
        //1. Payer sur STRIPE
        // communiquer avec stripe

        // on a le montant du panier
        $montant=$cart->getTotalAll()*100;


        

        // clé secrete pour que stripe me reconnaisse
        $stripeSecretKey="sk_test_51NAZGKB269cJfTGvxRWik6NKOBU02IfK9ErsTz5XpAJmhQPCLomn1v2dpRwF0JrNfkO5WnhWtq9NqU0zPMrImWwP004BnOohcJ";
        Stripe::setApiKey($stripeSecretKey);
  
        // on définit le protocol de connexion http ou https
        // avec les variable global PHP de sorte de pouvoir gérer
        // tout les environnements possible

        if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on'){
            $protocol = "https://";
        } else {
            $protocol = "http://";
        }
        // on définit le nom du serveur de connexion 
        // avec les variable global PHP de sorte de pouvoir gérer
        // tout les environnements possible
        $serveur=$_SERVER['SERVER_NAME'];
        $YOUR_DOMAIN=$protocol.$serveur;

        // on lance la communication avec stripe



        $checkout_session = \Stripe\Checkout\Session::create([
            'line_items' => [[
              # Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
              'price_data' => [
                'currency' => 'eur',
                'unit_amount' => $montant,
                'product_data' => [
                  'name' => 'Paiement de votre panier'
                ],
              ],
              'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $YOUR_DOMAIN . '/profil/commande/success',
            'cancel_url' => $YOUR_DOMAIN . '/profil/commande/cancel',

        ]);
 
          
        //2. Savegarde en B.D.

        //3. Supprimer la session
  
        
        return $this->render('commandes/index.html.twig', [ 
            'id_session'=>$checkout_session->id,
        ]);
    }

    #[Route('/commande/success', name: 'app_commandes_succes')]
    public function success(FactureRepository $factureRepository, RequestStack $session,
        PrestationsRepository $prestationsRepository,CommandesRepository $commandesRepository,
        CartService $cartService, Request $request): Response
    {

        $panier = $session->getSession()->get("panier");

        // 1. On va stocké une ligne dans la table facture
        // on créé un objet facture issue de l'entité facture
        $facture = new Facture();
        // on va lui affecté un user en lui mettant l'user en cours
        $facture->setUsers($this->getUser());
        // on va lui affecté la propriété correspondant à la date en cours
        // avec un datatime
        $facture->setDatecrea(new DateTime());




        // on utilise le repo de la facture pour enregistrer
        // les repository des entity de servent qu'a lire (méthode find)
        // il y a une personnalisation du repo qui appelle l'entity manager
        // c'est la classe d'écriture de symfony
        $factureRepository->save($facture, true);




        // 2. on va stocké le panier dans la table commande
        /*    $panier=$session->getSession()->get("panier");
        // boucler sur chaque ligne du panier
        foreach ($panier as $key => $value  ){ 
            
            $commande = new Commande();
            $commande->setUsers($this->getUser());
            $commande->setprestations($prestationRepository->find($key));
            $commande->setQuantite($value);
            $commandeRepository->save($commande, true);
        }*/

        foreach ($panier as $key => $value) {
            // création d'un objet commande
            $commandes = new Commandes();
        
            // récupération de la prestation à partir du repository des prestations
            $prestation = $prestationsRepository->find($key);
            if ($prestation !== null) {
                // affectation de la propriété prestation
                $commandes->setPrestation($prestation);
        
                // affectation de la propriété quantité issue du tableau panier
                if (is_array($value)) {
                    // affectation de la propriété quantité en fonction de la clé présente dans le tableau
                    if (array_key_exists('nombrePieces', $value)) {
                        $commandes->setQuantite($value['nombrePieces']);
                    } elseif (array_key_exists('surface', $value)) {
                        $commandes->setQuantite($value['surface']);
                    }
                } else {
                    // affectation de la propriété quantité directement si $value n'est pas un tableau
                    $commandes->setQuantite($value);
                }
        
                // affectation de la propriété facture issue du de la facture créée au-dessus
                $commandes->setFactures($facture);
        
                // enregistrement de l'entité Commandes
                $commandesRepository->save($commandes, true);
            }
        }
        if (isset($value['fraisdedeplacement']) && $value['fraisdedeplacement'] === 'sur place') {
            $fraisDeDeplacement = 'sur place';
            $facture->setFraisDeDeplacement($fraisDeDeplacement);
        }



        // on utilise le repo de la facture pour enregistrer
        // les repository des entity de servent qu'a lire (méthode find)
        // il y a une personnalisation du repo qui appelle l'entity manager
        // c'est la classe d'écriture de symfony
        $factureRepository->save($facture, true);



        // on vide le panier
        $cartService->clear();

        return $this->render(
            "commandes/success.html.twig"
        );
    }

    #[Route('/commande/cancel', name: 'app_commande_cancel')]
    public function cancel(){
        dd('le paiement est KO ! ');
    }    
}
