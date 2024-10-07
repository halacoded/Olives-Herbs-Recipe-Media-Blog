import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllRecipes } from "../api/recipes";
import RecipeModal from "./RecipeModal";

const NavItem = ({ title, content }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="px-4 py-2 rounded transition-colors relative">
        {title}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${
            isHovered ? "scale-x-100" : "scale-x-0"
          }`}
        ></span>
      </button>
      {isHovered && (
        <div className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700">{content}</div>
          </div>
        </div>
      )}
    </li>
  );
};

export const Recipes = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const {
    data: recipes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  const handleCreateRecipe = () => {
    setEditingRecipe(null);
    setShowModal(true);
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingRecipe(null);
    refetch();
  };

  return (
    <div className="bg-olive min-h-screen flex flex-col p-12 text-white font-telugu">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-olive-light transition-colors mr-4"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Recipes</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => {
              /* Add logout logic here */
            }}
            className="bg-white text-olive hover:bg-gray-100 font-bold py-2 px-4 rounded transition-colors mr-4"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-olive-dark flex items-center justify-center text-xl font-bold text-white border-2 border-white w-12 h-12 rounded-full"
            aria-label="Go to profile"
          >
            JS
          </button>
        </div>
      </div>

      <nav className="mb-8">
        <ul className="flex justify-between items-center bg-olive-light rounded-lg p-2">
          <NavItem
            title="Popular"
            content="View the most popular recipes among our users."
          />
          <NavItem
            title="New Recs"
            content="Check out the latest recipe recommendations."
          />
          <NavItem
            title="Breakfast"
            content="Explore delicious breakfast recipes to start your day."
          />
          <NavItem
            title="More"
            content="Discover additional categories and features."
          />
        </ul>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-12">
        <button
          className="rounded-lg p-6 shadow-md w-full h-64 flex items-center justify-center transition-all hover:bg-opacity-90 bg-white"
          onClick={handleCreateRecipe}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-olive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        {recipes &&
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-lg p-6 shadow-md w-full h-64 relative"
            >
              <h3 className="text-olive text-xl font-bold mb-2">
                {recipe.name}
              </h3>
              <img
                src={"http://localhost:10000/" + recipe.recipeImage}
                alt={recipe.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="text-olive-dark">{recipe.description}</p>
              <p className="text-olive-dark mt-2">
                Time to cook: {recipe.timeToCook} minutes
              </p>
              <p className="text-olive-dark">Calories: {recipe.calories}</p>
              <button
                onClick={() => handleEditRecipe(recipe)}
                className="absolute bottom-4 right-4 bg-olive text-white p-2 rounded-full hover:bg-olive-dark transition-colors"
                aria-label="Edit recipe"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          ))}
      </div>
      {isLoading && <p>Loading recipes...</p>}
      {error && <p className="text-red-500">{error.message}</p>}

      <RecipeModal
        show={showModal}
        onClose={handleCloseModal}
        recipe={editingRecipe}
      />
    </div>
  );
};
