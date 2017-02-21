export interface eVars {
    name?: string;
    type?: string;
    id?: string;
    expiration_type?: string;
    expiration_custom_days?: string;
    allocation_type?: string;
    enabled?: boolean;
}

export interface Props {
    id?: string;
    name?: string;
    enabled?: boolean;
    description?: string;
    pathing_enabled?: boolean;
    list_enabled?: boolean;
    participation_enabled?: boolean;
    case_insensitive?: boolean;
    case_insensitive_date_enabled?: any
}

export interface Events {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    default_metric: boolean;
    participation?: string;
    serialization?: string;
    polarity?: string;
    visibility?: any;
}

export interface Users {
    userId: number;
    id: number;
    title: string;
    body: string;
    name:string;
}