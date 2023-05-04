<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\EditProfileType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/profile')]
class UserController extends AbstractController
{
    #[Route('/', name: 'app_user_show', methods: ['GET'])]
    public function show(): Response
    {
        $monuser = $this->getUser();
        return $this->render('user/showprofile.html.twig', [
            'user' => $monuser,
        ]);
    }

    #[Route('/modifier', name: 'app_user_profile_edit', methods: ['GET', 'POST'])]
    public function editProfile(Request $request, UserRepository $userRepository): Response
    {
        $user = $this->getUser();
        $form = $this->createForm(EditProfileType::class, $this->getUser());
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userRepository->save($user, true);

            // $user->setUpdatedAt(new \DateTimeImmutable());

            $this->addFlash('message', 'Profil mis a jour');
            return $this->redirectToRoute('app_user_show', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/editprofile.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }
}
