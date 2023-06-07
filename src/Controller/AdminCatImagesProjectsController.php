<?php

namespace App\Controller;

use App\Entity\CatImagesProjects;
use App\Form\CatImagesProjectsType;
use App\Repository\CatImagesProjectsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/cat/images/projects')]
class AdminCatImagesProjectsController extends AbstractController
{
    #[Route('/', name: 'app_admin_cat_images_projects_index', methods: ['GET'])]
    public function index(CatImagesProjectsRepository $catImagesProjectsRepository): Response
    {
        return $this->render('admin_cat_images_projects/index.html.twig', [
            'cat_images_projects' => $catImagesProjectsRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_admin_cat_images_projects_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CatImagesProjectsRepository $catImagesProjectsRepository): Response
    {
        $catImagesProject = new CatImagesProjects();
        $form = $this->createForm(CatImagesProjectsType::class, $catImagesProject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $catImagesProjectsRepository->save($catImagesProject, true);

            return $this->redirectToRoute('app_admin_cat_images_projects_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin_cat_images_projects/new.html.twig', [
            'cat_images_project' => $catImagesProject,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_cat_images_projects_show', methods: ['GET'])]
    public function show(CatImagesProjects $catImagesProject): Response
    {
        return $this->render('admin_cat_images_projects/show.html.twig', [
            'cat_images_project' => $catImagesProject,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_admin_cat_images_projects_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, CatImagesProjects $catImagesProject, CatImagesProjectsRepository $catImagesProjectsRepository): Response
    {
        $form = $this->createForm(CatImagesProjectsType::class, $catImagesProject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $catImagesProjectsRepository->save($catImagesProject, true);

            return $this->redirectToRoute('app_admin_cat_images_projects_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin_cat_images_projects/edit.html.twig', [
            'cat_images_project' => $catImagesProject,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_cat_images_projects_delete', methods: ['POST'])]
    public function delete(Request $request, CatImagesProjects $catImagesProject, CatImagesProjectsRepository $catImagesProjectsRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$catImagesProject->getId(), $request->request->get('_token'))) {
            $catImagesProjectsRepository->remove($catImagesProject, true);
        }

        return $this->redirectToRoute('app_admin_cat_images_projects_index', [], Response::HTTP_SEE_OTHER);
    }
}
