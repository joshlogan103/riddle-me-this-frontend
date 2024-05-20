import { api } from "../apiConnection";

export const createUser = async (payload) => {
  return await api.post("/users/register/", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginUser = async (payload) => {
    return await api.post("/users/login/", payload, {
        headers: {
            "Content-Type": "application/json",
          },
    })
}

export const tokenRefresh = async () => {
    return await api.get("/users/token/refresh/")
}

// PROFILE

export const getProfile = async (userId, profileId) => {
    return await api.get(`/users/${userId}/profiles/${profileId}/`)
}