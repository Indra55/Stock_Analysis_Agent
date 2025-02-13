import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-[#212121] py-4 border-b border-gray-200 dark:border-gray-800  ">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold text-gray-800 dark:text-white">
          QuantMosaic
        </Link>
        <nav className="flex items-center space-x-6">
          <Link
            to="/about"
            className="text-lg text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            About
          </Link>
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center px-1 transition-all">
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {darkMode ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-gray-800" />}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
