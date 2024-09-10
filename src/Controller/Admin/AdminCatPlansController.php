<?php

namespace App\Controller\Admin;

use App\Entity\CatPlans;
use App\Form\CatPlansType;
use App\Repository\CatPlansRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/cat/plans')]
class AdminCatPlansController extends AbstractController
{
    #[Route('/', name: 'app_admin_cat_plans_index', methods: ['GET'])]
    public function index(CatPlansRepository $catPlansRepository): Response
    {
        return $this->render('admin_cat_plans/index.html.twig', [
            'cat_plans' => $catPlansRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_admin_cat_plans_new', methods: ['GET', 'POST'])]
    public function new(Request $request, CatPlansRepository $catPlansRepository): Response
    {
        $catPlan = new CatPlans();
        $form = $this->createForm(CatPlansType::class, $catPlan);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $catPlansRepository->save($catPlan, true);

            return $this->redirectToRoute('app_admin_cat_plans_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin_cat_plans/new.html.twig', [
            'cat_plan' => $catPlan,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_cat_plans_show', methods: ['GET'])]
    public function show(CatPlans $catPlan): Response
    {
        return $this->render('admin_cat_plans/show.html.twig', [
            'cat_plan' => $catPlan,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_admin_cat_plans_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, CatPlans $catPlan, CatPlansRepository $catPlansRepository): Response
    {
        $form = $this->createForm(CatPlansType::class, $catPlan);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $catPlansRepository->save($catPlan, true);

            return $this->redirectToRoute('app_admin_cat_plans_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin_cat_plans/edit.html.twig', [
            'cat_plan' => $catPlan,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_cat_plans_delete', methods: ['POST'])]
    public function delete(Request $request,CatPlans $catPlan, CatPlansRepository $catPlansRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$catPlan->getId(), $request->request->get('_token'))) {
            $catPlansRepository->remove($catPlan, true);
        }

        return $this->redirectToRoute('app_admin_cat_plans_index', [], Response::HTTP_SEE_OTHER);
    }
}
