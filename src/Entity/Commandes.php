<?php

namespace App\Entity;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CommandesRepository;

#[ORM\Entity(repositoryClass: CommandesRepository::class)]
class Commandes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'commandes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Facture $factures = null;

    #[ORM\ManyToOne(inversedBy: 'commandes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Prestations $prestation = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    private ?string $quantite = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFactures(): ?Facture
    {
        return $this->factures;
    }

    public function setFactures(?Facture $factures): self
    {
        $this->factures = $factures;

        return $this;
    }

    public function getPrestation(): ?Prestations
    {
        return $this->prestation;
    }

    public function setPrestation(?Prestations $prestation): self
    {
        $this->prestation = $prestation;

        return $this;
    }

    public function getQuantite(): ?string
    {
        return $this->quantite;
    }

    public function setQuantite(string $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }
}