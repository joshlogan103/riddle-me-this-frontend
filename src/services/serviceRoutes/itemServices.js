import { api } from "../apiConnection";

export const getAllItems = async () => {
    return await api.get(`/items/`)
}