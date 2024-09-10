<?php

namespace App\Entity;

use App\Repository\ArchiProjectsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ArchiProjectsRepository::class)]
class ArchiProjects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    // Ajout de cascade: ['persist'] au moment ou il crée le projet,
    // il va devoir injecter les données concernants les images qu'ont auras ajoutées.
    #[ORM\OneToMany(mappedBy: 'archiprojects', targetEntity: ImagesProjects::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $imagesProjects;

    #[ORM\Column(length: 35)]
    private ?string $pays = null;

    #[ORM\OneToMany(mappedBy: 'archiprojects', targetEntity: Plans::class,orphanRemoval: true, cascade: ['persist', 'remove'])]
    private Collection $plans;

    #[ORM\Column]
    private ?float $m2 = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $designBrief = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $vision = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $transformation = null;

    #[ORM\Column(length: 255)]
    private ?string $ville = null;

    public function __construct()
    {
        $this->imagesProjects = new ArrayCollection();
        $this->plans = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, ImagesProjects>
     */
    public function getImagesProjects(): Collection
    {
        return $this->imagesProjects;
    }

    public function addImagesProjects(ImagesProjects $imagesProject): self
    {
        if (!$this->imagesProjects->contains($imagesProject)) {
            $this->imagesProjects->add($imagesProject);
            $imagesProject->setArchiprojects($this);
        }

        return $this;
    }

    public function removeImagesProjects(ImagesProjects $imagesProject): self
    {
        if ($this->imagesProjects->removeElement($imagesProject)) {
            // set the owning side to null (unless already changed)
            if ($imagesProject->getArchiprojects() === $this) {
                $imagesProject->setArchiprojects(null);
            }
        }

        return $this;
    }

    
        /**
     * @return Collection<int, Plans>
     */
    public function getPlans(): Collection
    {
        return $this->plans;
    }

    public function addPlan(Plans $plan): self
    {
        if (!$this->plans->contains($plan)) {
            $this->plans->add($plan);
            $plan->setArchiprojects($this);
        }

        return $this;
    }

    public function removePlan(Plans $plan): self
    {
        if ($this->plans->removeElement($plan)) {
            // set the owning side to null (unless already changed)
            if ($plan->getArchiprojects() === $this) {
                $plan->setArchiprojects(null);
            }
        }

        return $this;
    }

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(string $pays): self
    {
        $this->pays = $pays;

        return $this;
    }


    public function getM2(): ?float
    {
        return $this->m2;
    }

    public function setM2(float $m2): static
    {
        $this->m2 = $m2;

        return $this;
    }

    public function getDesignBrief(): ?string
    {
        return $this->designBrief;
    }

    public function setDesignBrief(string $designBrief): static
    {
        $this->designBrief = $designBrief;

        return $this;
    }

    public function getVision(): ?string
    {
        return $this->vision;
    }

    public function setVision(string $vision): static
    {
        $this->vision = $vision;

        return $this;
    }

    public function getTransformation(): ?string
    {
        return $this->transformation;
    }

    public function setTransformation(string $transformation): static
    {
        $this->transformation = $transformation;

        return $this;
    }

    public function getVille(): ?string
    {
        return $this->ville;
    }

    public function setVille(string $ville): static
    {
        $this->ville = $ville;

        return $this;
    }
}