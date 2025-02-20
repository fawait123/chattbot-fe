import type { IPaginate } from "@/interface/paginate";


export class SuccessResponse {
    static toJson<T>(data: T) {
        return data
    }

    static toPaginate<T>(data: any) {
        return {
            page: parseInt(data.page) as number,
            limit: parseInt(data.limit) as number,
            total: parseInt(data.total) as number,
            data: data.data
        }
    }
}