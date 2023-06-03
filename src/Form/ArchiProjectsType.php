<?php

namespace App\Form;

use App\Entity\ArchiProjects;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class ArchiProjectsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre')
            ->add('pays')
            ->add('description')
            // Ajoute le champ "images" dans le formulaire
            ->add('cuisine', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                //il ne sera pas lié à la base de données donc : ('mapped': false )
                'mapped' => false,
                'required' => false

            ])
            ->add('salon', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                //il ne sera pas lié à la base de données donc : ('mapped': false )
                'mapped' => false,
                'required' => false

            ])
            ->add('chambre', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                //il ne sera pas lié à la base de données donc : ('mapped': false )
                'mapped' => false,
                'required' => false

            ])
            ->add('salledebain', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                //il ne sera pas lié à la base de données donc : ('mapped': false )
                'mapped' => false,
                'required' => false

            ])
            ->add('salleamanger', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                //il ne sera pas lié à la base de données donc : ('mapped': false )
                'mapped' => false,
                'required' => false

            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ArchiProjects::class,
        ]);
    }
}
