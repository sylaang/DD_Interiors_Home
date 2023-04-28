<?php

namespace App\Services;

use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;



class MailService
{
	private $mailer;

	public function __construct(MailerInterface $mailerInterface)
	{
		$this->mailer = $mailerInterface;
	}

	public function sendMail($email, $message)
	{

		$email = (new Email())
			->from($email)
			->to($email)
			//->cc('cc@example.com')
			//->bcc('bcc@example.com')
			//->replyTo('fabien@example.com')
			//->priority(Email::PRIORITY_HIGH)
			->subject('Time for Symfony Mailer!')
			->text($message)
			->html($message);

		$this->mailer->send($email);
	}
}
