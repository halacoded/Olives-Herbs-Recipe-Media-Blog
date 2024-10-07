import instance from ".";

const getCommentsForRecipe = async (recipeId) => {
  try {
    const { data } = await instance.get(`/comments/recipe/${recipeId}`);
    return data;
  } catch (error) {
    console.error(
      "Error fetching comments for recipe:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const createComment = async (recipeId, content) => {
  try {
    const { data } = await instance.post(`/comments/recipe/${recipeId}`, {
      content,
    });
    return data;
  } catch (error) {
    console.error(
      "Error creating comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const deleteComment = async (commentId) => {
  try {
    const { data } = await instance.delete(`/comments/${commentId}`);
    return data;
  } catch (error) {
    console.error(
      "Error deleting comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const replyToComment = async (commentId, content) => {
  try {
    const { data } = await instance.post(`/comments/${commentId}/reply`, {
      content,
    });
    return data;
  } catch (error) {
    console.error(
      "Error replying to comment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export { getCommentsForRecipe, createComment, deleteComment, replyToComment };
