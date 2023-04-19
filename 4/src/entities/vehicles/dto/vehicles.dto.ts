export class VehiclesDto {
    id: number;
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: string[]; //urls
    pilots: string[]; //urls
    created: string;
    edited: string;
    url: string;
    image_names?: string[];
}