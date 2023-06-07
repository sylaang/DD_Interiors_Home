<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230606140348 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE cat_images_projects (id INT AUTO_INCREMENT NOT NULL, images_id INT NOT NULL, nom VARCHAR(255) NOT NULL, INDEX IDX_63272080D44F05E5 (images_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE cat_images_projects ADD CONSTRAINT FK_63272080D44F05E5 FOREIGN KEY (images_id) REFERENCES images_projects (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cat_images_projects DROP FOREIGN KEY FK_63272080D44F05E5');
        $this->addSql('DROP TABLE cat_images_projects');
    }
}
