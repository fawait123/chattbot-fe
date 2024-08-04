export interface IColumn {
    key: string,
    value: string
}

export interface ITable<T> {
    columns: IColumn[],
    rows: T[],
    withNumber?: boolean,
    loading?: boolean,
    perPage: number,
    limit: number,
    total: number
}