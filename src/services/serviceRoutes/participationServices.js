import { api } from "../apiConnection";

export const getPartByProfileAndHuntInstance = async (profileId, huntId) => {
  return await api.get(`/profiles/${profileId}/hunt-instance/${huntId}/participations/`);
};

export const getPartByProfile = async (profileId) => {
  return await api.get(`/profiles/${profileId}/participations/`);
};

export const getPartByHuntInst = async (huntId) => {
  return await api.get(`/hunt-instance/${huntId}/participations/`);
};

export const countCorrectSubmissionsByParticipation = async (participationId) => {
  return await api.get(`/participations/${participationId}/count-correct/`);
}

export const createParticipation = async (profileId, huntInstId, payload) => {
  return await api.post(
    `/profiles/${profileId}/hunt-instance/${huntInstId}/participations/create/`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getPartById = async (profileId, huntInstId, partId) => {
  return await api.get(
    `/profiles/${profileId}/hunt-instance/${huntInstId}/participations/${partId}`
  );
};

export const updatePartById = async (
  profileId,
  huntInstId,
  partId,
  payload
) => {
  return await api.put(
    `/profiles/${profileId}/hunt-instance/${huntInstId}/participations/${partId}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deletePartById = async (profileId, huntInstId, partId) => {
  return await api.delete(
    `/profiles/${profileId}/hunt-instance/${huntInstId}/participations/${partId}`
  );
};
