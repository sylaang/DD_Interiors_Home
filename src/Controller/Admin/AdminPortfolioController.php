<?php

namespace App\Controller\Admin;

use App\Entity\Plans;
use App\Entity\ArchiProjects;
use App\Service\ImageService;
use App\Entity\ImagesProjects;
use App\Form\ArchiProjectsType;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ArchiProjectsRepository;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Repository\CatImagesProjectsRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

#[Route('/admin/portfolio')]
class AdminPortfolioController extends AbstractController
{
    #[Route('/', name: 'app_admin_portfolio_index', methods: ['GET'])]
    public function index(ArchiProjectsRepository $archiProjectsRepository): Response
    {

        return $this->render('admin/portfolio/index.html.twig', [
            'archi_projects' => $archiProjectsRepository->findAll(),



        ]);
    }

    #[Route('/new', name: 'app_admin_portfolio_new', methods: ['GET', 'POST'])]
    public function new(Request $request, ArchiProjectsRepository $archiProjectsRepository, CatImagesProjectsRepository $catRepository): Response
    {
        $archiProject = new ArchiProjects();        
        $form = $this->createForm(ArchiProjectsType::class, $archiProject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // recuperer les images transmise
            $residential = $form['residential']->getData();
            $commercial = $form['commercial']->getData();


            $touteslesimages = [
                'residential' => $residential,
                'commercial' => $commercial,

            ];

            //boucler sur les images
            foreach ($touteslesimages as $nomDeLaPiece => $imagesdunepiece) {
                $cat = $catRepository->findOneBy(['nom' => $nomDeLaPiece]);

                // génère un nouveau nom de fichier
                foreach ($imagesdunepiece as $picture) {

                    $fichier = md5(uniqid()) . '.' . $picture->guessExtension();


                    // copie le fichier dans le dossier img/portfolio
                    $picture->move(
                        $this->getParameter('images_directory'),
                        $fichier,
                    );
                    //stoker l'image dans la BDD (son nom)
                    $img = new ImagesProjects();
                    $img->setCatImagesProjects($cat);
                    $img->setFile($fichier);
                    $archiProject->addImagesProjects($img);
                }
            }   
            if ($request->files->count() > 0) {
                // Obtient les objets UploadedFile pour les fichiers téléchargés
                $plans = $form->get('plans')->getData();

                // Traitez chaque fichier téléchargé
                foreach ($plans as $plan) {
                    // Génère un nouveau nom de fichier unique
                    $fileName = md5(uniqid()) . '.' . $plan->guessExtension();

                    // Déplace le fichier téléchargé vers le dossier de destination
                    $plan->move(
                        $this->getParameter('plans_directory'),
                        $fileName
                    );

                    // Crée une nouvelle instance de l'entité Images et associe le fichier téléchargé
                    $img = new Plans();
                    $img->setFile($fileName);

                    // Ajoute l'image à la maison
                    $archiProject->addPlan($img);
                }
            }
            $archiProjectsRepository->save($archiProject, true);


            return $this->redirectToRoute('app_admin_portfolio_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('admin/portfolio/new.html.twig', [
            'archi_project' => $archiProject,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_admin_portfolio_show', methods: ['GET'])]
    public function show(ArchiProjects $archiProject): Response
    {

        return $this->render('admin/portfolio/show.html.twig', [
            'archi_project' => $archiProject,
        ]);
    }

    #[Route('/edit/{id}', name: 'app_admin_portfolio_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, ArchiProjects $archiProject, ArchiProjectsRepository $archiProjectsRepository, CatImagesProjectsRepository $catRepository, ImageService $imageService): Response
    {
        $form = $this->createForm(ArchiProjectsType::class, $archiProject);
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            // Récupérer les images transmises
            $residential = $form['residential']->getData();
            $commercial = $form['commercial']->getData();
            $plans = $form->get('plans')->getData();
    
            // Appeler la méthode du service pour éditer les images du projet
            $imageService->editProjectImages($archiProject, $residential, $commercial, $plans, $catRepository);
    
            // Enregistrer le projet
            $archiProjectsRepository->save($archiProject, true);
    
            // Rediriger vers la page d'index
            return $this->redirectToRoute('app_admin_portfolio_index', [], Response::HTTP_SEE_OTHER);
        }
    
        // Rendre le formulaire
        return $this->renderForm('admin/portfolio/edit.html.twig', [
            'archi_project' => $archiProject,
            'form' => $form,
        ]);
    }



    #[Route('/{id}', name: 'app_admin_portfolio_delete', methods: ['POST'])]
    public function delete(Request $request, ArchiProjects $archiProject, ArchiProjectsRepository $archiProjectsRepository): Response
    {
        if ($this->isCsrfTokenValid('delete' . $archiProject->getId(), $request->request->get('_token'))) {
            $archiProjectsRepository->remove($archiProject, true);
        }

        return $this->redirectToRoute('app_admin_portfolio_index', [], Response::HTTP_SEE_OTHER);
    }

    public function deleteImage(Request $request, ImageService $imageService): Response
    {
        $refererUrl = $request->headers->get('referer');

        // Récupérez les identifiants de l'image et du plan à supprimer à partir de la demande
        $imageId = $request->request->get('image_id');
        $planId = $request->request->get('plan_id');

        // Vérifiez si les identifiants ne sont pas vides
        if (!$imageId && !$planId) {
            throw $this->createNotFoundException('Aucun identifiant d\'image ou de plan fourni.');
        }

        // Supprimer l'image et le plan en utilisant le service ImageService
        try {
            $imageService->deleteImage($imageId, $planId);
        } catch (NotFoundHttpException $exception) {
            throw $this->createNotFoundException($exception->getMessage());
        }

        // Rediriger l'utilisateur vers une page appropriée après la suppression
        return $this->redirect($refererUrl);
    }

    public function replaceImage(Request $request, EntityManagerInterface $entityManager, ImageService $imageService): Response
    {
        $refererUrl = $request->headers->get('referer');

        $imageId = $request->request->get('image_id');
        $planId = $request->request->get('plan_id');
        $newImage = $request->files->get('new_image');
        $newPlan = $request->files->get('new_plan');

        // Appel aux méthodes du service pour remplacer l'image et le plan
        if ($imageId && $newImage) {
            $imageService->replaceImage($imageId, $newImage);
        }

        if ($planId && $newPlan) {
            $imageService->replacePlan($planId, $newPlan);
        }

        // Enregistrez les modifications dans la base de données
        $entityManager->flush();

        // Redirigez l'utilisateur vers la page précédente
        return $this->redirect($refererUrl);
    }
}