export interface IPaginate<T> {
    page: number,
    limit: number,
    total: number,
    data: T[]
}

export interface IPagination {
    page: number,
    limit: number,
    total: number,
    search?: string | null,
    loading?: boolean,
    totalPage?: number
}