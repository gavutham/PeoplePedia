import axios from "axios"

const BASE_URL = "http://localhost:2000/api/"

export const apiRequest = axios.create({
    baseURL: BASE_URL,
})