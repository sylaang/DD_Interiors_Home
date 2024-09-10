<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CatPlansRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;


#[ORM\Entity(repositoryClass: CatPlansRepository::class)]
class CatPlans

{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    #[ORM\OneToMany(mappedBy: 'catPlans', targetEntity: Plans::class, orphanRemoval: true, cascade: ['persist'])]
    private Collection $plans;

    public function __construct()
    {
        $this->plans = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

        /**
     * @return Collection<int, Plans>
     */
    public function getPlans(): Collection
    {
        return $this->plans;
    }

    public function addPlans(Plans $plan): self
    {
        if (!$this->plans->contains($plan)) {
            $this->plans->add($plan);
            $plan->setCatPlans($this);
        }

        return $this;
    }

    public function removePlans(Plans $plan    ): self
    {
        if ($this->plans->removeElement($plan)) {
            // set the owning side to null (unless already changed)
            if ($plan->getCatPlans() === $this) {
                $plan->setCatPlans(null);
            }
        }

        return $this;
    }
}
