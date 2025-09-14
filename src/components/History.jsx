import React from "react";

const History = ({ history, onDelete }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Riwayat</h2>
        <p className="font-reguler text-gray-500">There is no history here yet.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Riwayat</h2>
        <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm">
              <div>
                <p className="font-bold text-gray-700 text-2xl">
                  {item.name} ({item.gender})
                </p>
                <p className="font-regular text-gray-700">
                  {item.bmi} - {item.category}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {history.length > 0 && (
          <button
            onClick={onDelete}
            className="w-full mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            X Delete All History
          </button>
        )}
      </div>
    </div>
  );
};

export default History;
