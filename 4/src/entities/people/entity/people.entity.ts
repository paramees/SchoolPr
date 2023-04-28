import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { FilmsEntity } from '../../films/entity/films.entity';
import { PlanetsEntity } from '../../planets/entity/planets.entity';
import { SpeciesEntity } from '../../species/entity/species.entity';
import { StarshipsEntity } from '../../starships/entity/starships.entity';
import { VehiclesEntity } from '../../vehicles/entity/vehicles.entity';

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

    @ManyToOne(() => PlanetsEntity, planets => planets.residentsObjs)
    @JoinColumn({name: 'homeworldId'})
    homeworldObj: PlanetsEntity;

    @Column({type: 'simple-array'})
	films: string[]; //urls

    @ManyToMany(() => FilmsEntity, films => films.charactersObjs, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    filmsObjs: FilmsEntity[];

    @Column({type: 'simple-array'})
	species: string[]; //urls

    @ManyToMany(() => SpeciesEntity, species => species.peopleObjs)
    @JoinTable({ name: 'SpeciesPeople' })
    speciesObjs: SpeciesEntity[];

    @Column({type: 'simple-array'})
	vehicles: string[]; //urls

    @ManyToMany(() => VehiclesEntity, vehicles => vehicles.pilotsObjs)
    @JoinTable({ name: 'VehiclesPeople' })
    vehiclesObjs: VehiclesEntity[];

    @Column({type: 'simple-array'})
	starships: string[]; //urls

    @ManyToMany(() => StarshipsEntity, starships => starships.pilotsObjs)
    @JoinTable({ name: 'StarshipsPeople' })
    starshipsObjs: StarshipsEntity[];

    @Column()
	created: string;

    @Column()
	edited: string;

    @Column()
	url: string;

    @Column({type: 'simple-array'})
	image_names: string[];
}