import instance from ".";
const getAllCategories = async () => {
  try {
    const { data } = await instance.get("/category");
    return data; // The backend directly returns the array of categories
  } catch (error) {
    console.error(
      "Error fetching all categories:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const getOneCategory = async (id) => {
  try {
    const { data } = await instance.get(`/category/${id}`);
    return data; // The backend directly returns the category object
  } catch (error) {
    console.error(
      "Error fetching category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const createCategory = async (categoryInfo) => {
  try {
    const { data } = await instance.post("/category", categoryInfo);
    return data; // The backend returns the newly created category
  } catch (error) {
    console.error(
      "Error creating category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const updateCategory = async (id, categoryInfo) => {
  try {
    const { data } = await instance.put(`/category/${id}`, categoryInfo);
    return data; // The backend returns the updated category
  } catch (error) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
const deleteOneCategory = async (id) => {
  try {
    const { data } = await instance.delete(`/category/${id}`);
    return data; // The backend returns a success message
  } catch (error) {
    console.error(
      "Error deleting category:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteOneCategory,
};
