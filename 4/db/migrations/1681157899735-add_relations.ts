import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelations1681157899735 implements MigrationInterface {
    name = 'addRelations1681157899735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`people_entity\` DROP FOREIGN KEY \`FK_8ffd2fd0937967b3498f4d90375\``);
        await queryRunner.query(`ALTER TABLE \`people_entity\` CHANGE \`homeworldObjsId\` \`homeworldId\` int NULL`);
        await queryRunner.query(`CREATE TABLE \`PeopleFilms\` (\`filmsEntityId\` int NOT NULL, \`peopleEntityId\` int NOT NULL, INDEX \`IDX_f0b27124a69000395314516617\` (\`filmsEntityId\`), INDEX \`IDX_a56242719cd578ea7e1dc053c6\` (\`peopleEntityId\`), PRIMARY KEY (\`filmsEntityId\`, \`peopleEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`SpeciesFilms\` (\`filmsEntityId\` int NOT NULL, \`speciesEntityId\` int NOT NULL, INDEX \`IDX_68c358750e6637c2258417abd1\` (\`filmsEntityId\`), INDEX \`IDX_bdd36c21b36af2f209846e7fa6\` (\`speciesEntityId\`), PRIMARY KEY (\`filmsEntityId\`, \`speciesEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`VehiclesFilms\` (\`filmsEntityId\` int NOT NULL, \`vehiclesEntityId\` int NOT NULL, INDEX \`IDX_64cc4cfa44d033b271c0511d32\` (\`filmsEntityId\`), INDEX \`IDX_9042d07fd992c060e79a7896a0\` (\`vehiclesEntityId\`), PRIMARY KEY (\`filmsEntityId\`, \`vehiclesEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`StarshipsFilms\` (\`filmsEntityId\` int NOT NULL, \`starshipsEntityId\` int NOT NULL, INDEX \`IDX_3c4110cde7f674ca89f433027a\` (\`filmsEntityId\`), INDEX \`IDX_5a572c9be3126c7b9786ef44df\` (\`starshipsEntityId\`), PRIMARY KEY (\`filmsEntityId\`, \`starshipsEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`PlanetsFilms\` (\`filmsEntityId\` int NOT NULL, \`planetsEntityId\` int NOT NULL, INDEX \`IDX_2dc3afd7089ddbe6c66c880c68\` (\`filmsEntityId\`), INDEX \`IDX_fc59c88bc64090316479ebe3cc\` (\`planetsEntityId\`), PRIMARY KEY (\`filmsEntityId\`, \`planetsEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`SpeciesPeople\` (\`peopleEntityId\` int NOT NULL, \`speciesEntityId\` int NOT NULL, INDEX \`IDX_78a309536f7b3d4610edd9da0d\` (\`peopleEntityId\`), INDEX \`IDX_cbcbb768d5721913ca7af27691\` (\`speciesEntityId\`), PRIMARY KEY (\`peopleEntityId\`, \`speciesEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`VehiclesPeople\` (\`peopleEntityId\` int NOT NULL, \`vehiclesEntityId\` int NOT NULL, INDEX \`IDX_9bef84fece15aeff6240244345\` (\`peopleEntityId\`), INDEX \`IDX_c02fc4d5cd5fda6bcf1e83eedd\` (\`vehiclesEntityId\`), PRIMARY KEY (\`peopleEntityId\`, \`vehiclesEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`StarshipsPeople\` (\`peopleEntityId\` int NOT NULL, \`starshipsEntityId\` int NOT NULL, INDEX \`IDX_722ee4c4c78b52371c994350d8\` (\`peopleEntityId\`), INDEX \`IDX_59946112831069631c81ea2662\` (\`starshipsEntityId\`), PRIMARY KEY (\`peopleEntityId\`, \`starshipsEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`people_entity\` ADD CONSTRAINT \`FK_f7c4c461f9182018ad51c15604a\` FOREIGN KEY (\`homeworldId\`) REFERENCES \`planets_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` ADD CONSTRAINT \`FK_f0b27124a690003953145166175\` FOREIGN KEY (\`filmsEntityId\`) REFERENCES \`films_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` ADD CONSTRAINT \`FK_a56242719cd578ea7e1dc053c68\` FOREIGN KEY (\`peopleEntityId\`) REFERENCES \`people_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`SpeciesFilms\` ADD CONSTRAINT \`FK_68c358750e6637c2258417abd12\` FOREIGN KEY (\`filmsEntityId\`) REFERENCES \`films_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`SpeciesFilms\` ADD CONSTRAINT \`FK_bdd36c21b36af2f209846e7fa6a\` FOREIGN KEY (\`speciesEntityId\`) REFERENCES \`species_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`VehiclesFilms\` ADD CONSTRAINT \`FK_64cc4cfa44d033b271c0511d321\` FOREIGN KEY (\`filmsEntityId\`) REFERENCES \`films_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`VehiclesFilms\` ADD CONSTRAINT \`FK_9042d07fd992c060e79a7896a05\` FOREIGN KEY (\`vehiclesEntityId\`) REFERENCES \`vehicles_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`StarshipsFilms\` ADD CONSTRAINT \`FK_3c4110cde7f674ca89f433027a9\` FOREIGN KEY (\`filmsEntityId\`) REFERENCES \`films_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`StarshipsFilms\` ADD CONSTRAINT \`FK_5a572c9be3126c7b9786ef44dfb\` FOREIGN KEY (\`starshipsEntityId\`) REFERENCES \`starships_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`PlanetsFilms\` ADD CONSTRAINT \`FK_2dc3afd7089ddbe6c66c880c683\` FOREIGN KEY (\`filmsEntityId\`) REFERENCES \`films_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`PlanetsFilms\` ADD CONSTRAINT \`FK_fc59c88bc64090316479ebe3cc6\` FOREIGN KEY (\`planetsEntityId\`) REFERENCES \`planets_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`SpeciesPeople\` ADD CONSTRAINT \`FK_78a309536f7b3d4610edd9da0d2\` FOREIGN KEY (\`peopleEntityId\`) REFERENCES \`people_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`SpeciesPeople\` ADD CONSTRAINT \`FK_cbcbb768d5721913ca7af276918\` FOREIGN KEY (\`speciesEntityId\`) REFERENCES \`species_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`VehiclesPeople\` ADD CONSTRAINT \`FK_9bef84fece15aeff6240244345f\` FOREIGN KEY (\`peopleEntityId\`) REFERENCES \`people_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`VehiclesPeople\` ADD CONSTRAINT \`FK_c02fc4d5cd5fda6bcf1e83eeddb\` FOREIGN KEY (\`vehiclesEntityId\`) REFERENCES \`vehicles_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`StarshipsPeople\` ADD CONSTRAINT \`FK_722ee4c4c78b52371c994350d80\` FOREIGN KEY (\`peopleEntityId\`) REFERENCES \`people_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`StarshipsPeople\` ADD CONSTRAINT \`FK_59946112831069631c81ea26626\` FOREIGN KEY (\`starshipsEntityId\`) REFERENCES \`starships_entity\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`StarshipsPeople\` DROP FOREIGN KEY \`FK_59946112831069631c81ea26626\``);
        await queryRunner.query(`ALTER TABLE \`StarshipsPeople\` DROP FOREIGN KEY \`FK_722ee4c4c78b52371c994350d80\``);
        await queryRunner.query(`ALTER TABLE \`VehiclesPeople\` DROP FOREIGN KEY \`FK_c02fc4d5cd5fda6bcf1e83eeddb\``);
        await queryRunner.query(`ALTER TABLE \`VehiclesPeople\` DROP FOREIGN KEY \`FK_9bef84fece15aeff6240244345f\``);
        await queryRunner.query(`ALTER TABLE \`SpeciesPeople\` DROP FOREIGN KEY \`FK_cbcbb768d5721913ca7af276918\``);
        await queryRunner.query(`ALTER TABLE \`SpeciesPeople\` DROP FOREIGN KEY \`FK_78a309536f7b3d4610edd9da0d2\``);
        await queryRunner.query(`ALTER TABLE \`PlanetsFilms\` DROP FOREIGN KEY \`FK_fc59c88bc64090316479ebe3cc6\``);
        await queryRunner.query(`ALTER TABLE \`PlanetsFilms\` DROP FOREIGN KEY \`FK_2dc3afd7089ddbe6c66c880c683\``);
        await queryRunner.query(`ALTER TABLE \`StarshipsFilms\` DROP FOREIGN KEY \`FK_5a572c9be3126c7b9786ef44dfb\``);
        await queryRunner.query(`ALTER TABLE \`StarshipsFilms\` DROP FOREIGN KEY \`FK_3c4110cde7f674ca89f433027a9\``);
        await queryRunner.query(`ALTER TABLE \`VehiclesFilms\` DROP FOREIGN KEY \`FK_9042d07fd992c060e79a7896a05\``);
        await queryRunner.query(`ALTER TABLE \`VehiclesFilms\` DROP FOREIGN KEY \`FK_64cc4cfa44d033b271c0511d321\``);
        await queryRunner.query(`ALTER TABLE \`SpeciesFilms\` DROP FOREIGN KEY \`FK_bdd36c21b36af2f209846e7fa6a\``);
        await queryRunner.query(`ALTER TABLE \`SpeciesFilms\` DROP FOREIGN KEY \`FK_68c358750e6637c2258417abd12\``);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` DROP FOREIGN KEY \`FK_a56242719cd578ea7e1dc053c68\``);
        await queryRunner.query(`ALTER TABLE \`PeopleFilms\` DROP FOREIGN KEY \`FK_f0b27124a690003953145166175\``);
        await queryRunner.query(`ALTER TABLE \`people_entity\` DROP FOREIGN KEY \`FK_f7c4c461f9182018ad51c15604a\``);
        await queryRunner.query(`DROP INDEX \`IDX_59946112831069631c81ea2662\` ON \`StarshipsPeople\``);
        await queryRunner.query(`DROP INDEX \`IDX_722ee4c4c78b52371c994350d8\` ON \`StarshipsPeople\``);
        await queryRunner.query(`DROP TABLE \`StarshipsPeople\``);
        await queryRunner.query(`DROP INDEX \`IDX_c02fc4d5cd5fda6bcf1e83eedd\` ON \`VehiclesPeople\``);
        await queryRunner.query(`DROP INDEX \`IDX_9bef84fece15aeff6240244345\` ON \`VehiclesPeople\``);
        await queryRunner.query(`DROP TABLE \`VehiclesPeople\``);
        await queryRunner.query(`DROP INDEX \`IDX_cbcbb768d5721913ca7af27691\` ON \`SpeciesPeople\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a309536f7b3d4610edd9da0d\` ON \`SpeciesPeople\``);
        await queryRunner.query(`DROP TABLE \`SpeciesPeople\``);
        await queryRunner.query(`DROP INDEX \`IDX_fc59c88bc64090316479ebe3cc\` ON \`PlanetsFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_2dc3afd7089ddbe6c66c880c68\` ON \`PlanetsFilms\``);
        await queryRunner.query(`DROP TABLE \`PlanetsFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a572c9be3126c7b9786ef44df\` ON \`StarshipsFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_3c4110cde7f674ca89f433027a\` ON \`StarshipsFilms\``);
        await queryRunner.query(`DROP TABLE \`StarshipsFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_9042d07fd992c060e79a7896a0\` ON \`VehiclesFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_64cc4cfa44d033b271c0511d32\` ON \`VehiclesFilms\``);
        await queryRunner.query(`DROP TABLE \`VehiclesFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_bdd36c21b36af2f209846e7fa6\` ON \`SpeciesFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_68c358750e6637c2258417abd1\` ON \`SpeciesFilms\``);
        await queryRunner.query(`DROP TABLE \`SpeciesFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_a56242719cd578ea7e1dc053c6\` ON \`PeopleFilms\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0b27124a69000395314516617\` ON \`PeopleFilms\``);
        await queryRunner.query(`DROP TABLE \`PeopleFilms\``);
        await queryRunner.query(`ALTER TABLE \`people_entity\` CHANGE \`homeworldId\` \`homeworldObjsId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`people_entity\` ADD CONSTRAINT \`FK_8ffd2fd0937967b3498f4d90375\` FOREIGN KEY (\`homeworldObjsId\`) REFERENCES \`planets_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
