import { FilmsEntity } from 'src/films/entity/films.entity';
import { PeopleEntity } from 'src/people/entity/people.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class VehiclesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column()
    vehicle_class: string;

    @Column()
    manufacturer: string;

    @Column()
    cost_in_credits: string;

    @Column()
    length: string;

    @Column()
    crew: string;

    @Column()
    passengers: string;

    @Column()
    max_atmosphering_speed: string;

    @Column()
    cargo_capacity: string;

    @Column()
    consumables: string;

    @Column("simple-array")
    films: string[]; //urls

    @ManyToMany(() => FilmsEntity, films => films.vehiclesObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    filmsObjs: FilmsEntity[];

    @Column("simple-array")
    pilots: string[]; //urls

    @ManyToMany(() => PeopleEntity, people => people.vehiclesObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    pilotsObjs: PeopleEntity[];

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @Column({ type: "simple-array" })
    image_names: string[];
}