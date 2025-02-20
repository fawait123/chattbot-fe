import type { IUser } from "./user";

export interface ICamera {
    _id: string,
    date: string,
    userID: IUser,
    source: string,
    note?: string
}