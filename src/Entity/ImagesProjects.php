<?php

namespace App\Entity;

use App\Repository\ImagesProjectsRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImagesProjectsRepository::class)]
class ImagesProjects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'imagesProjects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ArchiProjects $archiprojets = null;    

    #[ORM\ManyToOne(inversedBy: 'imagesProjects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CatImagesProjects $catImagesProjects = null;

    #[ORM\Column(length: 255)]
    private ?string $file = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArchiprojets(): ?ArchiProjects
    {
        return $this->archiprojets;
    }

    public function setArchiprojets(?ArchiProjects $archiprojets): self
    {
        $this->archiprojets = $archiprojets;

        return $this;
    }

    public function getCatImagesProjects(): ?CatImagesProjects
    {
        return $this->catImagesProjects;
    }

    public function setCatImagesProjects(?CatImagesProjects $catImagesProjects): self
    {
        $this->catImagesProjects = $catImagesProjects;

        return $this;
    }

    public function getFile(): ?string
    {
        return $this->file;
    }

    public function setFile(string $file): self
    {
        $this->file = $file;

        return $this;
    }
}