import { api } from "../apiConnection";

// TODO: getRiddleItemsByTempate
export const getRiddleItemsByTemplate = async (huntTemplateId) => {
    return await api.get(`/hunt-templates/${huntTemplateId}/riddle-items/`)
}

// TODO: createRiddleItemByTemplate
export const createRiddleItemByTemplate = async (huntId, payload) => {
    return await api.post(`/hunt-templates/${huntId}/riddle-items/`, payload, {
        headers: {
            "Content-Type": "application/json",
          },
    })
}

// TODO: getRiddleItemById
export const getRiddleItemById = async (huntId, riddleItemId) => {
    return await api.get(`/hunt-templates/${huntId}/riddle-items/${riddleItemId}`)
}

// TODO: updateRiddleItemById
export const updateRiddleItemById = async (huntId, riddleItemId, payload) => {
    return await api.put(`/hunt-templates/${huntId}/riddle-items/${riddleItemId}`, payload, {
        headers: {
            "Content-Type": "application/json",
          },
    })
}

// TODO: deleteRiddleItemById
export const deleteRiddleItemById = async (huntId, riddleItemId) => {
    return await api.delete(`/hunt-templates/${huntId}/riddle-items/${riddleItemId}`)
}