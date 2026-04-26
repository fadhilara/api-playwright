import { RequestHandler } from "../utils/request-handler";
import { config } from '../api-test-config';
import { APILogger } from "../utils/logger";
import { request } from "@playwright/test";

export async function createToken(username: string, password: string) {
    const context = await request.newContext()
    const logger = new APILogger()
    const api = new RequestHandler(context, config.apiUrl, logger)

    try {
        const tokenResponse = await api
        .path('/auth/login')
        .body({
            username,
            password
        })
        .postRequest(200)
    return `Bearer ${tokenResponse.accessToken}`

    } catch(error) {
        console.log('LOGIN PAYLOAD:', { username, password });
        Error.captureStackTrace(error, createToken)
        throw error
    } finally {
        await context.dispose()
    }
    
    
}