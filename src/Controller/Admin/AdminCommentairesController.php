<?php

namespace App\Controller\Admin;

use App\Entity\Commentaires;
use App\Form\CommentairesType;
use App\Repository\CommentairesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/commentaires')]
class AdminCommentairesController extends AbstractController
{
    #[Route('/', name: 'app_admin_commentaires_index', methods: ['GET'])]
    public function index(CommentairesRepository $commentairesRepository): Response
    {
        return $this->render('admin/commentaires/index.html.twig', [
            'commentaires' => $commentairesRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_commentaires_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CommentairesRepository $commentairesRepository): Response
    {
        $user = $this->getUser();
        $commentaire = new Commentaires();
        
        if ($user) {
            $commentaire->setUsers($user);
        }
        

        $form = $this->createForm(CommentairesType::class, $commentaire);
        $form->handleRequest($request);

            
            if ($form->isSubmitted() && $form->isValid()) {
                $commentaire->setCreatedAt(new \DateTimeImmutable());
                $commentairesRepository->save($commentaire, true);
                
                return $this->redirectToRoute('app_admin_commentaires_index', ['id' => $commentaire->getId()], Response::HTTP_SEE_OTHER);
            }
            
        return $this->renderForm('admin/commentaires/new.html.twig', [
            'commentaire' => $commentaire,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_commentaires_show', methods: ['GET'])]
    public function show(Commentaires $commentaire): Response
    {
        return $this->render('admin/commentaires/show.html.twig', [
            'commentaire' => $commentaire,
        ]);
    }

    #[Route('/modifier/{id}', name: 'app_admin_commentaires_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Commentaires $commentaire, CommentairesRepository $commentairesRepository): Response
    {
        $form = $this->createForm(CommentairesType::class, $commentaire);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $commentairesRepository->save($commentaire, true);

            return $this->redirectToRoute('app_admin_commentaires_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/commentaires/edit.html.twig', [
            'commentaire' => $commentaire,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_commentaires_delete', methods: ['POST'])]
    public function delete(Request $request, Commentaires $commentaire, CommentairesRepository $commentairesRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$commentaire->getId(), $request->request->get('_token'))) {
            $commentairesRepository->remove($commentaire, true);
        }

        return $this->redirectToRoute('app_admin_commentaires_index', [], Response::HTTP_SEE_OTHER);
    }
}
