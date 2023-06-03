<?php

namespace App\Controller\Admin;


use App\Entity\Prestations;
use App\Form\PrestationsType;
use App\Repository\PrestationsRepository;
use App\Service\FileUploader;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;




#[Route('/admin/prestations')]
class AdminPrestationsController extends AbstractController
{
    #[Route('/', name: 'app_admin_prestations_index', methods: ['GET'])]
    public function index(PrestationsRepository $prestationsRepository): Response
    {
        return $this->render('admin/prestations/index.html.twig', [
            'prestations' => $prestationsRepository->findAll(),
        ]);
    }

    #[Route('/ajout', name: 'app_admin_prestations_new', methods: ['GET', 'POST'])]
    public function new(Request $request, PrestationsRepository $prestationsRepository, FileUploader $fileUploader): Response
    {
        $prestation = new Prestations();
        $form = $this->createForm(PrestationsType::class, $prestation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
             // on recupere l'image issue du formulaire
            // "image" est le nom de notre image dans le form
            $imageprestation = $form->get('imagename')->getData();
            // dd($imageprestation);
            
            // le cas ou l'image a été posté
            if ($imageprestation) {
                // on utilise le service fileUploader
                // pour envoyé l'image dans le public/img
                $imageprestation_nom = $fileUploader->uploadPrestation($imageprestation);
                
                // envoyé dans l'entité le nom de l'image
                $prestation->setImagename($imageprestation_nom);
            }

            $prestationsRepository->save($prestation, true);

            return $this->redirectToRoute('app_admin_prestations_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/prestations/new.html.twig', [
            'prestation' => $prestation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_prestations_show', methods: ['GET'])]
    public function show(Prestations $prestation): Response
    {
        
        return $this->render('admin/prestations/show.html.twig', [
            'prestation' => $prestation,
        ]);
    }

    #[Route('/modifier/{id}', name: 'app_admin_prestations_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Prestations $prestation, PrestationsRepository $prestationsRepository, FileUploader $fileUploader): Response
    {
        $form = $this->createForm(PrestationsType::class, $prestation);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $imageprestation = $form->get('imagename')->getData();
            // dd($imageprestation);
            
            // le cas ou l'image a été posté
            if ($imageprestation) {
                // on utilise le service fileUploader
                // pour envoyé l'image dans le public/img
                $imageprestation_nom = $fileUploader->uploadPrestation($imageprestation);
                
                // envoyé dans l'entité le nom de l'image
                $prestation->setImagename($imageprestation_nom);
            }

            $prestationsRepository->save($prestation, true);

            $this->addFlash('message', 'Prestation mis a jour');
            return $this->redirectToRoute('app_admin_prestations_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/prestations/edit.html.twig', [
            'prestation' => $prestation,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_prestations_delete', methods: ['POST'])]
    public function delete(Request $request, Prestations $prestation, PrestationsRepository $prestationsRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$prestation->getId(), $request->request->get('_token'))) {
            $prestationsRepository->remove($prestation, true);
        }

        return $this->redirectToRoute('app_admin_prestations_index', [], Response::HTTP_SEE_OTHER);
    }
}
