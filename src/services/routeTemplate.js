export const getProfiles = async () => {
  return await api.get("/profiles");
};

export const getProfileByUserId = async (userId) => {
  return await api.get(`/profiles/user-profile/${userId}`);
};

export const getProfilesByQuery = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  console.log(queryParams);
  return await api.get(`/profiles/query?${queryParams}`);
};

export const getProfileById = async (id) => {
  return await api.get(`/profiles/${id}`);
};

export const createProfile = async (payload) => {
  return await api.post("/profiles/", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateProfileByUserId = async (userId, payload) => {
  return await api.put(`/profiles/user-profile/${userId}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateProfileById = async (id, payload) => {
  return await api.put(`/profiles/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProfileById = async (id) => {
  return await api.delete(`/profiles/${id}`);
};
