import React from "react";

const Counter = ({ label, value, onIncrement, onDecrement, onChange, maxDigit, maxValue }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center flex-1 shadow-inner">
      <p className="text-gray-600 font-medium mb-2">{label}</p>
      <div className="flex items-center justify-center gap-4">
        {/* Tombol - */}
        <button
          onClick={onDecrement}
          className="w-8 h-8 rounded-full bg-red-500 text-white font-bold text-xl flex items-center justify-center transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          -
        </button>

        {/* Input */}
        <input
          type="number"
          value={value.toString()}
          onChange={(e) => {
            let val = e.target.value.replace(/\D/g, ""); //Non digit, global variabel
            if (val.length > maxDigit) return;
            if (Number(val) > maxValue) return;
            onChange(val === "" ? "" : Number(val));
          }}
          className="text-5xl font-bold text-gray-800 w-20 text-center bg-transparent focus:outline-none"
        />

        {/* Tombol + */}
        <button
          onClick={onIncrement}
          className="w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-xl flex items-center justify-center transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
