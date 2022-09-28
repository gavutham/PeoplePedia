import axios from "axios"

const BASE_URL = "https://peoplepediaapi.herokuapp.com/api/"

export const apiRequest = axios.create({
    baseURL: BASE_URL,
})