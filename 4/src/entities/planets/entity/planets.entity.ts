import { FilmsEntity } from 'src/entities/films/entity/films.entity';
import { PeopleEntity } from 'src/entities/people/entity/people.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class PlanetsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    diameter: string;

    @Column()
    rotation_period: string;

    @Column()
    orbital_period: string;

    @Column()
    gravity: string;

    @Column()
    population: string;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column()
    surface_water: string;

    @Column("simple-array")
    films: string[]; //urls

    @ManyToMany(() => FilmsEntity, films => films.planetsObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    filmsObjs: FilmsEntity[];

    @Column("simple-array")
    residents: string[]; //urls

    @OneToMany(() => PeopleEntity, people => people.homeworldObj, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    residentsObjs: PeopleEntity[];

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @Column({ type: "simple-array" })
    image_names: string[];
}