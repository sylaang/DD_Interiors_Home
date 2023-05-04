<?php

namespace App\Controller\Admin;


use App\Entity\User;
use App\Form\EditProfileType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/admin')]
class AdminUserController extends AbstractController
{
    #[Route('/', name: 'app_admin_index', methods: ['GET'])]
    public function index(UserRepository $userRepository): Response
    {
        return $this->render('admin/showallprofiles.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    #[Route('/profiles', name: 'app_admin_showall', methods: ['GET'])]
    public function adminShowAll(UserRepository $userRepository): Response
    {
        return $this->render('admin/showallprofiles.html.twig', [
            'users' => $userRepository->findAll(),
        ]);
    }

    #[Route('/{id}', name: 'app_admin_show', methods: ['GET'])]
    public function adminShow(User $user): Response
    {
        return $this->render('admin/showprofile.html.twig', [
            'user' => $user,
        ]);
    }

    #[Route('/modifier/{id}', name: 'app_admin_profile_edit', methods: ['GET', 'POST'])]
    public function adminEditProfile(User $user, Request $request, UserRepository $userRepository): Response
    {

        $form = $this->createForm(EditProfileType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $userRepository->save($user, true);

            // $user->setUpdatedAt(new \DateTimeImmutable());

            $this->addFlash('message', 'Profil mis a jour');
            return $this->redirectToRoute('app_admin_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user/editprofile.html.twig', [
            'user' => $user,
            'form' => $form,
        ]);
    }

    // la route qui succede à celle de la classe général : Admin/user/1
    // qui va etre interprété par l'entité directement ici le user
    // c'est le param converter qui réalise cette opération
    #[Route('/{id}', name: 'app_admin_delete', methods: ['POST'])]
    public function delete(Request $request, User $user, UserRepository $userRepository): Response
    {
        // on verifie si le token de securité est bien présent
        if ($this->isCsrfTokenValid('delete' . $user->getId(), $request->request->get('_token'))) {
            // on utilise les metode du repository pour supprimer l'enregistrement en question
            $userRepository->remove($user, true);
        }
        // on redirige vers la page des users
        return $this->redirectToRoute('app_admin_index', [], Response::HTTP_SEE_OTHER);
    }
}
