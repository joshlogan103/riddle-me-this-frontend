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

/// UPDATE A HUNT TEMPLATE BY ID

export const updateHuntTemplate = async (huntTemplateId, payload) => { 
  return await api.put(`/hunt-templates/${huntTemplateId}/`, payload, {
  headers: {
    "Content-Type": "application/json",
  },
});
};

// DELETE A HUNT TEMPLATE BY ID

export const deleteHuntTemplate = async (huntTemplateId) => {
  return await api.delete(`/hunt-templates/${huntTemplateId}/`);
}
