<?php

namespace App\Form;

use App\Entity\Prestations;
use App\Entity\CategoriesPrix;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Blank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;

class PrestationsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre')
            ->add('prix')
            ->add('categories_prix', EntityType::class, [
                'class' => CategoriesPrix::class,
            ])
            ->add('description')
            ->add('description2')
            ->add('forfait')
            ->add('forfait2')
            ->add('imagename', FileType::class, [
                'label' => 'Choissiez une image pour votre prestation',

                // unmapped means that this field is not associated to any entity property
                'mapped' => false,

                // make it optional so you don't have to re-upload the PDF file
                // every time you edit the Product details
                'required' => false,

                // unmapped fields can't define their validation using annotations
                // in the associated entity, so you can use the PHP constraint classes
                'constraints' => [
                    new File([
                        'maxSize' => '2000k',
                        'mimeTypesMessage' => 'Attention ne pas dépasser 2000k',
                    ])
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Prestations::class,
        ]);
    }
}
