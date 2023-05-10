<?php

namespace App\Entity;

use App\Repository\PrestationsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PrestationsRepository::class)]
class Prestations
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $titre = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 7, scale: 2, nullable: true)]
    private ?string $prix = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Forfaits $forfait = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    private ?Forfaits $forfait2 = null;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Commentaires::class)]
    private Collection $commentaires;

    #[ORM\ManyToOne(inversedBy: 'prestation')]
    private ?CategoriesPrix $categoriesPrix = null;

    public function __construct()
    {
        $this->commentaires = new ArrayCollection();
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

    public function getPrix(): ?string
    {
        return $this->prix;
    }

    public function setPrix(?string $prix): self
    {
        $this->prix = $prix;

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

    public function getForfait(): ?Forfaits
    {
        return $this->forfait;
    }

    public function setForfait(?Forfaits $forfait): self
    {
        $this->forfait = $forfait;

        return $this;
    }

    public function getForfait2(): ?Forfaits
    {
        return $this->forfait2;
    }

    public function setForfait2(?Forfaits $forfait2): self
    {
        $this->forfait2 = $forfait2;

        return $this;
    }

    /**
     * @return Collection<int, Commentaires>
     */
    public function getCommentaires(): Collection
    {
        return $this->commentaires;
    }

    public function __toString()
    {
        return $this->titre;
    }

    public function addCommentaire(Commentaires $commentaire): self
    {
        if (!$this->commentaires->contains($commentaire)) {
            $this->commentaires->add($commentaire);
            $commentaire->setPrestation($this);
        }

        return $this;
    }

    public function removeCommentaire(Commentaires $commentaire): self
    {
        if ($this->commentaires->removeElement($commentaire)) {
            // set the owning side to null (unless already changed)
            if ($commentaire->getPrestation() === $this) {
                $commentaire->setPrestation(null);
            }
        }

        return $this;
    }

    public function getCategoriesPrix(): ?CategoriesPrix
    {
        return $this->categoriesPrix;
    }

    public function setCategoriesPrix(?CategoriesPrix $categoriesPrix): self
    {
        $this->categoriesPrix = $categoriesPrix;

        return $this;
    }
}
