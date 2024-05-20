import { api } from "../apiConnection";

// GET ALL HUNT TEMPLATES FOR A USER

export const getHuntTemplatesByUser = async (userId) => {
  return await api.get(`/users/${userId}/hunt-templates/`);
}

// CREATE NEW HUNT TEMPLATTE

export const createHuntTemplate = async (payload) => {
  return await api.post(`/hunt-templates/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// GET DETAILS OF A SPECIFIC HUNT TEMPLATE BY ID

export const getHuntTemplateById = async (huntTemplateId) => {
  return await api.get(`/hunt-templates/${huntTemplateId}/`);
}

