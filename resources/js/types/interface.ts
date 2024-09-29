export interface Category {
    id: number;
    name: string;
    products: Product[]
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    image: string;
    categories: Category[];
    created_at: string;
    updated_at: string;
}
