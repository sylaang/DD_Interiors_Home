<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230614125817 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE images_projects ADD salon VARCHAR(255) NOT NULL, ADD chambre VARCHAR(255) NOT NULL, ADD salledebain VARCHAR(255) NOT NULL, ADD salleamanger VARCHAR(255) NOT NULL, CHANGE file cuisine VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE prestations ADD surface_required TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestations DROP surface_required');
        $this->addSql('ALTER TABLE images_projects ADD file VARCHAR(255) NOT NULL, DROP cuisine, DROP salon, DROP chambre, DROP salledebain, DROP salleamanger');
    }
}
