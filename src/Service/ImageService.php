<?php

namespace App\Service;

use App\Entity\Plans;
use App\Entity\ArchiProjects;
use App\Entity\ImagesProjects;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Filesystem\Filesystem;
use App\Repository\CatImagesProjectsRepository;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class ImageService
{
    private $entityManager;
    private $filesystem;
    private $imagesDirectory;
    private $plansDirectory;

    public function __construct(EntityManagerInterface $entityManager, Filesystem $filesystem, string $imagesDirectory, string $plansDirectory)
    {
        $this->entityManager = $entityManager;
        $this->filesystem = $filesystem;
        $this->imagesDirectory = $imagesDirectory;
        $this->plansDirectory = $plansDirectory;
    }

    public function replaceImage($imageId, $newImage)
    {
        $image = $this->entityManager->getRepository(ImagesProjects::class)->find($imageId);
        if (!$image) {
            throw new \InvalidArgumentException('L\'image à remplacer n\'existe pas.');
        }

        // Supprimez l'ancienne image du système de fichiers
        $oldImagePath = $this->imagesDirectory . '/' . $image->getFile();
        if ($this->filesystem->exists($oldImagePath)) {
            $this->filesystem->remove($oldImagePath);
        }

        // Générez un nouveau nom de fichier unique pour la nouvelle image
        $newFileName = md5(uniqid()) . '.' . $newImage->guessExtension();

        // Déplacez la nouvelle image vers le dossier de destination
        $newImage->move($this->imagesDirectory, $newFileName);

        // Mettez à jour le nom de fichier dans l'entité Image
        $image->setFile($newFileName);
    }

    public function replacePlan($planId, $newPlan)
    {
        $plan = $this->entityManager->getRepository(Plans::class)->find($planId);
        if (!$plan) {
            throw new \InvalidArgumentException('Le plan à remplacer n\'existe pas.');
        }

        // Supprimez l'ancien plan du système de fichiers
        $oldPlanPath = $this->plansDirectory . '/' . $plan->getFile();
        if ($this->filesystem->exists($oldPlanPath)) {
            $this->filesystem->remove($oldPlanPath);
        }

        // Générez un nouveau nom de fichier unique pour le nouveau plan
        $newFileNamePlan = md5(uniqid()) . '.' . $newPlan->guessExtension();

        // Déplacez le nouveau plan vers le dossier de destination
        $newPlan->move($this->plansDirectory, $newFileNamePlan);

        // Mettez à jour le nom de fichier dans l'entité Plan
        $plan->setFile($newFileNamePlan);
    }

    public function deleteImage($imageId, $planId)
    {
        if (!$imageId && !$planId) {
            throw new \InvalidArgumentException('Aucun identifiant d\'image ou de plan fourni.');
        }

        if ($imageId) {
            $image = $this->entityManager->getRepository(ImagesProjects::class)->find($imageId);
            if (!$image) {
                throw new NotFoundHttpException('L\'image n\'existe pas.');
            }

            $this->entityManager->remove($image);

            $imagePath = $this->imagesDirectory . '/' . $image->getFile();
            if ($this->filesystem->exists($imagePath)) {
                $this->filesystem->remove($imagePath);
            }
        }

        if ($planId) {
            $plan = $this->entityManager->getRepository(Plans::class)->find($planId);
            if (!$plan) {
                throw new NotFoundHttpException('Le plan n\'existe pas.');
            }

            $this->entityManager->remove($plan);

            $planPath = $this->plansDirectory . '/' . $plan->getFile();
            if ($this->filesystem->exists($planPath)) {
                $this->filesystem->remove($planPath);
            }
        }

        $this->entityManager->flush();
    }

    public function editProjectImages($archiProject, $residentialPictures, $commercialPictures, $planProjet, $planExistant, $catRepository)
    {
        // Boucler sur les images résidentielles et les ajouter à l'entité ArchiProjects
        foreach ($residentialPictures as $picture) {
            $fileName = md5(uniqid()) . '.' . $picture->guessExtension();
            $picture->move($this->imagesDirectory, $fileName);

            $img = new ImagesProjects();
            $img->setCatImagesProjects($catRepository->findOneBy(['nom' => 'residential']));
            $img->setFile($fileName);
            $archiProject->addImagesProjects($img);
        }

        // Boucler sur les images commerciales et les ajouter à l'entité ArchiProjects
        foreach ($commercialPictures as $picture) {
            $fileName = md5(uniqid()) . '.' . $picture->guessExtension();
            $picture->move($this->imagesDirectory, $fileName);

            $img = new ImagesProjects();
            $img->setCatImagesProjects($catRepository->findOneBy(['nom' => 'commercial']));
            $img->setFile($fileName);
            $archiProject->addImagesProjects($img);
        }

        // Traiter les plans et les ajouter à l'entité ArchiProjects
        foreach ($planProjet as $plan) {
            $fileName = md5(uniqid()) . '.' . $plan->guessExtension();
            $plan->move($this->plansDirectory, $fileName);

            $img = new Plans();
            $img->setFile($fileName);
            $archiProject->addPlan($img);
        }

        foreach ($planExistant as $plan) {
            $fileName = md5(uniqid()) . '.' . $plan->guessExtension();
            $plan->move($this->plansDirectory, $fileName);

            $img = new Plans();
            $img->setFile($fileName);
            $archiProject->addPlan($img);
        }
    }

    
}