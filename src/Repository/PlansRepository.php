<?php

namespace App\Repository;

use App\Entity\Plans;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Plans>
 *
 * @method Plans|null find($id, $lockMode = null, $lockVersion = null)
 * @method Plans|null findOneBy(array $criteria, array $orderBy = null)
 * @method Plans[]    findAll()
 * @method Plans[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlansRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Plans::class);
    }

    public function save(Plans $plan, bool $flush = false): void
    {
        $this->getEntityManager()->persist($plan);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Plans $plan, bool $flush = false): void
    {
        $this->getEntityManager()->remove($plan);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    // Exemple d'une méthode personnalisée
    /**
     * @return Plans[] Returns an array of Plans objects
     */
    public function findByProjectId(int $projectId): array
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.archiProject = :projectId')
            ->setParameter('projectId', $projectId)
            ->orderBy('p.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
}
