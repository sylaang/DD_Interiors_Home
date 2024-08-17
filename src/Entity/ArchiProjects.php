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

    #[ORM\OneToMany(mappedBy: 'archiprojects', targetEntity: Plans::class, cascade: ['persist', 'remove'])]
    private Collection $plans;

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

    public function getPays(): ?string
    {
        return $this->pays;
    }

    public function setPays(string $pays): self
    {
        $this->pays = $pays;

        return $this;
    }

    public function getPlans(): Collection
    {
        return $this->plans;
    }

    public function addPlan(Plans $plan): self
    {
        if (!$this->plans->contains($plan)) {
            $this->plans[] = $plan;
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
}