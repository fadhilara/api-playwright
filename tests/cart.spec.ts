import { RequestHandler } from "../utils/request-handler"
import { test } from '../utils/fixture';
import { APILogger } from "../utils/logger";
import { expect } from "../utils/custom-expect";
import { createToken } from "../helpers/createToken";
import { validateSchema } from "../utils/schema-validator";
import { assertCartTotals } from '../utils/cart-assertions';
import { CartClient } from '../api-client/CartClient'
import { CartService } from '../services/CartService'
 
function setupCart(api: any) {
    const client = new CartClient(api)
    const service = new CartService(client)
    return { client, service }
}
 
test('GET cart by user — validate total item, price, discount & schema matches', async ({ api }) => {
    const { service } = setupCart(api)
 
    await service.getAndValidateCartByUser(1)
})
