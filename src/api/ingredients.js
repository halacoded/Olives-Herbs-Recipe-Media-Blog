import instance from ".";
const getAllIngredients = async () => {
  try {
    const { data } = await instance.get("/ingredients");
    return data; // The backend directly returns the array of ingredients
  } catch (error) {
    console.error(
      "Error fetching all ingredients:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const getOneIngredient = async (id) => {
  try {
    const { data } = await instance.get(`/ingredients/${id}`);
    return data; // The backend directly returns the ingredient object
  } catch (error) {
    console.error(
      "Error fetching ingredient:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const createIngredient = async (ingredientInfo) => {
  try {
    const { data } = await instance.post("/ingredients", ingredientInfo);
    return data; // The backend returns the newly created ingredient
  } catch (error) {
    console.error(
      "Error creating ingredient:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const updateIngredient = async (id, ingredientInfo) => {
  try {
    const { data } = await instance.put(`/ingredients/${id}`, ingredientInfo);
    return data; // The backend returns the updated ingredient
  } catch (error) {
    console.error(
      "Error updating ingredient:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const deleteOneIngredient = async (id) => {
  try {
    const { data } = await instance.delete(`/ingredients/${id}`);
    return data; // The backend returns a success message
  } catch (error) {
    console.error(
      "Error deleting ingredient:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export {
  getAllIngredients,
  getOneIngredient,
  createIngredient,
  updateIngredient,
  deleteOneIngredient,
};
