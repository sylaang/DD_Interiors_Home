<?php

namespace App\Controller\Admin;

use App\Entity\Plans;
use App\Entity\CatPlans;
use App\Entity\ArchiProjects;
use App\Service\ImageService;
use App\Entity\ImagesProjects;
use App\Form\ArchiProjectsType;
use Doctrine\ORM\EntityManager;
use App\Repository\CatPlansRepository;
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
    public function new(Request $request, ArchiProjectsRepository $archiProjectsRepository, CatImagesProjectsRepository $catRepository, CatPlansRepository $catplanRepository): Response
    {
        $archiProject = new ArchiProjects();
    
        // Passez les options include_residential et include_commercial ici
        $form = $this->createForm(ArchiProjectsType::class, $archiProject, [
            'include_residential' => true, // Mettez à true ou false selon le besoin
            'include_commercial' => true,  // Mettez à true ou false selon le besoin
        ]);
    
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            // Récupérer les images transmises
            $residential = $form->get('residential')->getData();
            $commercial = $form->get('commercial')->getData();
            // Assurez-vous de bien passer les options ou vérifier leur présence
            $existant = $form->has('existant') ? $form->get('existant')->getData() : [];
            $projet = $form->has('projet') ? $form->get('projet')->getData() : [];
    
            $touteslesimages = [
                'residential' => $residential,
                'commercial' => $commercial,
            ];
    
            $touteslesplans = [
                'existant' => $existant,
                'projet' => $projet,
            ];
    
            // Boucler sur les images
            foreach ($touteslesimages as $nomDeLaPiece => $imagesdunepiece) {
                $cat = $catRepository->findOneBy(['nom' => $nomDeLaPiece]);
    
                // Vérifier si la catégorie existe
                if ($cat) {
                    foreach ($imagesdunepiece as $picture) {
                        $fichier = md5(uniqid()) . '.' . $picture->guessExtension();
    
                        // Copie le fichier dans le dossier img/portfolio
                        $picture->move(
                            $this->getParameter('images_directory'),
                            $fichier
                        );
    
                        // Stocker l'image dans la BDD (son nom)
                        $img = new ImagesProjects();
                        $img->setCatImagesProjects($cat);
                        $img->setFile($fichier);
                        $archiProject->addImagesProjects($img);
                    }
                }
            }
    
            // Boucler sur les plans
            foreach ($touteslesplans as $nomDePlan => $plansdunepiece) {
                $cat = $catplanRepository->findOneBy(['nom' => $nomDePlan]);
    
                // Vérifier si la catégorie existe
                if ($cat) {
                    foreach ($plansdunepiece as $plan) {
                        $fichier = md5(uniqid()) . '.' . $plan->guessExtension();
    
                        // Copie le fichier dans le dossier plans
                        $plan->move(
                            $this->getParameter('plans_directory'),
                            $fichier
                        );
    
                        // Stocker le plan dans la BDD (son nom)
                        $planEntity = new Plans();
                        $planEntity->setCatPlans($cat);
                        $planEntity->setFile($fichier);
                        $archiProject->addPlan($planEntity);
                    }
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
        // Déterminer si les champs doivent être inclus dans le formulaire
        $hasCommercialImages = $archiProject->getImagesProjects()->exists(function ($key, $image) {
            return $image->getCatImagesProjects()->getNom() === 'commercial';
        });
    
        $hasResidentialImages = $archiProject->getImagesProjects()->exists(function ($key, $image) {
            return $image->getCatImagesProjects()->getNom() === 'residential';
        });
    
        $includeResidential = !$hasCommercialImages;
        $includeCommercial = !$hasResidentialImages;
    
        // Créer le formulaire
        $form = $this->createForm(ArchiProjectsType::class, $archiProject, [
            'include_residential' => $includeResidential,
            'include_commercial' => $includeCommercial,
        ]);
        $form->handleRequest($request);
    
        if ($form->isSubmitted() && $form->isValid()) {
            // Récupérer les fichiers transmis
            $residential = $form->has('residential') ? $form->get('residential')->getData() : [];
            $commercial = $form->has('commercial') ? $form->get('commercial')->getData() : [];
            $plans = $form->has('plans') ? $form->get('plans')->getData() : [];
    
            // Traiter les fichiers "Plans" (Plan Projet et Plan Existant)
            $planProjet = [];
            $planExistant = [];
    
            if (!empty($plans)) {
                foreach ($plans as $plan) {
                    // Exemple avec convention de nommage
                    if (strpos($plan->getClientOriginalName(), 'projet_') === 0) {
                        $planProjet[] = $plan;
                    } elseif (strpos($plan->getClientOriginalName(), 'existant_') === 0) {
                        $planExistant[] = $plan;
                    }
                }
            }
    
            // Appeler la méthode du service pour éditer les images du projet
            $imageService->editProjectImages($archiProject, $residential, $commercial, $planProjet, $planExistant, $catRepository);
    
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
    public function delete(Request $request, ArchiProjects $archiProject, ArchiProjectsRepository $archiProjectsRepository, ImageService $imageService): Response
    {
        if ($this->isCsrfTokenValid('delete' . $archiProject->getId(), $request->request->get('_token'))) {
            // Suppression des images associées
            foreach ($archiProject->getImagesProjects() as $image) {
                $imageService->deleteImage($image->getId(), null); // Aucun planId
            }

            // Suppression des plans associés
            foreach ($archiProject->getPlans() as $plan) {
                $imageService->deleteImage(null, $plan->getId()); // Aucun imageId
            }

            // Suppression du projet
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
