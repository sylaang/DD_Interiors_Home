<?php

namespace App\Entity;

use App\Repository\PlansRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlansRepository::class)]
class Plans
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'plans')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ArchiProjects $archiprojects = null;    

    #[ORM\ManyToOne(inversedBy: 'plans')]
    #[ORM\JoinColumn(nullable: false)]
    private ?CatPlans $catPlans = null;

    #[ORM\Column(length: 255)]
    private ?string $file = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getArchiprojects(): ?ArchiProjects   
    {
        return $this->archiprojects;
    }

    public function setArchiprojects(?ArchiProjects $archiprojects): self
    {
        $this->archiprojects = $archiprojects;

        return $this;
    }

    public function getCatPlans(): ?CatPlans
    {
        return $this->catPlans;
    }

    public function setCatPlans(?CatPlans $catPlans): self
    {
        $this->catPlans = $catPlans;

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