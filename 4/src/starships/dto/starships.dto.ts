export class StarshipsDto {
    id: number;
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: string[]; //urls
    pilots: string[]; //urls
    created: string;
    edited: string;
    url: string;
    image_names?: string[];
}