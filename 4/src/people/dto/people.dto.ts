export class PeopleDto {
	id: number;
    name: string;
	height: number;
	mass: number;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[] | string; //urls
	species: string[] | string;
	vehicles: string[] | string; //urls
	starships: string[] | string; //urls
	created: string;
	edited: string;
	url: string;
	image_names?: string;
}