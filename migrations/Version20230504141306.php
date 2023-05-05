<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230504141306 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE forfaits (id INT AUTO_INCREMENT NOT NULL, prix NUMERIC(7, 2) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prestations (id INT AUTO_INCREMENT NOT NULL, forfait_id INT DEFAULT NULL, titre VARCHAR(255) NOT NULL, prix NUMERIC(7, 2) DEFAULT NULL, description LONGTEXT NOT NULL, UNIQUE INDEX UNIQ_B338D8D1906D5F2C (forfait_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE prestations ADD CONSTRAINT FK_B338D8D1906D5F2C FOREIGN KEY (forfait_id) REFERENCES forfaits (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE prestations DROP FOREIGN KEY FK_B338D8D1906D5F2C');
        $this->addSql('DROP TABLE forfaits');
        $this->addSql('DROP TABLE prestations');
    }
}
