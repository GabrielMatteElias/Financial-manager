import { GetApp } from "@mui/icons-material";
import { api, requestConfig } from "../config";

export default async function UseFetch(endpoint, method, dados, contentType = 'application/json', token = null) {
    const config = requestConfig(method, dados, contentType, token)

    try {
        const response = await fetch(`${api}/${endpoint}`, config)

        const contentType = response.headers.get("content-type");


        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            return await response.text();
        }

    } catch (error) {
        throw error; // Permite que o chamador lide com o erro
    }
}