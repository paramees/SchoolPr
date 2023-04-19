export class FilmsDto {
	id: number;
    title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[]; //urls
	species: string[]; //urls
	vehicles: string[]; //urls
	starships: string[]; //urls
	planets: string[]; //urls
	created: string;
	edited: string;
	url: string;
	image_names?: string[];
}