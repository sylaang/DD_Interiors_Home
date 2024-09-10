<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240905164956 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE plans ADD CONSTRAINT FK_356798D126C2BA8 FOREIGN KEY (cat_plans_id) REFERENCES cat_plans (id)');
        $this->addSql('CREATE INDEX IDX_356798D126C2BA8 ON plans (cat_plans_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE plans DROP FOREIGN KEY FK_356798D126C2BA8');
        $this->addSql('DROP INDEX IDX_356798D126C2BA8 ON plans');
    }
}
