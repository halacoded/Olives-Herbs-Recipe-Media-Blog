import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { getAllRecipes } from "../api/recipes";
import { logout } from "../api/storage";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getAllRecipes,
  });

  const handleSignOut = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const filteredRecipes = recipes
    ? recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="bg-olive min-h-screen flex flex-col p-5 text-white">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-olive-light transition-colors mr-4"
            aria-label="Return to Landing Page"
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
          <h1 className="text-3xl font-bold">Welcome to Olives & Herbs</h1>
        </div>
        <button
          onClick={user ? handleSignOut : handleSignIn}
          className="bg-white text-olive px-4 py-2 rounded hover:bg-olive-light hover:text-white transition-colors"
        >
          {user ? "Sign Out" : "Sign In"}
        </button>
      </header>
      <input
        type="text"
        placeholder="Search recipes..."
        className="w-full p-2 mb-4 border rounded text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading && <p>Loading recipes...</p>}
      {error && <p>Error loading recipes: {error.message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="border rounded-lg p-4 shadow-md cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-olive-dark hover:shadow-lg"
            onClick={() => handleRecipeClick(recipe._id)}
          >
            <h2 className="text-xl font-semibold mb-2 transition-colors duration-300 ease-in-out hover:text-yellow-300">
              {recipe.name}
            </h2>
            {recipe.user && (
              <p className="text-sm mb-2">Created by: {recipe.user.username}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
