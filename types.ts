
export interface Product {
    id: number;
    name: string;
    images: string[];
    description: string;
    descriptionAr: string;
    price: number;
    originalPrice: number | null;
    promotionText: string | null;
    soldOut: boolean;
    logo?: string | null;
}