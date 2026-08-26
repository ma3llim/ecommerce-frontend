export interface Tag {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface AddTagRequest {
    name: string;
}

export interface UpdateTagRequest {
    name: string;
}
export interface TagOptionResponse {
    tagId: string;
    tagName: string;
}

export interface TagResponse {
    productId: string;
    productName: string;
    tagId: string;
    tagName: string;
}
