import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column("simple-array")
    people: string[]; //urls

    @Column()
    created: string;

    @Column()
    edited: string;

    @Column()
    url: string;

    @Column({ type: "simple-array" })
    image_names: string[];
}