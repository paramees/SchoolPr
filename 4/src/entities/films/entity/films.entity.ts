import { PeopleEntity } from '../../people/entity/people.entity';
import { PlanetsEntity } from '../../planets/entity/planets.entity';
import { SpeciesEntity } from '../../species/entity/species.entity';
import { StarshipsEntity } from '../../starships/entity/starships.entity';
import { VehiclesEntity } from '../../vehicles/entity/vehicles.entity';
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

    @ManyToMany(() => PeopleEntity, people => people.filmsObjs )
    @JoinTable({ name: "PeopleFilms"})
    charactersObjs: PeopleEntity[];

    @Column({type: 'simple-array'})
	species: string[]; //urls

    @ManyToMany(() => SpeciesEntity, species => species.filmsObjs)
    @JoinTable({ name: 'SpeciesFilms' })
    speciesObjs: SpeciesEntity[];

    @Column({type: 'simple-array'})
	vehicles: string[]; //urls

    @ManyToMany(() => VehiclesEntity, vehicles => vehicles.filmsObjs)
    @JoinTable({ name: 'VehiclesFilms' })
    vehiclesObjs: VehiclesEntity[];

    @Column({type: 'simple-array'})
	starships: string[]; //urls

    @ManyToMany(() => StarshipsEntity, starships => starships.filmsObjs)
    @JoinTable({ name: 'StarshipsFilms' })
    starshipsObjs: StarshipsEntity[];

    @Column({type: 'simple-array'})
	planets: string[]; //urls

    @ManyToMany(() => PlanetsEntity, planets => planets.filmsObjs)
    @JoinTable({ name: 'PlanetsFilms' })
    planetsObjs: PlanetsEntity[];

    @Column()
	created: string;

    @Column()
	edited: string;

    @Column()
	url: string;

    @Column({type: 'simple-array'})
	image_names: string[];
}