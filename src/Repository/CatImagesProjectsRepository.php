<?php

namespace App\Repository;

use App\Entity\CatImagesProjects;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CatImagesProjects>
 *
 * @method CatImagesProjects|null find($id, $lockMode = null, $lockVersion = null)
 * @method CatImagesProjects|null findOneBy(array $criteria, array $orderBy = null)
 * @method CatImagesProjects[]    findAll()
 * @method CatImagesProjects[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CatImagesProjectsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CatImagesProjects::class);
    }

    public function save(CatImagesProjects $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CatImagesProjects $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return CatImagesProjects[] Returns an array of CatImagesProjects objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CatImagesProjects
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
