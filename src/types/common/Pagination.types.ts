export interface PaginationRequest {
    page: number;
    size: number;
    sort?: string[];
}

export interface PaginationReponse<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}
