<?php

namespace App\Controller\Admin;

use App\Entity\Forfaits;
use App\Form\ForfaitsType;
use App\Repository\ForfaitsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin/forfaits')]
class AdminForfaitsController extends AbstractController
{
    #[Route('/', name: 'app_admin_forfaits_index', methods: ['GET'])]
    public function index(ForfaitsRepository $forfaitsRepository): Response
    {
        return $this->render('admin/forfaits/index.html.twig', [
            'forfaits' => $forfaitsRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_forfaits_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ForfaitsRepository $forfaitsRepository): Response
    {
        $forfait = new Forfaits();
        $form = $this->createForm(ForfaitsType::class, $forfait);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $forfaitsRepository->save($forfait, true);

            return $this->redirectToRoute('app_admin_forfaits_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/forfaits/new.html.twig', [
            'forfait' => $forfait,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_forfaits_show', methods: ['GET'])]
    public function show(Forfaits $forfait): Response
    {
        return $this->render('admin/forfaits/show.html.twig', [
            'forfait' => $forfait,
        ]);
    }

    #[Route('/modifier/{id}', name: 'app_admin_forfaits_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Forfaits $forfait, ForfaitsRepository $forfaitsRepository): Response
    {
        $form = $this->createForm(ForfaitsType::class, $forfait);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $forfaitsRepository->save($forfait, true);

            $this->addFlash('message', 'Forfait mis a jour');
            return $this->redirectToRoute('app_admin_forfaits_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/forfaits/edit.html.twig', [
            'forfait' => $forfait,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_forfaits_delete', methods: ['POST'])]
    public function delete(Request $request, Forfaits $forfait, ForfaitsRepository $forfaitsRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$forfait->getId(), $request->request->get('_token'))) {
            $forfaitsRepository->remove($forfait, true);
        }

        return $this->redirectToRoute('app_admin_forfaits_index', [], Response::HTTP_SEE_OTHER);
    }
}
