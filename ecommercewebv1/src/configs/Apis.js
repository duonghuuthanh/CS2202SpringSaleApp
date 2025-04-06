import axios from "axios"

const BASE_URL = 'http://localhost:8080/SpringSaleAppV1/api/'


export const endpoints = {
    'categories': '/categories',
    'products': '/products',
    'register': '/users',
    'login': '/login'
}

export default axios.create({
    baseURL: BASE_URL
});