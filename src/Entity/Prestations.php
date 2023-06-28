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

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $description2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagename = null;

    #[ORM\OneToMany(mappedBy: 'prestation', targetEntity: Commandes::class)]
    private Collection $commandes;

    public function __construct()
    {
        $this->commentaires = new ArrayCollection();
        $this->commandes = new ArrayCollection();
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

    public function getPrixReel(int $nombrePieces): ?string
    {
        $prix = $this->getForfait()->getPrix();
        $prix2 = $this->getForfait2()->getPrix();
        $prixReel = $prix;

        if (is_int($nombrePieces)) {
        if ($nombrePieces <= 2) {
            $prixReel = $prix;
        } elseif ($nombrePieces === 3) {
            $prixReel = $prix + 120;
        } elseif ($nombrePieces > 3 && $nombrePieces <= 4) {
            $prixReel = $prix2;
        } elseif ($nombrePieces > 4) {
            $prixReel = $prix2 + ($nombrePieces - 4) * 120;
        }
    }

        return $prixReel;
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

    public function getDescription2(): ?string
    {
        return $this->description2;
    }

    public function setDescription2(?string $description2): self
    {
        $this->description2 = $description2;

        return $this;
    }

    public function getImagename(): ?string
    {
        return $this->imagename;
    }

    public function setImagename(?string $imagename): self
    {
        $this->imagename = $imagename;

        return $this;
    }

    public function getCommandes(): Collection
    {
        return $this->commandes;
    }

    public function addCommande(Commandes $commande): self
    {
        if (!$this->commandes->contains($commande)) {
            $this->commandes->add($commande);
            $commande->setPrestation($this);
        }

        return $this;
    }

    public function removeCommande(Commandes $commande): self
    {
        if ($this->commandes->removeElement($commande)) {
            // set the owning side to null (unless already changed)
            if ($commande->getPrestation() === $this) {
                $commande->setPrestation(null);
            }
        }

        return $this;
    }
}
