<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240809132343 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE images_projects DROP FOREIGN KEY FK_FFB0CECE2B19EA1E');
        $this->addSql('DROP INDEX IDX_FFB0CECE2B19EA1E ON images_projects');
        $this->addSql('ALTER TABLE images_projects CHANGE archiprojets_id archiprojects_id INT NOT NULL');
        $this->addSql('ALTER TABLE images_projects ADD CONSTRAINT FK_FFB0CECEB1A6779F FOREIGN KEY (archiprojects_id) REFERENCES archi_projects (id)');
        $this->addSql('CREATE INDEX IDX_FFB0CECEB1A6779F ON images_projects (archiprojects_id)');
        $this->addSql('ALTER TABLE plans DROP FOREIGN KEY FK_356798D12B19EA1E');
        $this->addSql('DROP INDEX IDX_356798D12B19EA1E ON plans');
        $this->addSql('ALTER TABLE plans CHANGE archiprojets_id archiprojects_id INT NOT NULL');
        $this->addSql('ALTER TABLE plans ADD CONSTRAINT FK_356798D1B1A6779F FOREIGN KEY (archiprojects_id) REFERENCES archi_projects (id)');
        $this->addSql('CREATE INDEX IDX_356798D1B1A6779F ON plans (archiprojects_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE plans DROP FOREIGN KEY FK_356798D1B1A6779F');
        $this->addSql('DROP INDEX IDX_356798D1B1A6779F ON plans');
        $this->addSql('ALTER TABLE plans CHANGE archiprojects_id archiprojets_id INT NOT NULL');
        $this->addSql('ALTER TABLE plans ADD CONSTRAINT FK_356798D12B19EA1E FOREIGN KEY (archiprojets_id) REFERENCES archi_projects (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_356798D12B19EA1E ON plans (archiprojets_id)');
        $this->addSql('ALTER TABLE images_projects DROP FOREIGN KEY FK_FFB0CECEB1A6779F');
        $this->addSql('DROP INDEX IDX_FFB0CECEB1A6779F ON images_projects');
        $this->addSql('ALTER TABLE images_projects CHANGE archiprojects_id archiprojets_id INT NOT NULL');
        $this->addSql('ALTER TABLE images_projects ADD CONSTRAINT FK_FFB0CECE2B19EA1E FOREIGN KEY (archiprojets_id) REFERENCES archi_projects (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_FFB0CECE2B19EA1E ON images_projects (archiprojets_id)');
    }
}
