import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FilmsEntity {

    @PrimaryGeneratedColumn()
	id: number;
	
    @Column()
    title: string;

    @Column()
	episode_id: number;

    @Column()
	opening_crawl: string;

    @Column()
	director: string;

    @Column()
	producer: string;

    @Column()
	release_date: string;

    @Column({type: 'simple-array'})
	characters: string[]; //urls

    @Column({type: 'simple-array'})
	species: string[]; //urls

    @Column({type: 'simple-array'})
	vehicles: string[]; //urls

    @Column({type: 'simple-array'})
	starships: string[]; //urls

    @Column({type: 'simple-array'})
	planets: string[]; //urls

    @Column()
	created: string;

    @Column()
	edited: string;

    @Column()
	url: string;

    @Column({type: 'simple-array'})
	image_names: string[];
}