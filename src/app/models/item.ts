import { User } from "./user";

export interface Item {
    id?: string;
    Title?: string[];
    Author?: string;
    Year?: number;
    Link?: string;
    ImageUrl?: string;
    Keywords?: string;
    Category?: string;
    Step?: string;
    Inserted?: Inserted;
}

export interface Inserted {
    InsertorId?: string;
    Timestamp?: number;
}