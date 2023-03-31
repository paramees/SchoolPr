import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPeopleColumnImageNames1680281491850 implements MigrationInterface {
    name = 'AddPeopleColumnImageNames1680281491850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_entity\` ADD \`image_names\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_entity\` DROP COLUMN \`image_names\``);
    }

}
