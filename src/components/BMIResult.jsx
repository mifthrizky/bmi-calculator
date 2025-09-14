import React from "react";

const BMIResult = ({ bmi, category }) => {
  if (!bmi) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Bmi Result</h2>
        <p className="font-reguler text-gray-500">Enter your weight and your age, then press the Calculate button.</p>
      </div>
    );
  }

  const getCategoryStyle = (cat) => {
    switch (cat) {
      case "Underweight":
        return { color: "text-blue-500", bgColor: "bg-blue-200" };
      case "Normal Weight":
        return { color: "text-green-500", bgColor: "bg-green-200" };
      case "Overweight":
        return { color: "text-yellow-500", bgColor: "bg-yellow-100" };
      case "Obese":
        return { color: "text-red-500", bgColor: "bg-red-100" };
    }
  };

  const style = getCategoryStyle(category);

  //Posisi indikator
  //Skala : <18.5, 18.5 - 24.9, 25-29.9, >30
  //Rentang yg ditampilkan ~15 sampe ~35
  const minBMI = 15;
  const maxBMI = 35;
  const percentage = Math.max(0, Math.min(100, ((bmi - minBMI) / (maxBMI - minBMI)) * 100));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Your Bmi Result</h2>
      <div className="text-center mb-4">
        <p className="text-5xl font-extrabold text-gray-900">{bmi}</p>
        <p className={`mt-2 text-lg font-semibold px-4 py-1 rounded-full inline-block ${style.bgColor} ${style.color}`}>
          {category}
        </p>
      </div>

      <div className="w-full mt-6">
        <div className="relative pt-3 pb-3">
          {/* Bar */}
          <div className="w-full h-4 rounded-full flex overflow-hidden">
            <div className="flex-1 bg-red-500"></div>
            <div className="flex-1 bg-green-400"></div>
            <div className="flex-1 bg-yellow-400"></div>
            <div className="flex-1 bg-red-500"></div>

            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-800 rounded-full shadow-lg"
              style={{ left: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="flex justify-between text-sm text-black mt-2">
        <span className="flex-1 text-center">UnderWeight</span>
        <span className="flex-1 text-center">Normal Weight</span>
        <span className="flex-1 text-center">Over Weight</span>
        <span className="flex-1 text-center">Obese</span>
      </div>
    </div>
  );
};

export default BMIResult;
