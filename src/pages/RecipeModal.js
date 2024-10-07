import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe, updateRecipe } from "../api/recipes";
import { createIngredient } from "../api/ingredients";
import { createCategory } from "../api/category";

const RecipeModal = ({ onClose, show, recipe }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructions: "",
    timeToCook: "",
    calories: "",
    recipeImage: "",
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name || "",
        description: recipe.description || "",
        instructions: recipe.instructions.join(", ") || "",
        timeToCook: recipe.timeToCook || "",
        calories: recipe.calories || "",
      });
      setIngredients(recipe.ingredients || []);
      setCategories(recipe.category || []);
    }
  }, [recipe]);

  const createIngredientMutation = useMutation({
    mutationFn: createIngredient,
    onSuccess: (data) => {
      setIngredients([...ingredients, { _id: data._id, name: data.name }]);
      setNewIngredient("");
    },
    onError: (error) => {
      setError(`Failed to add ingredient: ${error.message}`);
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      setCategories([...categories, { _id: data._id, name: data.name }]);
      setNewCategory("");
    },
    onError: (error) => {
      setError(`Failed to add category: ${error.message}`);
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: recipe ? updateRecipe : createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      onClose();
    },
    onError: (error) => {
      setError(error.message || "An error occurred while saving the recipe.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
    setFormData((prev) => ({ ...prev, recipeImage: e.target.files[0] }));
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      createIngredientMutation.mutate({ name: newIngredient.trim() });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      createCategoryMutation.mutate({ name: newCategory.trim() });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    mutate(recipe ? { id: recipe._id, data: formData } : formData);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w-xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-olive">
          {recipe ? "Edit Recipe" : "Add New Recipe"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={
                  key === "timeToCook" || key === "calories" ? "number" : "text"
                }
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50 text-black"
                required
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recipe Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-olive file:text-white
                hover:file:bg-olive-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="flex-grow rounded-l-md border-gray-300 focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50 text-black"
                placeholder="Add ingredient"
              />
              <button
                type="button"
                onClick={handleAddIngredient}
                className="bg-olive text-white px-4 rounded-md hover:bg-olive-dark transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {ingredients.map((ingredient) => (
                <li key={ingredient._id} className="flex items-center">
                  <span className="text-gray-700">{ingredient.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIngredients(
                        ingredients.filter((ing) => ing._id !== ingredient._id)
                      );
                    }}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-grow rounded-l-md border-gray-300 focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50 text-black"
                placeholder="Add category"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="bg-olive text-white px-4 rounded-md hover:bg-olive-dark transition-colors"
              >
                Add
              </button>
            </div>
            <ul className="mt-2">
              {categories.map((category) => (
                <li key={category._id} className="flex items-center">
                  <span className="text-gray-700">{category.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCategories(
                        categories.filter((cat) => cat._id !== category._id)
                      );
                    }}
                    className="ml-2 text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-olive text-white px-4 py-2 rounded-md hover:bg-olive-dark transition-colors"
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : recipe
                ? "Update Recipe"
                : "Add Recipe"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default RecipeModal;
