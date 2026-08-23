import type { FieldErrorResponse } from "./FieldErrorResponse.types";

export type ApiResponse = {
    success: boolean;
    message: string;
    errorCode: string;
    errors: FieldErrorResponse[] | null;
    timestamp: string;
    path: string | null;
};
