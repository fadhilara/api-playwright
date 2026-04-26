import { RequestHandler } from "../utils/request-handler"
import { test } from '../utils/fixture';
import { APILogger } from "../utils/logger";
import { expect } from "../utils/custom-expect";
import { createToken } from "../helpers/createToken";
import { validateSchema } from "../utils/schema-validator";
import { assertCartTotals } from '../utils/cart-assertions';
import { CartClient } from '../api-client/CartClient'
import { CartService } from '../services/CartService'
 
// Helper setup — konsisten dengan pattern di article.spec.ts
function setupCart(api: any) {
    const client = new CartClient(api)
    const service = new CartService(client)
    return { client, service }
}
 
// ─── GET Tests ────────────────────────────────────────────────
 
test('GET cart by user — totals valid & schema matches', async ({ api }) => {
    const { service } = setupCart(api)
 
    await service.getAndValidateCartByUser(1)
})



// test('Get Cart', async ({ api }) => {
//   const response = await api
//     .path('/carts/user/1')
//     .getRequest(200);
//   const cart = response.carts[0];
//   assertCartTotals(cart);
//   await expect(response).shouldMatchSchema('cart', 'GET_cart', true)
// });
