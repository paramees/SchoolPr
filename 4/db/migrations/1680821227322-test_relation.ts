import { MigrationInterface, QueryRunner } from "typeorm";

export class testRelation1680821227322 implements MigrationInterface {
    name = 'testRelation1680821227322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`PeopleFilms\` (\`filmsId\` int NOT NULL, \`peopleId\` int NOT NULL, INDEX \`IDX_93b89b55dd70232b8945ff9e3a\` (\`filmsId\`), INDEX \`IDX_a378fa4fa57f8dfd99e5c1a570\` (\`peopleId\`), PRIMARY KEY (\`filmsId\`, \`peopleId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` ADD CONSTRAINT \`FK_93b89b55dd70232b8945ff9e3a3\` FOREIGN KEY (\`filmsId\`) REFERENCES \`films_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` ADD CONSTRAINT \`FK_a378fa4fa57f8dfd99e5c1a5707\` FOREIGN KEY (\`peopleId\`) REFERENCES \`people_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` DROP FOREIGN KEY \`FK_a378fa4fa57f8dfd99e5c1a5707\``);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` DROP FOREIGN KEY \`FK_93b89b55dd70232b8945ff9e3a3\``);
        await queryRunner.query(`DROP INDEX \`IDX_a378fa4fa57f8dfd99e5c1a570\` ON \`PeopleFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_93b89b55dd70232b8945ff9e3a\` ON \`PeopleFilms\``);
        await queryRunner.query(`DROP TABLE \`PeopleFilms\``);
    }

}
