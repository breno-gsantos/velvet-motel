import { ReservationPeriod } from "./lib/generated/prisma/enums";

export type ResponseAction = 
| 
{
    success: true;
    message: string;
}
| {
    success: false;
    error: string;
}

export type suiteDTO = {
    id: string;
    slug: string;
    name: string;
    description: string;
    maxGuests: number;
    thumbnail: string;
    active: boolean;
    amenities: string[];

    prices: {
        id: string;
        period: ReservationPeriod;
        price: number;
    }[];
}

export type DashboardSuiteDTO = {
    id: string;
    slug: string;
    name: string;
    description: string;
    maxGuests: number;
    thumbnail: string;
    active: boolean;
    amenities: string[];

    prices: {
        id: string;
        period: ReservationPeriod;
        price: number;
        suiteId: string;
    }[];

    images: {
        id: string;
        suiteId: string;
        url: string;
    }[]
}

export type DashboardExperienceDTO = {
    id: string;
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    price: number | null;
    active: boolean;
}