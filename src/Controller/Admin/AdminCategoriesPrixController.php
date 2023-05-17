<?php

namespace App\Controller\Admin;

use App\Entity\CategoriesPrix;
use App\Form\CategoriesPrixType;
use App\Repository\CategoriesPrixRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/categories/prix')]
class AdminCategoriesPrixController extends AbstractController
{
    #[Route('/', name: 'app_admin_categories_prix_index', methods: ['GET'])]
    public function index(CategoriesPrixRepository $categoriesPrixRepository): Response
    {
        return $this->render('admin/categories_prix/index.html.twig', [
            'categories_prixes' => $categoriesPrixRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_categories_prix_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CategoriesPrixRepository $categoriesPrixRepository): Response
    {
        $categoriesPrix = new CategoriesPrix();
        $form = $this->createForm(CategoriesPrixType::class, $categoriesPrix);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $categoriesPrixRepository->save($categoriesPrix, true);

            return $this->redirectToRoute('app_admin_categories_prix_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/categories_prix/new.html.twig', [
            'categories_prix' => $categoriesPrix,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_categories_prix_show', methods: ['GET'])]
    public function show(CategoriesPrix $categoriesPrix): Response
    {
        return $this->render('admin/categories_prix/show.html.twig', [
            'categories_prix' => $categoriesPrix,
        ]);
    }

    #[Route('/modifier/{id}', name: 'app_admin_categories_prix_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, CategoriesPrix $categoriesPrix, CategoriesPrixRepository $categoriesPrixRepository): Response
    {
        $form = $this->createForm(CategoriesPrixType::class, $categoriesPrix);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $categoriesPrixRepository->save($categoriesPrix, true);

            return $this->redirectToRoute('app_admin_categories_prix_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/categories_prix/edit.html.twig', [
            'categories_prix' => $categoriesPrix,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_categories_prix_delete', methods: ['POST'])]
    public function delete(Request $request, CategoriesPrix $categoriesPrix, CategoriesPrixRepository $categoriesPrixRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$categoriesPrix->getId(), $request->request->get('_token'))) {
            $categoriesPrixRepository->remove($categoriesPrix, true);
        }

        return $this->redirectToRoute('app_admin_categories_prix_index', [], Response::HTTP_SEE_OTHER);
    }
}
