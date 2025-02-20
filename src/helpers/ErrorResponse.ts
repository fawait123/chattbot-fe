import { AxiosError } from "axios";

export class ErrorResponse {
    static message(error: any): string {
        if (error instanceof AxiosError) {
            return error.response?.data?.message
        }

        return error.message
    }
}