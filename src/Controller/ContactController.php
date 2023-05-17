<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Form\ContactType;
use App\Services\MailService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ContactController extends AbstractController
{
    #[Route('/contact', name: 'app_contact')]
    public function index(Request $request, EntityManagerInterface $manager,MailService $mailService): Response
    {
        $contact = new Contact();
        $form = $this->createForm(ContactType::class, $contact);
        $form->handleRequest($request);

        if($form->isSubmitted()&&$form->isValid())
        {
            $formdata=$form->getData();

            if($this->getUser())
            {
                $contact->setNom($this->getUser()->getNom()) .
                $contact->setPrenom($this->getUser()->getPrenom())
                    ->setEmail($this->getUser()->getEmail());
            }

            $manager->persist($contact);
            $manager->flush();
            

            $email_form=$formdata['email'];
            $nom_form=$formdata['nom'];
            $prenom_form=$formdata['prenom'];
            $subject_form=$formdata['subject'];
            $message_form=$formdata['message'];

            $mailService->sendMail(
                $email_form,
                $formdata['nom'],
                $formdata['prenom'],
                $formdata['subject'],
                $formdata['message'],
            );

            $this->addFlash(
                'succes',
                'Votre demande a été envoyé avec succès !'
            );


        }


        return $this->render('contact/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}