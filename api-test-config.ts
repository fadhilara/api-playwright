import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

const processENV = process.env.TEST_ENV
const env = processENV || 'prod'
console.log('test env is: '+ env)

const config ={
    apiUrl: 'https://dummyjson.com',
    username: 'emilys',
    userPassword: 'emilyspass'

}

if(env == 'prod'){
    config.username = process.env.PROD_USERNAME || config.username
    config.userPassword = process.env.PROD_PASSWORD || config.userPassword
}

export {config}