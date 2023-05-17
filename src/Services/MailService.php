<?php

namespace App\Services;


use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\Mailer\MailerInterface;



class MailService
{
	private $mailer;

	public function __construct(MailerInterface $mailerInterface)
	{
		$this->mailer = $mailerInterface;
	}

	public function sendMail($contact)
	{

		$mail = "log@ddinteriorshome.com";
		$message = 'emails/contact.html.twig';

			$email = (new TemplatedEmail())
			->from($contact->getEmail())
			->to($mail)
			//->cc('cc@example.com')
			//->bcc('bcc@example.com')
			->replyTo($contact->getEmail())
			//->priority(Email::PRIORITY_HIGH)
			->subject($contact->getSubject())
            // chemin du template de la twig à la vue(view)
			->htmlTemplate('emails/contact.html.twig')
            
            // passer la variable (nom => valeur) au template
            ->context([
                'contact' => $contact,
            ]);

		$this->mailer->send($email);
	}
}
