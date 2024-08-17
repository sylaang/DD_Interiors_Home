<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240807121114 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE commentaires (id INT AUTO_INCREMENT NOT NULL, users_id INT DEFAULT NULL, prestation_id INT DEFAULT NULL, subject VARCHAR(200) NOT NULL, message LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_D9BEC0C467B3B43D (users_id), INDEX IDX_D9BEC0C49E45C554 (prestation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE forfaits (id INT AUTO_INCREMENT NOT NULL, prix NUMERIC(7, 2) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE plans (id INT AUTO_INCREMENT NOT NULL, archi_project_id INT NOT NULL, file VARCHAR(255) NOT NULL, INDEX IDX_356798D1DA5E972E (archi_project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE prestations (id INT AUTO_INCREMENT NOT NULL, forfait_id INT DEFAULT NULL, forfait2_id INT DEFAULT NULL, categories_prix_id INT DEFAULT NULL, titre VARCHAR(255) NOT NULL, prix NUMERIC(7, 2) DEFAULT NULL, description LONGTEXT NOT NULL, description2 LONGTEXT DEFAULT NULL, imagename VARCHAR(255) DEFAULT NULL, fraisdedeplacement VARCHAR(3) DEFAULT NULL, UNIQUE INDEX UNIQ_B338D8D1906D5F2C (forfait_id), UNIQUE INDEX UNIQ_B338D8D1F69183C1 (forfait2_id), INDEX IDX_B338D8D1BC4DF352 (categories_prix_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, nom VARCHAR(180) NOT NULL, is_verified TINYINT(1) NOT NULL, prenom VARCHAR(180) NOT NULL, phone VARCHAR(20) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE commentaires ADD CONSTRAINT FK_D9BEC0C467B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE commentaires ADD CONSTRAINT FK_D9BEC0C49E45C554 FOREIGN KEY (prestation_id) REFERENCES prestations (id)');
        $this->addSql('ALTER TABLE plans ADD CONSTRAINT FK_356798D1DA5E972E FOREIGN KEY (archi_project_id) REFERENCES archi_projects (id)');
        $this->addSql('ALTER TABLE prestations ADD CONSTRAINT FK_B338D8D1906D5F2C FOREIGN KEY (forfait_id) REFERENCES forfaits (id)');
        $this->addSql('ALTER TABLE prestations ADD CONSTRAINT FK_B338D8D1F69183C1 FOREIGN KEY (forfait2_id) REFERENCES forfaits (id)');
        $this->addSql('ALTER TABLE prestations ADD CONSTRAINT FK_B338D8D1BC4DF352 FOREIGN KEY (categories_prix_id) REFERENCES categories_prix (id)');
        $this->addSql('ALTER TABLE commandes ADD CONSTRAINT FK_35D4282C9E45C554 FOREIGN KEY (prestation_id) REFERENCES prestations (id)');
        $this->addSql('ALTER TABLE facture ADD CONSTRAINT FK_FE86641067B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE images_projects ADD CONSTRAINT FK_FFB0CECE2B19EA1E FOREIGN KEY (archiprojets_id) REFERENCES archi_projects (id)');
        $this->addSql('ALTER TABLE images_projects ADD CONSTRAINT FK_FFB0CECEB7FA4F1A FOREIGN KEY (cat_images_projects_id) REFERENCES cat_images_projects (id)');
        $this->addSql('ALTER TABLE reset_password_request ADD CONSTRAINT FK_7CE748AA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE commandes DROP FOREIGN KEY FK_35D4282C9E45C554');
        $this->addSql('ALTER TABLE facture DROP FOREIGN KEY FK_FE86641067B3B43D');
        $this->addSql('ALTER TABLE reset_password_request DROP FOREIGN KEY FK_7CE748AA76ED395');
        $this->addSql('ALTER TABLE commentaires DROP FOREIGN KEY FK_D9BEC0C467B3B43D');
        $this->addSql('ALTER TABLE commentaires DROP FOREIGN KEY FK_D9BEC0C49E45C554');
        $this->addSql('ALTER TABLE plans DROP FOREIGN KEY FK_356798D1DA5E972E');
        $this->addSql('ALTER TABLE prestations DROP FOREIGN KEY FK_B338D8D1906D5F2C');
        $this->addSql('ALTER TABLE prestations DROP FOREIGN KEY FK_B338D8D1F69183C1');
        $this->addSql('ALTER TABLE prestations DROP FOREIGN KEY FK_B338D8D1BC4DF352');
        $this->addSql('DROP TABLE commentaires');
        $this->addSql('DROP TABLE forfaits');
        $this->addSql('DROP TABLE plans');
        $this->addSql('DROP TABLE prestations');
        $this->addSql('DROP TABLE user');
        $this->addSql('ALTER TABLE images_projects DROP FOREIGN KEY FK_FFB0CECE2B19EA1E');
        $this->addSql('ALTER TABLE images_projects DROP FOREIGN KEY FK_FFB0CECEB7FA4F1A');
    }
}
