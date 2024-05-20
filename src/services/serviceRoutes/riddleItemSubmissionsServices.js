import { api } from "../apiConnection";

// TODO: createRiddleItemSubmission (payload)

// CREATE NEW RIDDLE ITEM SUBMISSION

export const createRiddleItemSubmission = async (huntTemplateId, riddleItemId, participationId, payload) => {
  return await api.post(`/hunt-templates/${huntTemplateId}/riddle-items/${riddleItemId}/participations/${participationId}/riddle-item-submissions/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// TODO: updateRiddleItemSubmissionById (payload)

// UPDATE A RIDDLE ITEM SUBMISSION BY ID

export const updateRiddleItemSubmissionByID = async (huntTemplateId, riddleItemId, participationId, riddleItemSubmissionId, payload) => {
  return await api.put(`/hunt-templates/${huntTemplateId}/riddle-items/${riddleItemId}/participations/${participationId}/riddle-item-submissions/${riddleItemSubmissionId}/`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// TODO: do we need GET or DELETE ??

// GET NEW RIDDLE ITEM SUBMISSION

export const getRiddleItemSubmissions = async (huntTemplateId, riddleItemId, participationId) => {
  return await api.get(`/hunt-templates/${huntTemplateId}/riddle-items/${riddleItemId}/participations/${participationId}/riddle-item-submissions/`);
};
