<?php

namespace App\Entity;

use App\Repository\CatImagesProjectsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CatImagesProjectsRepository::class)]
class CatImagesProjects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\OneToMany(mappedBy: 'catImagesProjects', targetEntity: ImagesProjects::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $imagesProjects;

    public function __construct()
    {
        $this->imagesProjects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    /**
     * @return Collection<int, ImagesProjects>
     */
    public function getImagesProjects(): Collection
    {
        return $this->imagesProjects;
    }

    public function addImagesProjects(ImagesProjects $imageProject): self
    {
        if (!$this->imagesProjects->contains($imageProject)) {
            $this->imagesProjects->add($imageProject);
            $imageProject->setCatImagesProjects($this);
        }

        return $this;
    }

    public function removeImagesProjects(ImagesProjects $imageProject): self
    {
        if ($this->imagesProjects->removeElement($imageProject)) {
            // set the owning side to null (unless already changed)
            if ($imageProject->getCatImagesProjects() === $this) {
                $imageProject->setCatImagesProjects(null);
            }
        }

        return $this;
    }
}