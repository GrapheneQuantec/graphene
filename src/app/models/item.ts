import { User } from "./user";
import { Author } from "./publication";

export interface Item {
    id?: string;
    Title?: string[];
    Authors?: Author[];
    Author?: string;
    Year?: number;
    Link?: string;
    ImageUrl?: string;
    Keywords?: string;
    Category?: string;
    Step?: string;
    Inserted?: Inserted;
    Issued?: number[];
}

export interface Inserted {
    InsertorId?: string;
    Timestamp?: number;
}