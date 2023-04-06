import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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