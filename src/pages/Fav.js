import React, { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getFavoriteRecipes, removeFromFavorites } from "../api/users";

export const Fav = () => {
  const [user] = useContext(UserContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: favoriteRecipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favoriteRecipes"],
    queryFn: getFavoriteRecipes,
    enabled: !!user,
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries(["favoriteRecipes"]);
    },
  });

  const handleRemoveFavorite = (recipeId) => {
    removeFavoriteMutation.mutate(recipeId);
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  if (!user) {
    return (
      <div className="bg-olive min-h-screen flex flex-col items-center justify-center p-5 text-white">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
        <p>Please sign in to view your favorite recipes.</p>
        <button
          onClick={() => navigate("/signin")}
          className="mt-4 bg-white text-olive px-4 py-2 rounded hover:bg-olive-light hover:text-white transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="bg-olive min-h-screen flex flex-col p-5 text-white">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-olive-light transition-colors mr-4"
            aria-label="Return to Home"
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
          <h1 className="text-3xl font-bold">Favorite Recipes</h1>
        </div>
      </header>
      {isLoading && <p>Loading favorite recipes...</p>}
      {error && <p>Error loading favorite recipes: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes &&
          favoriteRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="border rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-olive-dark hover:shadow-lg relative"
            >
              <div onClick={() => handleRecipeClick(recipe._id)}>
                <h2 className="text-xl font-semibold mb-2 transition-colors duration-300 ease-in-out hover:text-yellow-300">
                  {recipe.name}
                </h2>
                {recipe.user && (
                  <p className="text-sm mb-2">
                    Created by: {recipe.user.username}
                  </p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFavorite(recipe._id);
                }}
                className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
