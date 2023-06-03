<?php

namespace App\Entity;

use App\Repository\ImagesProjectsRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ImagesProjectsRepository::class)]
class ImagesProjects
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $cuisine = null;

    #[ORM\Column(length: 255)]
    private ?string $salon = null;

    #[ORM\Column(length: 255)]
    private ?string $chambre = null;

    #[ORM\Column(length: 255)]
    private ?string $salledebain = null;

    #[ORM\Column(length: 255)]
    private ?string $salleamanger = null;

    #[ORM\ManyToOne(inversedBy: 'imagesProjects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ArchiProjects $archiprojets = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCuisine(): ?string
    {
        return $this->cuisine;
    }

    public function setCuisine(string $cuisine): self
    {
        $this->cuisine = $cuisine;

        return $this;
    }

    public function getSalon(): ?string
    {
        return $this->salon;
    }

    public function setSalon(string $salon): self
    {
        $this->salon = $salon;

        return $this;
    }

    public function getChambre(): ?string
    {
        return $this->chambre;
    }

    public function setChambre(string $chambre): self
    {
        $this->chambre = $chambre;

        return $this;
    }

    public function getSalledebain(): ?string
    {
        return $this->salledebain;
    }

    public function setSalledebain(string $salledebain): self
    {
        $this->salledebain = $salledebain;

        return $this;
    }

    public function getSalleamanger(): ?string
    {
        return $this->salleamanger;
    }

    public function setSalleamanger(string $salleamanger): self
    {
        $this->salleamanger = $salleamanger;

        return $this;
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
}
