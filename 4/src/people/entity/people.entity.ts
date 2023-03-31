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

    @Column({type: 'text'})
	films: string; //urls

    @Column({type: 'text'})
	species: string; //urls

    @Column({type: 'text'})
	vehicles: string; //urls

    @Column({type: 'text'})
	starships: string; //urls

    @Column()
	created: string;

    @Column()
	edited: string;

    @Column()
	url: string;

    @Column({type: 'text'})
	image_names: string;
}