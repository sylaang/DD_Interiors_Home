<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AboutUsController extends AbstractController
{
    #[Route('/a_propos', name: 'app_aboutUs')]
    public function index(): Response
    {
        return $this->render('aboutUs/index.html.twig', [
            'controller_name' => 'HomeController',
        ]);
    }
}