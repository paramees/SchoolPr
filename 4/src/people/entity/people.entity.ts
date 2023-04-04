import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PeopleEntity {

    @PrimaryGeneratedColumn()
	id: number;
	
    @Column()
    name: string;

    @Column()
	height: number;

    @Column()
	mass: number;

    @Column()
	hair_color: string;

    @Column()
	skin_color: string;

    @Column()
	eye_color: string;

    @Column()
	birth_year: string;

    @Column()
	gender: string;

    @Column()
	homeworld: string;

    @Column({type: 'simple-array'})
	films: string[]; //urls

    @Column({type: 'simple-array'})
	species: string[]; //urls

    @Column({type: 'simple-array'})
	vehicles: string[]; //urls

    @Column({type: 'simple-array'})
	starships: string[]; //urls

    @Column()
	created: string;

    @Column()
	edited: string;

    @Column()
	url: string;

    @Column({type: 'simple-array'})
	image_names: string[];
}