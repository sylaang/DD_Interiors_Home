<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230504141455 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestations ADD forfait2_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE prestations ADD CONSTRAINT FK_B338D8D1F69183C1 FOREIGN KEY (forfait2_id) REFERENCES forfaits (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B338D8D1F69183C1 ON prestations (forfait2_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestations DROP FOREIGN KEY FK_B338D8D1F69183C1');
        $this->addSql('DROP INDEX UNIQ_B338D8D1F69183C1 ON prestations');
        $this->addSql('ALTER TABLE prestations DROP forfait2_id');
    }
}
