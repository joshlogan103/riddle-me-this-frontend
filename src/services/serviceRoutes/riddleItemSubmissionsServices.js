import { api } from "../apiConnection";

// TODO: createRiddleItemSubmission (payload)

// CREATE NEW RIDDLE ITEM SUBMISSION

export const getRiddleItemSubmissions = async (huntTemplateId, riddleItemId, participationId) => {
  return await api.get(`/hunt-templates/${huntTemplateId}/riddle-items/${riddleItemId}/participations/${participationId}/riddle-item-submissions/`);
};

// TODO: updateRiddleItemSubmissionById (payload)


// TODO: do we need GET or DELETE ??