<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230529153446 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE archi_projects DROP FOREIGN KEY FK_16B2DA02A6E44244');
        $this->addSql('DROP TABLE pays');
        $this->addSql('DROP INDEX IDX_16B2DA02A6E44244 ON archi_projects');
        $this->addSql('ALTER TABLE archi_projects DROP pays_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE pays (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(35) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE archi_projects ADD pays_id INT NOT NULL');
        $this->addSql('ALTER TABLE archi_projects ADD CONSTRAINT FK_16B2DA02A6E44244 FOREIGN KEY (pays_id) REFERENCES pays (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_16B2DA02A6E44244 ON archi_projects (pays_id)');
    }
}
