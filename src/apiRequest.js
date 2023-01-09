import axios from "axios";

const BASE_URL = "https://peoplepediaapi.onrender.com/api/";

export const apiRequest = axios.create({
	baseURL: BASE_URL,
});
