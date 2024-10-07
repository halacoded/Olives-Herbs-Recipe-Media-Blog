import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen bg-olive text-white font-['Telugu_MN']">
      <nav className="p-4 pt-16 pl-28">
        <Link
          to="/home"
          className="mr-8 text-white underline hover:font-bold transition-all duration-300"
        >
          Explore
        </Link>
        <Link
          to="/SignIn"
          className="text-white underline hover:font-bold transition-all duration-300"
        >
          Sign in
        </Link>
      </nav>

      <Outlet />

      <div className="flex flex-1">
        <main className="flex-1 p-4 pt-8 flex flex-col">
          <div className="max-w-2xl pl-28">
            <h1 className="mb-6 text-4xl">Welcome to Olives & Herbs!</h1>
            <h2 className="mb-10 text-2xl">
              Inspired by Nature, Made for You.
            </h2>

            <p className="leading-relaxed tracking-wide mb-6 text-lg">
              Discover fresh, seasonal ingredients and create nourishing meals
              that celebrate the beauty of nature. From hearty comfort foods to
              light, refreshing dishes, find recipes that cater to every palate
              and bring the flavors of each season to your table.
            </p>

            <div className="inline-block bg-[#A4B4A8] rounded-lg p-3">
              <p className="text-lg text-[#344E41]">
                Click here to{" "}
                <Link
                  to="/SignUp"
                  className="text-[#344E41] hover:underline font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      <footer className="py-4 px-6 bg-[#344E41] text-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">&copy; 2024-2025 Olives & Herbs</div>
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <Link
              to="/about"
              className="text-white hover:underline transition-all duration-300 mb-2 md:mb-0 md:mr-4"
            >
              About
            </Link>
            <Link
              to="/terms"
              className="text-white hover:underline transition-all duration-300"
            >
              Terms
            </Link>
          </div>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
