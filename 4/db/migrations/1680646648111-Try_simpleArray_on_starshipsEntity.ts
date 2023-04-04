import { MigrationInterface, QueryRunner } from "typeorm";

export class TrySimpleArrayOnStarshipsEntity1680646648111 implements MigrationInterface {
    name = 'TrySimpleArrayOnStarshipsEntity1680646648111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`starships_entity\` CHANGE \`image_names\` \`image_names\` text NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`starships_entity\` CHANGE \`image_names\` \`image_names\` text NOT NULL`);
    }

}
