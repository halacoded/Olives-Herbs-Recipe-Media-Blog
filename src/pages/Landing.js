import React from "react";
import { Link, Outlet } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Landing = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    dotsClass: "slick-dots slick-thumb custom-dots", // Added custom-dots class
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "20px", // Moved dots slightly higher
          width: "100%",
        }}
      >
        <ul style={{ margin: "0" }}> {dots} </ul>
      </div>
    ),
  };

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

      <div className="flex-grow flex flex-col">
        <Outlet />

        <main className="flex-1 p-4 pt-8 flex flex-col">
          <div className="max-w-6xl mx-auto w-full flex">
            <div className="w-3/5 pr-8">
              <h1 className="mb-6 text-4xl">Welcome to Olives & Herbs!</h1>
              <h2 className="mb-10 text-2xl">
                Inspired by Nature, Made for You.
              </h2>

              <p className="leading-relaxed tracking-wide mb-6 text-lg">
                Discover fresh, seasonal ingredients and create nourishing meals
                that celebrate the beauty of nature. From hearty comfort foods
                to light, refreshing dishes, find recipes that cater to every
                palate and bring the flavors of each season to your table.
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

            <div className="w-2/5 pl-8">
              <div className="h-[600px] -mt-36 relative">
                {" "}
                {/* Added 'relative' class */}
                <Slider {...carouselSettings}>
                  <div className="relative">
                    <img
                      src="https://i.pinimg.com/564x/fe/d3/4d/fed34d3218c2f1056155437f881c2bf4.jpg"
                      alt="Seasonal ingredients"
                      className="w-full h-[600px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
                      <h3 className="text-3xl font-bold mb-2">
                        Fresh Ingredients
                      </h3>
                      <p className="text-xl">
                        Embrace the flavors of each season
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://i.pinimg.com/564x/5e/33/86/5e3386c9e1596e91930c9913e3842a9c.jpg"
                      alt="Nourishing meals"
                      className="w-full h-[600px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
                      <h3 className="text-3xl font-bold mb-2">
                        Nourishing Meals
                      </h3>
                      <p className="text-xl">
                        Fuel your body with wholesome goodness
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://i.pinimg.com/564x/df/be/62/dfbe62fa4a43cd437ec2d3fbd0d0399d.jpg"
                      alt="Nature-inspired dishes"
                      className="w-full h-[600px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
                      <h3 className="text-3xl font-bold mb-2">
                        Nature's Inspiration
                      </h3>
                      <p className="text-xl">
                        Dishes crafted from earth's bounty
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://i.pinimg.com/564x/2b/68/2b/2b682b3222cca3e21787e02354e343f6.jpg"
                      alt="Sweet Treats"
                      className="w-full h-[600px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
                      <h3 className="text-3xl font-bold mb-2">
                        Sweet Indulgence
                      </h3>
                      <p className="text-xl">
                        Discover our delightful confections
                      </p>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-olive-green text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              &copy; 2024 Olives & Herbs. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-300">
                About
              </a>
              <a href="#" className="hover:text-gray-300">
                Terms
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-300">
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
