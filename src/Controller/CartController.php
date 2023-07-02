<?php

namespace App\Controller;


use App\Service\CartService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/cart')]
class CartController extends AbstractController
{
    private $cartService;

    public function __construct(CartService $cartService) 
    {
        $this->cartService = $cartService;
    }

    #[Route('/add/{id}', name: 'app_cart_add')]
    public function add($id, Request $request): Response
    {
        $surface = $request->query->get('surface');
        $nombrePieces = $request->query->get('nombrePieces');
        $fraisdedeplacement = $request->query->get('fraisdedeplacement');
        if ($fraisdedeplacement === 'sur place') {
            $this->cartService->add($id, $surface, $nombrePieces, 'sur place');
        } elseif ($fraisdedeplacement === 'par_telephone') {
            $this->cartService->add($id, $surface, $nombrePieces, 'par_telephone');
        }
        
        // Redirection vers la page des prestations
        return $this->redirectToRoute("app_cart_show", [], Response::HTTP_SEE_OTHER);
    }
    


    // page pour visualiser notre panier
    #[Route('/show', name: 'app_cart_show')]
    public function show(): Response
    {
        
        return $this->render('cart/index.html.twig', [
            'panier' => $this->cartService->show(),
            'totalcomplet'=> $this->cartService->getTotalAll(),
        ]);
    }

    // page pour vider notre panier
    #[Route('/clear', name: 'app_cart_clear')]
    public function clear(): Response
    {
        $this->cartService->clear();
        
        // redirection vers la page des prestationss
        return $this->redirectToRoute("app_prestations_index",[], Response::HTTP_SEE_OTHER);

    }

       // page pour vider notre panier
       #[Route('/remove/{id}', name: 'app_cart_remove')]
       public function remove_all($id): Response
       {
            // supprimer la clé du tableau (le prestations)
           $this->cartService->remove_all($id);
           
           // redirection vers la page des prestationss
           return $this->redirectToRoute("app_cart_show",[], Response::HTTP_SEE_OTHER);
   
       }


    // // page pour vider notre panier
    #[Route('/removequantite/{id}', name: 'app_cart_removequantite')]
    public function removequantite($id): Response
    {
        // supprimer la clé du tableau (le prestations)
        $this->cartService->remove($id);
        
        // redirection vers la page des prestationss
        return $this->redirectToRoute("app_cart_show",[], Response::HTTP_SEE_OTHER);

    }
}