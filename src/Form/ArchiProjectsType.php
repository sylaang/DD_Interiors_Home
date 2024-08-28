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
            ->add('ville')
            ->add('m2')
            ->add('description')
            ->add('designBrief')
            ->add('vision')
            ->add('transformation')
            
            ->add('residential', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                'mapped' => false,
                'required' => false
                
            ])
            ->add('commercial', FileType::class, [
                // ajout de 'plusieur' images
                'multiple' => true,
                'mapped' => false,
                'required' => false

            ])
            ->add('plans', FileType::class, [
                'label' => 'Plans',
                'multiple' => true,
                'required' => false,
                'mapped' => false,
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
