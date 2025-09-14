import React from "react";

const GenderSelector = ({ selectedGender, onGenderChange }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-3 text-center text-2xl">Jenis Kelamin</h3>
      <div className="flex justify-center items-center gap-8">
        {/* Man */}
        <div
          className={`flex flex-col items-center gap-2 p-4 rounded-3xl cursor-pointer transition-all duration-300 w-32 h-32 justify-center ${
            selectedGender === "Man"
              ? "bg-blue-100 border-2 border-blue-500 shadow-lg"
              : "bg-gray-100 border-2 border-transparent"
          }`}
          onClick={() => onGenderChange("Man")}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedGender === "Man" ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium text-gray-700">Man</span>
        </div>

        {/* Woman */}
        <div
          className={`flex flex-col items-center gap-2 p-4 rounded-3xl cursor-pointer transition-all duration-300 w-32 h-32 justify-center ${
            selectedGender === "Woman"
              ? "bg-pink-100 border-2 border-pink-500 shadow-lg"
              : "bg-gray-100 border-2 border-transparent"
          }`}
          onClick={() => onGenderChange("Woman")}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              selectedGender === "Woman" ? "bg-pink-200" : "bg-gray-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-pink-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="font-medium text-gray-700">Woman</span>
        </div>
      </div>
    </div>
  );
};

export default GenderSelector;
