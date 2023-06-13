<?php

namespace App\Controller\Admin;

use App\Entity\Pays;
use App\Entity\ArchiProjects;
use App\Entity\ImagesProjects;
use App\Form\ArchiProjectsType;
use App\Repository\PaysRepository;
use App\Repository\ArchiProjectsRepository;
use App\Repository\CatImagesProjectsRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
            $cuisine = $form['cuisine']->getData();
            $salon = $form['salon']->getData();
            $chambre = $form['chambre']->getData();
            $salledebain = $form['salledebain']->getData();
            $salleamanger = $form['salleamanger']->getData();
            
            $touteslesimages = [
                'Cuisine' =>$cuisine,
                'Salon' => $salon,
                'Chambre' => $chambre,
                'Salle de bain' => $salledebain,
                'Salle a manger' => $salleamanger,

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
                    $archiProject->addImagesProject($img);
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

    #[Route('edit/{id}/', name: 'app_admin_portfolio_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, ArchiProjects $archiProject, ArchiProjectsRepository $archiProjectsRepository, CatImagesProjectsRepository $catRepository): Response
    {
        $form = $this->createForm(ArchiProjectsType::class, $archiProject);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // recuperer les images transmise
            $cuisine = $form['cuisine']->getData();
            $salon = $form['salon']->getData();
            $chambre = $form['chambre']->getData();
            $salledebain = $form['salledebain']->getData();
            $salleamanger = $form['salleamanger']->getData();
            
            $touteslesimages = [
                'Cuisine' =>$cuisine,
                'Salon' => $salon,
                'Chambre' => $chambre,
                'Salle de bain' => $salledebain,
                'Salle a manger' => $salleamanger,

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
                    $archiProject->addImagesProject($img);
                }
            }
            $archiProjectsRepository->save($archiProject, true);

            return $this->redirectToRoute('app_admin_portfolio_index', [], Response::HTTP_SEE_OTHER);
        }

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

    #[Route('/supprime/images/{id}', name: 'app_admin_portfolio_delete_images', methods: ['DELETE'])]
    public function deleteImage(Request $request, ImagesProjects $image, ArchiProjectsRepository $archiProjectsRepository, ArchiProjects $archiProject)
    {
        $data = json_decode($request->getContent(), true);

        // vérifie si le token est valide
        if ($this->isCsrfTokenValid('delete' . $image->getId(), $data['_token'])) {
            // Récupère le nom du fichier de l'image
            $nomFichier = $image->getFile();
    
            // Supprime le fichier s'il existe physiquement
            $cheminFichier = $this->getParameter('images_directory') . '/' . $nomFichier;
            if (file_exists($cheminFichier)) {
                unlink($cheminFichier);
            }
    
            // Supprime l'entrée de l'image de la base de données
            $archiProjectsRepository->save($archiProject, true);
    
            // Réponse en JSON indiquant le succès de la suppression
            return new JsonResponse(['success' => true]);
        } else {
            // Réponse en JSON indiquant une erreur de token invalide
            return new JsonResponse(['error' => 'Token invalide'], 400);
        }
    }
}
