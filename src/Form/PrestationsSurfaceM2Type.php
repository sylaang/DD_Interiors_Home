<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;

class PrestationsSurfaceM2Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('surface', IntegerType::class, [
                'label' => 'Surface (m²)',
                'attr' => ['min' => 1],
            ])
            ->add('calculate', SubmitType::class, ['label' => 'Calculer'])
            ->add('fraisdedeplacement', ChoiceType::class, [
                'label' => 'Frais de déplacement',
                'choices' => [
                    'Sur place' => 'sur place',
                    'Par téléphone' => 'par_telephone',
                ],
                'multiple' => false,
                'expanded' => true,
            ]);
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => null,
        ]);
    }
}