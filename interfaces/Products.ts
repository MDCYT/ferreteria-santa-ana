interface Category {
    id: number
    name: string
    parent_id?: number
    image_url: string
}

interface Product {
    id: number
    name: string
    description: string
    price: number
    image: string
    category: number
    brand: number
    created_at: string
    discounted_price: number
    stock: number
    status: number
    featured: boolean
}

interface Brand {
    id: number
    name: string
    created_at: string
}

export type { Category, Product, Brand }