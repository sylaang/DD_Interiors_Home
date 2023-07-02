<?php

namespace App\Service;

use App\Repository\PrestationsRepository;
use Symfony\Component\HttpFoundation\RequestStack;




class CartService
{
    private $session;
    private $PrestationsRepository;

    public function __construct(RequestStack $requestStack, PrestationsRepository $PrestationsRepository)
    {
        $this->session = $requestStack;
        $this->PrestationsRepository = $PrestationsRepository;
    }

    public function add($id, $surface = null, $nombrePieces = null, $fraisdedeplacement)
    {
        $panier = $this->session->getSession()->get("panier", []);
        
        if ($nombrePieces !== null && $fraisdedeplacement === 'sur place') {
            $panier[$id] = [
                'nombrePieces' => $nombrePieces,
                'fraisdedeplacement' => 'sur place'
            ];
        } elseif ($nombrePieces !== null && $fraisdedeplacement === 'par_telephone') {
            $panier[$id] = [
                'nombrePieces' => $nombrePieces,
                'fraisdedeplacement' => 'par_telephone'
            ];
        } elseif ($surface !== null && $fraisdedeplacement === 'sur place') {
            $panier[$id] = [
                'surface' => $surface,
                'fraisdedeplacement' => 'sur place',
            ];
        } elseif ($surface !== null && $fraisdedeplacement === 'par_telephone') {
            $panier[$id] = [
                'surface' => $surface,
                'fraisdedeplacement' => 'par_telephone',
            ];
        } else {
            if (!isset($panier[$id])) {
                $panier[$id] = 0;
            }
            $panier[$id]++;
        }
        $this->session->getSession()->set("panier", $panier);
    }

    public function show()
    {
        $panier = $this->session->getSession()->get("panier", []);
        $panier_complet = [];

        if (!empty($panier)) {
            foreach ($panier as $key => $value) {
                $prestation_encours = $this->PrestationsRepository->find($key);
                if ($prestation_encours !== null) {
                    $fraisdedeplacement = isset($value['fraisdedeplacement']) ? $value['fraisdedeplacement'] : null;
                    if ($prestation_encours->getForfait() !== null) {
                        $nombrePieces = isset($value['nombrePieces']) ? $value['nombrePieces'] : null;

                        $prixReel = $prestation_encours->getPrixReel($nombrePieces, $fraisdedeplacement);
                        $total = $prixReel !== null ? $prixReel : 0;
                        $prestation_encours->setPrix($total);
                        
                        if ($fraisdedeplacement === 'sur place') {
                            $prixReel = $prestation_encours->getPrixReel($nombrePieces, $fraisdedeplacement);
                            $total = $prixReel !== null ? $prixReel : 0;
                            $prestation_encours->setPrix($total);
                        }
                    } elseif ($fraisdedeplacement === 'sur place') {
                        $total = $prestation_encours->getPrix() * (isset($value['surface']) ? $value['surface'] : (isset($value['nombrePieces']) ? $value['nombrePieces'] : 1)) + $prestation_encours->getFraisdedeplacement();

                        
                    } else {
                        $total = $prestation_encours->getPrix() * (($value['surface'] ?? $value['nombrePieces']) ?? 1);
                    }
                    

                    $panier_complet[] = [
                        'prestation' => $prestation_encours,
                        'quantite' => is_array($value) ? $value : 1,
                        'total' => $total,
                    ];
                }
            }
        }

        return $panier_complet;
    }

    public function getTotalAll()
    {
        $panier = $this->session->getSession()->get("panier");
        $total = 0;
        if (!empty($panier)) {
            foreach ($panier as $key => $value) {
                $prestation_encours = $this->PrestationsRepository->find($key);
                
                if ($prestation_encours !== null) {
                    $fraisdedeplacement = isset($value['fraisdedeplacement']) ? $value['fraisdedeplacement'] : 'sur place';
                    if ($prestation_encours->getForfait() !== null) {
                        $nombrePieces = isset($value['nombrePieces']) ? $value['nombrePieces'] : null;
                        
                        // Assurez-vous que $fraisdedeplacement est défini correctement
                        $fraisdedeplacement = ($fraisdedeplacement === 'par_telephone') ? 'par_telephone' : 'sur place';
                        
                        $prixReel = $prestation_encours->getPrixReel($nombrePieces, $fraisdedeplacement);
                        $subTotal = $prixReel !== null ? $prixReel : 0;
                    } elseif ($fraisdedeplacement === 'sur place') {
                        $subTotal = $prestation_encours->getPrix() * (isset($value['surface']) ? $value['surface'] : (isset($value['nombrePieces']) ? $value['nombrePieces'] : 1)) + $prestation_encours->getFraisdedeplacement();
                    } else {
                        $subTotal = $prestation_encours->getPrix() * (($value['surface'] ?? $value['nombrePieces']) ?? 1);
                    }
                    
                    $total += $subTotal;
                }
            }
        }

        return $total;
    }

    public function clear()
    {
        // remove pour vider la session
        $this->session->getSession()->remove("panier");
    }


    public function remove($id)
    {
        // on recupere le panier
        $panier = $this->session->getSession()->get("panier");
        // on baisse la quantité à -1
        if ($panier[$id] < 1) {

            return;
        }
        $panier[$id]--;
        // on modifie la variable panier en session
        $this->session->getSession()->set("panier", $panier);
    }

    public function remove_all($id)
    {
        // on recupere le panier
        $panier = $this->session->getSession()->get("panier");
        // on supprimer la clé du panier
        unset($panier[$id]);
        // on modifie la variable panier en session
        $this->session->getSession()->set("panier", $panier);
    }

    public function getFraisDeDeplacementAmount(): ?string
    {
        $panier = $this->session->getSession()->get("panier", []);
        $fraisdedeplacement = null;


        foreach ($panier as $key => $value) {
            $prestation_encours = $this->PrestationsRepository->find($key);

            if ($prestation_encours !== null) {
                $fraisdedeplacement = isset($value['fraisdedeplacement']) ? $value['fraisdedeplacement'] : 'sur place';
            }
        }

        return $fraisdedeplacement;
    }
}
