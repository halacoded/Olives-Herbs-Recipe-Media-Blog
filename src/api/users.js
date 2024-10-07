import instance from ".";
import { storeToken } from "./storage";
const signup = async (userData) => {
  try {
    const { data } = await instance.post("/users/signup", userData);
    storeToken(data.token); // <--- This
    return data;
  } catch (error) {
    console.error("Error signing up:", error.response?.data || error.message);
    throw error;
  }
};

const signin = async (credentials) => {
  try {
    const { data } = await instance.post("/users/signin", credentials);
    storeToken(data.token); // <--- This
    return data;
  } catch (error) {
    console.error("Error signing in:", error.response?.data || error.message);
    throw error;
  }
};

const getMe = async () => {
  try {
    const { data } = await instance.get("/users/me");
    return data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getProfile = async (id) => {
  try {
    const { data } = await instance.get(`/users/profile/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getAllUsers = async (username) => {
  try {
    const { data } = await instance.get("/users/all", { params: { username } });
    return data;
  } catch (error) {
    console.error(
      "Error fetching all users:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const updateUser = async (userData) => {
  try {
    const { data } = await instance.put("/users/update", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const followUser = async (id) => {
  try {
    const { data } = await instance.post(`/users/${id}/follow`);
    return data;
  } catch (error) {
    console.error(
      "Error following user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const unfollowUser = async (id) => {
  try {
    const { data } = await instance.post(`/users/${id}/unfollow`);
    return data;
  } catch (error) {
    console.error(
      "Error unfollowing user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getFavoriteRecipes = async () => {
  try {
    const { data } = await instance.get("/users/favorites");
    return data;
  } catch (error) {
    console.error(
      "Error fetching favorite recipes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const addToFavorites = async (recipeId) => {
  try {
    const { data } = await instance.post(`/users/favorites/${recipeId}`);
    return data;
  } catch (error) {
    console.error(
      "Error adding to favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const removeFromFavorites = async (recipeId) => {
  try {
    const { data } = await instance.delete(`/users/favorites/${recipeId}`);
    return data;
  } catch (error) {
    console.error(
      "Error removing from favorites:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export {
  signup,
  signin,
  getMe,
  getProfile,
  getAllUsers,
  updateUser,
  followUser,
  unfollowUser,
  getFavoriteRecipes,
  addToFavorites,
  removeFromFavorites,
};
