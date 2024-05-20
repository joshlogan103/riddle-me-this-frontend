import { api } from "../apiConnection";

// TODO: getAllItems
export const getAllItems = async () => {
    return await api.get(`/items/`)
}