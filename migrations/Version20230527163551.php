<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230527163551 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE images_project (id INT AUTO_INCREMENT NOT NULL, archiproject_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, INDEX IDX_B0CECE8C640E9935 (archiproject_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE images_project ADD CONSTRAINT FK_B0CECE8C640E9935 FOREIGN KEY (archiproject_id) REFERENCES archi_project (id)');
        $this->addSql('ALTER TABLE archi_project DROP imagename');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE images_project DROP FOREIGN KEY FK_B0CECE8C640E9935');
        $this->addSql('DROP TABLE images_project');
        $this->addSql('ALTER TABLE archi_project ADD imagename VARCHAR(255) NOT NULL');
    }
}
