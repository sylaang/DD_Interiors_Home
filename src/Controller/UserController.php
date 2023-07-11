<?php

namespace App\Controller;

use App\Form\EditProfileType;
use App\Repository\UserRepository;
use App\Repository\FactureRepository;
use App\Repository\CommandesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/profil')]
class UserController extends AbstractController
{
    #[Route('/', name: 'app_user_profile_show', methods: ['GET'])]
    public function show(): Response
    {
        $monuser = $this->getUser();
        return $this->render('user/show.html.twig', [
            'user' => $monuser,
        ]);
    }

    #[Route('/modifier', name: 'app_user_profile_edit', methods: ['GET', 'POST'])]
    public function editProfile(Request $request, UserRepository $userRepository,): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(EditProfileType::class, $this->getUser());
        $form->handleRequest($request);

        
        if ($form->isSubmitted() && $form->isValid()) {
            $user->setUpdatedAt(new \DateTimeImmutable());
            $userRepository->save($user, true);

            $this->addFlash('message', 'Profil mis a jour');
            return $this->redirectToRoute('app_user_profile_show', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/edit.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    #[Route('/facture', name: 'app_user_profile_historique')]
    public function facture( CommandesRepository $commandeRepository, FactureRepository $factureRepository): Response
    {   
        
        $user = $this->getUser();
        $facture = $factureRepository->findBy(['users' => $this->getUser()->getId()]);
        $commande = $commandeRepository->findAll();
    
        return $this->render('user/facture.html.twig', [
            'user' => $user,
            'facture' => $facture,
            'commandes' => $commande,
           
        ]);
    }

}
