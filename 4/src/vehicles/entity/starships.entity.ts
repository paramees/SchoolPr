import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column("simple-array")
    pilots: string[]; //urls

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @Column({ type: "simple-array" })
    image_names: string[];
}