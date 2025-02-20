export interface IQuestion {
    readonly _id: string,
    readonly description: string,
    readonly isPublic: boolean,
    readonly createdAt: string,
    readonly updatedAt: string,
}