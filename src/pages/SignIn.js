import React, { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { signin } from "../api/users"; // Ensure this import matches your project structure

export const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);

  const { mutate } = useMutation({
    mutationKey: ["signin"],
    mutationFn: () => signin(formData),
    onSuccess: () => {
      setUser(true);
    },
    onError: (error) => {
      setError(
        error.response?.data?.message || "An error occurred during signin"
      );
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#344E41]">
      <div className="w-[500px] h-[500px] relative -mt-16">
        <div className="absolute inset-0">
          <img
            src="https://i.pinimg.com/564x/1f/ed/2a/1fed2a16fe518e7a8543dafd477a629b.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center h-full p-8">
          <h2 className="mb-6 text-3xl tracking-tight text-white text-left">
            Welcome back! Let's whip up something fresh and delicious.
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-3 py-2 placeholder-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:text-sm bg-white bg-opacity-40 hover:bg-opacity-50"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-3 py-2 placeholder-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 sm:text-sm bg-white bg-opacity-40 hover:bg-opacity-50"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-white hover:text-gray-200 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm text-white bg-white bg-opacity-40 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              Sign in
            </button>
          </form>
          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
          <div className="mt-4 text-center">
            <p className="text-white">
              New here?{" "}
              <Link to="/signup" className="text-white hover:text-gray-200">
                <span className="underline">Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
