import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { FilmsEntity } from '../../films/entity/films.entity';
import { PeopleEntity } from '../../people/entity/people.entity';

@Entity()
export class StarshipsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    model: string;

    @Column()
    starship_class: string;

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
    hyperdrive_rating: string;

    @Column()
    MGLT: string;

    @Column()
    cargo_capacity: string;

    @Column()
    consumables: string;

    @Column("simple-array")
    films: string[]; //urls

    @ManyToMany(() => FilmsEntity, films => films.starshipsObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    filmsObjs: FilmsEntity[];

    @Column("simple-array")
    pilots: string[]; //urls

    @ManyToMany(() => PeopleEntity, people => people.starshipsObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
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