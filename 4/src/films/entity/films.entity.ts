import { PeopleEntity } from 'src/people/entity/people.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class FilmsEntity {

    @PrimaryGeneratedColumn()
	id: number;
	
    @Column()
    title: string;

    @Column()
	episode_id: number;

    @Column({type: 'text'})
	opening_crawl: string;

    @Column()
	director: string;

    @Column()
	producer: string;

    @Column()
	release_date: string;

    @Column({type: 'simple-array'})
	characters: string[]; //urls

    @ManyToMany(() => PeopleEntity, people => people.films, { cascade: true })
    @JoinTable({
      name: 'PeopleFilms',
      joinColumns: [{ name: 'filmsId', referencedColumnName: 'id' }],
      inverseJoinColumns: [{ name: 'peopleId', referencedColumnName: 'id' }]
    })
    charactersObj: PeopleEntity[]

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