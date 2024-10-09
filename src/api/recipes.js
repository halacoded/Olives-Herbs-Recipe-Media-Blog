import instance from ".";

const getAllRecipes = async () => {
  try {
    const { data } = await instance.get("/recipes");
    return data;
  } catch (error) {
    console.error(
      "Error fetching all recipes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getOneRecipe = async (id) => {
  try {
    const { data } = await instance.get(`/recipes/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createRecipe = async (recipeData) => {
  try {
    console.log(recipeData);
    const formData = new FormData();
    for (const key in recipeData) formData.append(key, recipeData[key]);
    const { data } = await instance.post("/recipes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        `Server error: ${
          error.response.data.message || error.response.statusText
        }`
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server. Please try again.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error creating recipe: ${error.message}`);
    }
  }
};

const updateRecipe = async (id, recipeData) => {
  try {
    console.log("Updating recipe with ID:", id);
    const formData = new FormData();
    for (const key in recipeData) formData.append(key, recipeData[key]);

    const { data } = await instance.put(`/recipes/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error(
      "Error updating recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteOneRecipe = async (id) => {
  try {
    const { data } = await instance.delete(`/recipes/${id}`);
    return data;
  } catch (error) {
    console.error(
      "Error deleting recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const toggleLikeRecipe = async (id) => {
  try {
    const { data } = await instance.post(`/recipes/${id}/like`);
    return data;
  } catch (error) {
    console.error(
      "Error toggling like for recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const toggleDislikeRecipe = async (id) => {
  try {
    const { data } = await instance.post(`/recipes/${id}/dislike`);
    return data;
  } catch (error) {
    console.error(
      "Error toggling dislike for recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getLikesForRecipe = async (id) => {
  try {
    const { data } = await instance.get(`/recipes/${id}/likes`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching likes for recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getDislikesForRecipe = async (id) => {
  try {
    const { data } = await instance.get(`/recipes/${id}/dislikes`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching dislikes for recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const searchRecipes = async (searchParams) => {
  try {
    const { query, cookTime, calories, ingredient, category } = searchParams;
    let url = "/recipes/search?";

    if (query) url += `query=${encodeURIComponent(query)}&`;
    if (cookTime) url += `cookTime=${encodeURIComponent(cookTime)}&`;
    if (calories) url += `calories=${encodeURIComponent(calories)}&`;
    if (ingredient) url += `ingredient=${encodeURIComponent(ingredient)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;

    // Remove the trailing '&' if it exists
    url = url.replace(/&$/, "");

    const { data } = await instance.get(url);
    return data;
  } catch (error) {
    console.error(
      "Error searching recipes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  updateRecipe,
  deleteOneRecipe,
  toggleLikeRecipe,
  toggleDislikeRecipe,
  getLikesForRecipe,
  getDislikesForRecipe,
  searchRecipes, // Add this new export
};
