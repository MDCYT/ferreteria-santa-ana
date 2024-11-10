import { CartProduct } from '@/interfaces/Cart';

import { createStore } from 'zustand/vanilla'

export type CartState = {
    products: CartProduct[]
}

export type CartActions = {
    addProduct: (product: CartProduct) => void
    removeProduct: (productId: number) => void
    hasProduct: (productId: number) => boolean
    updateProductQuantity: (productId: number, quantity: number) => void
    addProductQuantity: (productId: number, quantity: number) => void
    removeProductQuantity: (productId: number, quantity: number) => void
}

export type CartStore = CartState & CartActions

export const initCartStore = (): CartState => {
    return { products: [] }
}

export const defaultInitState: CartState = {
    products: []
}

export const createCartStore = (
    initState: CartState = defaultInitState
) => {
    return createStore<CartStore>()((set, get) => ({
        ...initState,
        addProduct: (product) => set((state) => ({
            products: [...state.products, product]
        })),
        removeProduct: (productId) => set((state) => ({
            products: state.products.filter((product) => product.product.id !== productId)
        })),
        hasProduct: (productId: number) => {
            const state = get();
            return Boolean(state.products.find((product: CartProduct) => product.product.id === productId));
        },
        updateProductQuantity: (productId, quantity) => set((state) => ({
            products: state.products.map((product) => {
                if (product.product.id === productId) {
                    return {
                        ...product,
                        quantity: quantity == null || quantity < 1 ? 1 : quantity
                    }
                }
                return product
            })
        })),
        addProductQuantity: (productId, quantity) => set((state) => ({
            products: state.products.map((product) => {
                if (product.product.id === productId) {
                    return {
                        ...product,
                        quantity: product.quantity + (quantity == null || quantity < 1 ? 1 : quantity)
                    }
                }
                return product
            })
        })),
        removeProductQuantity: (productId, quantity) => set((state) => ({
            products: state.products.map((product) => {
                if (product.product.id === productId) {
                    return {
                        ...product,
                        quantity: product.quantity - quantity
                    }
                }
                return product
            })
        }))
    }))
}
