export interface Property {
    id: string,
    title: string,
    type: string,
    description: string,
    city: string,
    issold: boolean,
    price: number,
    bedroom: number,
    area: number,
    latitude: number,
    longitude: number,
    images: string[],
    is_featured: boolean,
    created_at: string,
    updated_at: string

}