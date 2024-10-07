import React, { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { signup } from "../api/users";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useContext(UserContext);

  const { mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => signup(formData),
    onSuccess: () => {
      setUser(true);
    },
    onError: (error) => {
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    mutate();
  };

  if (user) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="min-h-screen bg-[#344E41] flex flex-col py-12 sm:px-6 lg:px-8 font-telugu">
      {/* Header removed */}

      <div className="flex-grow flex flex-col justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h2 className="mt-6 text-left text-2xl font-bold text-white max-w-xs leading-tight">
            Register now and bring fresh, simple recipes to your table everyday.
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="py-8 px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Username"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#344E41] focus:border-[#344E41] sm:text-sm"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#344E41] focus:border-[#344E41] sm:text-sm"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Password"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#344E41] focus:border-[#344E41] sm:text-sm"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="Confirm Password"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#344E41] focus:border-[#344E41] sm:text-sm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="relative">
                <select
                  id="gender"
                  name="gender"
                  required
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#344E41] hover:bg-[#2A3F35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#344E41]"
                >
                  Sign up
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-center">
                  <Link
                    to="/signin"
                    className="font-medium text-[#344E41] hover:text-[#2A3F35]"
                  >
                    Already have an account?{" "}
                    <span className="underline">Sign in</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
