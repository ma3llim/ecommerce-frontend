export interface Category {
    categoryId: string;
    name: string;
    slug: string;
    imageUrl: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryResponse {
    content: Category[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}
