export class PlanetsDto {
    id: number;
    name: string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
    films: string[]; //urls
    residents: string[]; //urls
    created: string;
    edited: string;
    url: string;
    image_names: string[];
}