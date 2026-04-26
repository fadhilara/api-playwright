import { RequestHandler } from '../utils/request-handler'
import { ENDPOINTS } from '../constants/endpoints.ts'
import { STATUS } from '../constants/status-codes.ts'
import { CartsResponse} from '../types/cart.types'

export class CartClient {

    constructor(private api: RequestHandler) {}

    async getCartsByUser(userId: number): Promise<CartsResponse> {
        return this.api
            .path(ENDPOINTS.carts.byUser(userId))
            .getRequest(STATUS.OK)
    }

    
}