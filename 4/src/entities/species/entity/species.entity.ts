import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { FilmsEntity } from '../../films/entity/films.entity';
import { PeopleEntity } from '../../people/entity/people.entity';

@Entity()
export class SpeciesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    classification: string;

    @Column()
    designation: string;

    @Column()
    average_height: string;

    @Column()
    average_lifespan: string;

    @Column()
    eye_colors: string;

    @Column()
    hair_colors: string;

    @Column()
    skin_colors: string;

    @Column()
    language: string;

    @Column()
    homeworld: string;

    @Column("simple-array")
    films: string[]; //urls

    @ManyToMany(() => FilmsEntity, films => films.speciesObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    filmsObjs: FilmsEntity[];

    @Column("simple-array")
    people: string[]; //urls

    @ManyToMany(() => PeopleEntity, people => people.speciesObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    peopleObjs: PeopleEntity[];

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @Column({ type: "simple-array" })
    image_names: string[];
}