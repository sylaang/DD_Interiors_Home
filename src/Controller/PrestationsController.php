<?php

namespace App\Controller;

use App\Entity\Prestations;
use App\Entity\Commentaires;
use App\Form\CommentairesType;
use App\Repository\PrestationsRepository;
use App\Repository\CommentairesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/prestations')]
class PrestationsController extends AbstractController
{
    #[Route('/', name: 'app_prestations_index', methods: ['GET'])]
    public function index(PrestationsRepository $prestationsRepository): Response
    {
        return $this->render('prestations/index.html.twig', [
            'prestations' => $prestationsRepository->findAll(),
        ]);
    }
    
    #[Route('/{id}', name: 'app_prestations_show', methods: ['GET', 'POST'])]
    public function show(Request $request, Prestations $prestation, CommentairesRepository $commentairesRepository): Response
    {
        $commentaire = new Commentaires();

        $form = $this->createForm(CommentairesType::class,  $commentaire);
         $form->handleRequest($request);

         $commentaireparprestation=$commentairesRepository->findBy([

            'prestation'=>$prestation
        ]);

        if ($form->isSubmitted() && $form->isValid()){

            $commentaire->setCreatedAt(new \DateTimeImmutable());
            
             // je dois enregistrer les info du user
            // $this->getUser() me renvoie les infos sur le user 
            // en cours
            // avec setuser je stock l'information dans le
            // commentaire
            $commentaire->setUsers($this->getUser());

            // je dois enregistrer les infos du produit
            // je recupere $produit issue du param converter
            // on a l'ID dans l'URL en mettant l'entité 
            // dans la fonction on recupere le produit correspondant
            // et ensuite on set dans l'entité commentaire
            $commentaire->setPrestation($prestation);

            $commentairesRepository->save( $commentaire , true);
            return $this->redirectToRoute('app_prestations_show', ['id' => $prestation->getId()], Response::HTTP_SEE_OTHER);

        }
                // on veut afficher les commentaires 
        // correspondant aux produit de l'id de l'url.
        // on utilise le repository qui va chercher avec un critere findby
        // selon le produits 
        // $toutlescommenaire=$commentaireRepository->findAll();
      
         //cascade = CascadeType.ALL
        // $produit correspond à l'entité produit de l'identifiant envoyé
        // en parametre
        return $this->renderForm('prestations/show.html.twig', [
            'prestation' => $prestation,
            'les_commentaires' => $commentaireparprestation,
            'form' => $form
         ]);
    }
    #[Route('/{id}', name: 'app_commentaires_delete', methods: ['POST'])]
    public function delete(Request $request, Commentaires $commentaire, CommentairesRepository $commentairesRepository): Response
    {
        
        if ($this->isCsrfTokenValid('delete'.$commentaire->getId(), $request->request->get('_token'))) {
            $commentairesRepository->remove($commentaire, true);
        }

        return $this->redirectToRoute('app_prestations_index', [], Response::HTTP_SEE_OTHER);
    }
}
