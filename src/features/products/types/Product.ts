export interface Product {
    id: number;
    name: string;
    price: string;
    stock: number;
    image: string | null;
    quantity?: number;
}

export interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
    page: number;
    take: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total: number;
    selectedProduct: Product | null;
}

export interface Props {
    product: Product;
}