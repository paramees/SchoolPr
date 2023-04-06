export class SpeciesDto {
    id: number;
    name: string;
    classification : string;
    designation : string;
    average_height : string;
    average_lifespan : string;
    eye_colors : string;
    hair_colors : string;
    skin_colors : string;
    language : string;
    homeworld : string;
    films: string[]; //urls
    people : string[]; //urls
    created: string;
    edited: string;
    url: string;
    image_names?: string[];
}