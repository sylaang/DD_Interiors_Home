<?php

namespace App\Controller;


use App\Entity\ArchiProjects;
use App\Repository\ArchiProjectsRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/portfolio')]
class PortfolioController extends AbstractController
{
    #[Route('/', name: 'app_portfolio_index', methods: ['GET'])]
    public function index(ArchiProjectsRepository $archiProjectsRepository): Response
    {
        return $this->render('portfolio/index.html.twig', [
            'archi_projects' => $archiProjectsRepository->findAll(),
        ]);
    }

    #[Route('/{id}', name: 'app_portfolio_show', methods: ['GET'])]
    public function show(ArchiProjects $archiProject): Response
    {
        return $this->render('portfolio/show.html.twig', [
            'archi_project' => $archiProject,
        ]);
    }
}