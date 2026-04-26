import { CartClient } from '../api-client/CartClient'
import { expect } from '../utils/custom-expect'
import { assertCartTotals } from '../utils/cart-assertions'
import { Cart } from '../types/cart.types.ts'
 

export class CartService {
 
    constructor(private client: CartClient) {}
 
    async getAndValidateCartByUser(userId: number): Promise<Cart> {
        const response = await this.client.getCartsByUser(userId)
 
        await expect(response).shouldMatchSchema('cart', 'GET_cart', true)
 
        const cart = response.carts[0]
        assertCartTotals(cart)
 
        return cart
    }
}