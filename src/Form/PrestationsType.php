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

                // "unmapped" signifie que ce champ n'est associé à aucune propriété de l'entité.
                'mapped' => false,

                // Rendez-le facultatif afin de ne pas avoir à réuploader le fichier PDF
                // à chaque fois que vous modifiez les détails du produit.
                'required' => false,

                // Les champs non mappés ne peuvent pas définir leur validation à l'aide d'annotations
                // dans l'entité associée, vous pouvez donc utiliser les classes de contraintes PHP.
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
