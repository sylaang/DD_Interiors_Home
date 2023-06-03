<?php

namespace App\Controller\Admin;

use App\Entity\Pays;
use App\Entity\ArchiProjects;
use App\Entity\ImagesProjects;
use App\Form\ArchiProjectsType;
use App\Repository\PaysRepository;
use App\Repository\ArchiProjectsRepository;
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
    public function new(Request $request, ArchiProjectsRepository $archiProjectsRepository): Response
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
            
            $images = [
                $cuisine,
                $salon,
                $chambre,
                $salledebain,
                $salleamanger,

            ];
            
            //boucler sur les images
            foreach ($images as $image) {
                // génère un nouveau nom de fichier
                foreach ($image as $cuisine) {

                    $fichier = md5(uniqid()) . '' . $cuisine->guessExtension();
                

                    // copie le fichier dans le dossier img/portfolio
                    $cuisine->move(
                        $this->getParameter('images_directory'),
                        $fichier,
                    );
                }
                //stoker l'image dans la BDD (son nom)
                $img = new ImagesProjects();
                $img->setCuisine($fichier);
                $img->setSalon($fichier);
                $img->setChambre($fichier);
                $img->setSalledebain($fichier);
                $img->setSalleamanger($fichier);
                $archiProject->addImagesProject($img);
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
    public function edit(Request $request, ArchiProjects $archiProject, ArchiProjectsRepository $archiProjectsRepository): Response
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

            $images = [
                $cuisine,
                $salon,
                $chambre,
                $salledebain,
                $salleamanger,

            ];
            
            //boucler sur les images
            foreach ($images as $image) {
                // génère un nouveau nom de fichier
                foreach ($image as $picture) {

                    $fichier = md5(uniqid()) . '' . $picture->guessExtension();
                

                    // copie le fichier dans le dossier img/portfolio
                    $picture->move(
                        $this->getParameter('images_directory'),
                        $fichier
                    );
                }
                //stoker l'image dans la BDD (son nom)
                $img = new ImagesProjects();
                $img->setCuisine($fichier);
                $img->setSalon($fichier);
                $img->setChambre($fichier);
                $img->setSalledebain($fichier);
                $img->setSalleamanger($fichier);
                $archiProject->addImagesProject($img);
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
    public function deleteImage(Request $request, ImagesProjects $image)
    {
        $data = json_decode($request->getContent(), true);

        // vérifie si le token est valide
        if ($this->isCsrfTokenValid('delete' . $image->getId(), $data['_token'])){
            // récupère le nom de l'image
            $nom = $image->getCuisine();
            $nom = $image->getSalon();
            $nom = $image->getChambre();
            $nom = $image->getSalledebain();
            $nom = $image->getSalleamanger();
            // supprime le fichier
            unlink($this->getParameter('images_directory').'/'.$nom);

            // supprime l'entrée de la base
            $em=$this->getDoctrine()->getManager();
            $em->remove($image);
            $em->flush();

            // réponse en json
            return new JsonResponse(['success' => 1]);
        } else {
            return new JsonResponse(['serror' => 'Token Invalide'], 400);
        }

    }
}
