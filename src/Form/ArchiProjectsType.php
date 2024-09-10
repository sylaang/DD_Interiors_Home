<?php

namespace App\Form;

use App\Entity\ArchiProjects;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class ArchiProjectsType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('titre', TextType::class)
            ->add('pays', TextType::class)
            ->add('ville', TextType::class)
            ->add('m2')
            ->add('description')
            ->add('designBrief')
            ->add('vision')
            ->add('transformation')
            ->add('existant', FileType::class, [
                'label' => 'existant',
                'multiple' => true,
                'required' => false,
                'mapped' => false,
            ])
            ->add('projet', FileType::class, [
                'label' => 'projet',
                'multiple' => true,
                'required' => false,
                'mapped' => false,
            ]);
            if ($options['include_residential']) {
                $builder->add('residential', FileType::class, [
                    'multiple' => true,
                    'mapped' => false,
                    'required' => false,
                ]);
            }
            
            if ($options['include_commercial']) {
                $builder->add('commercial', FileType::class, [
                    'multiple' => true,
                    'mapped' => false,
                    'required' => false,
                ]);
            }

            if (!isset($options['include_residential']) && !isset($options['include_commercial'])) {
                $builder
                    ->add('commercial', FileType::class, [
                        'multiple' => true,
                        'mapped' => false,
                        'required' => false,
                    ])
                    ->add('residential', FileType::class, [
                        'multiple' => true,
                        'mapped' => false,
                        'required' => false,
                    ]);
            }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ArchiProjects::class,
            'include_residential' => false,
            'include_commercial' => false,
            'include_plans' => false,
        ]);
    }
}
