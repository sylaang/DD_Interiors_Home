<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230606142526 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image_projects DROP FOREIGN KEY FK_D3633D0CB7FA4F1A');
        $this->addSql('DROP TABLE image_projects');
        $this->addSql('ALTER TABLE images_projects ADD cat_images_projects_id INT NOT NULL');
        $this->addSql('ALTER TABLE images_projects ADD CONSTRAINT FK_FFB0CECEB7FA4F1A FOREIGN KEY (cat_images_projects_id) REFERENCES cat_images_projects (id)');
        $this->addSql('CREATE INDEX IDX_FFB0CECEB7FA4F1A ON images_projects (cat_images_projects_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE image_projects (id INT AUTO_INCREMENT NOT NULL, cat_images_projects_id INT NOT NULL, INDEX IDX_D3633D0CB7FA4F1A (cat_images_projects_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE image_projects ADD CONSTRAINT FK_D3633D0CB7FA4F1A FOREIGN KEY (cat_images_projects_id) REFERENCES cat_images_projects (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE images_projects DROP FOREIGN KEY FK_FFB0CECEB7FA4F1A');
        $this->addSql('DROP INDEX IDX_FFB0CECEB7FA4F1A ON images_projects');
        $this->addSql('ALTER TABLE images_projects DROP cat_images_projects_id');
    }
}
