import { api } from "../apiConnection";

export const getPartByProfile = async (profileId) => {
    return await api.get(`profiles/${profileId}/participations/`)
}

export const getPartByHuntInst = async (huntId) => {
    return await api.get(`hunt-instance/${huntId}/participations/`)
}

