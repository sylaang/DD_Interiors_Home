<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240808111425 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE plans DROP FOREIGN KEY FK_356798D1DA5E972E');
        $this->addSql('DROP INDEX IDX_356798D1DA5E972E ON plans');
        $this->addSql('ALTER TABLE plans CHANGE archi_project_id archi_projects_id INT NOT NULL');
        $this->addSql('ALTER TABLE plans ADD CONSTRAINT FK_356798D13B7DEE7D FOREIGN KEY (archi_projects_id) REFERENCES archi_projects (id)');
        $this->addSql('CREATE INDEX IDX_356798D13B7DEE7D ON plans (archi_projects_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE plans DROP FOREIGN KEY FK_356798D13B7DEE7D');
        $this->addSql('DROP INDEX IDX_356798D13B7DEE7D ON plans');
        $this->addSql('ALTER TABLE plans CHANGE archi_projects_id archi_project_id INT NOT NULL');
        $this->addSql('ALTER TABLE plans ADD CONSTRAINT FK_356798D1DA5E972E FOREIGN KEY (archi_project_id) REFERENCES archi_projects (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_356798D1DA5E972E ON plans (archi_project_id)');
    }
}
