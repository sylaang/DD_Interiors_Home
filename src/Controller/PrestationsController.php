<?php

namespace App\Controller;


use App\Entity\Prestations;
use App\Form\PrestationsType;
use App\Repository\PrestationsRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/profile/prestations')]
class PrestationsController extends AbstractController
{
    #[Route('/', name: 'app_profile_prestations_index', methods: ['GET'])]
    public function index(PrestationsRepository $prestationsRepository): Response
    {
        return $this->render('profile/prestations/index.html.twig', [
            'prestations' => $prestationsRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_profile_prestations_new', methods: ['GET', 'POST'])]
    public function new(Request $request, PrestationsRepository $prestationsRepository): Response
    {
        $prestation = new Prestations();
        $form = $this->createForm(PrestationsType::class, $prestation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $prestationsRepository->save($prestation, true);

            return $this->redirectToRoute('app_profile_prestations_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('profile/prestations/new.html.twig', [
            'prestation' => $prestation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_profile_prestations_show', methods: ['GET'])]
    public function show(Prestations $prestation): Response
    {
        
        return $this->render('profile/prestations/show.html.twig', [
            'prestation' => $prestation,
        ]);
    }

    #[Route('/edit/{id}', name: 'app_profile_prestations_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Prestations $prestation, PrestationsRepository $prestationsRepository): Response
    {
        $form = $this->createForm(ProfilesPrestationsType::class, $prestation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $prestationsRepository->save($prestation, true);

            $this->addFlash('message', 'Prestation mis a jour');
            return $this->redirectToRoute('app_profile_prestations_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('profile/prestations/edit.html.twig', [
            'prestation' => $prestation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_profile_prestations_delete', methods: ['POST'])]
    public function delete(Request $request, Prestations $prestation, PrestationsRepository $prestationsRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$prestation->getId(), $request->request->get('_token'))) {
            $prestationsRepository->remove($prestation, true);
        }

        return $this->redirectToRoute('app_profile_prestations_index', [], Response::HTTP_SEE_OTHER);
    }
}
