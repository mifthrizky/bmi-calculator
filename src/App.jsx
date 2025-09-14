import { useEffect, useState, useRef } from "react";
import GenderSelector from "./components/GenderSelector";
import Counter from "./components/Counter";
import BMIResult from "./components/BMIResult";
import History from "./components/History";

const App = () => {
  //State data input
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Man");
  const [height, setHeight] = useState(150);
  const [weight, setWeight] = useState(60);
  const [age, setAge] = useState(20);

  //State data output
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  // ref slider
  const heightSliderRef = useRef(null);

  useEffect(() => {
    if (heightSliderRef.current) {
      const min = 100;
      const max = 200;
      // Pastikan nilai tidak kosong saat kalkulasi
      const currentHeight = height === "" ? min : Number(height);
      const progress = ((currentHeight - min) / (max - min)) * 100;
      heightSliderRef.current.style.setProperty("--range-progress", `${progress}%`);
    }
  }, [height]);

  // Load history from local
  const [history, setHistory] = useState(() => {
    try {
      const savedHistory = localStorage.getItem("bmiHistory");
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (err) {
      console.error("History corrupted, reset to empty:", err);
      return [];
    }
  });

  //Save history to local
  useEffect(() => {
    localStorage.setItem("bmiHistory", JSON.stringify(history));
  }, [history]);

  //Fungsi calculate BMI
  const calculateBMI = () => {
    if (!name.trim()) {
      setError("Please insert your name.");
      return;
    }
    setError("");
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

    let bmiCategory = "";

    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiValue >= 18.6 && bmiValue <= 24.9) {
      bmiCategory = "Normal Weight";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      bmiCategory = "Overweight";
    } else if (bmiValue >= 30) {
      bmiCategory = "Obese";
    }

    setBmi(bmiValue);
    setCategory(bmiCategory);

    // Tambah ke history
    const newHistoryEntry = {
      name,
      gender,
      bmi: bmiValue,
      category: bmiCategory,
    };
    setHistory([newHistoryEntry, ...history]);
  };

  // Hapus history
  const clearHistory = () => {
    if (confirm("Sure want to delete all BMI history ?")) {
      setHistory([]);
      localStorage.removeItem("bmiHistory");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800">Calculator BMI</h1>
          <p className="text-gray-600 mt-2">
            Body mass index (BMI) is a measure of body fat based on height and weight that applies to man and woman.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="space-y-6">
              {/* Jenis Kelamin */}
              <GenderSelector selectedGender={gender} onGenderChange={setGender} />

              {/* Nama */}
              <div>
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Input your name.."
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>

              {/* Tinggi Badan */}
              <div>
                <label htmlFor="height" className="block text-gray-800 font-semibold mb-2">
                  Height :{" "}
                  <input
                    type="number"
                    value={height.toString()}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, "");
                      if (val.length > 3) return;
                      if (Number(val) > 200) return;
                      setHeight(val === "" ? "" : Number(val));
                    }}
                    className="text-4xl font-bold text-gray-800 w-20 text-center bg-transparent focus:outline-none"
                  />
                </label>

                {/* Tinggi Slider */}
                <input
                  type="range"
                  id="height"
                  ref={heightSliderRef}
                  min="100"
                  max="200"
                  value={height === "" ? 100 : height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </div>

              {/* Berat dan Usia */}
              <div className="flex flex-col sm-flex-row gap-6">
                <Counter
                  label="Weight (kg)"
                  value={weight}
                  onIncrement={() => setWeight((w) => w + 1)}
                  onDecrement={() => setWeight((w) => (w > 0 ? w - 1 : 0))}
                  onChange={(val) => setWeight(val > 0 ? val : 0)}
                  maxDigit={3}
                  maxValue={300}
                />

                <Counter
                  label="Age"
                  value={age}
                  onIncrement={() => setAge((a) => a + 1)}
                  onDecrement={() => setAge((a) => (a > 0 ? a - 1 : 0))}
                  onChange={(val) => setAge(val > 0 ? val : 0)}
                  maxDigit={2}
                  maxValue={99}
                />
              </div>

              {/* Button Calculate BMI */}
              <button
                onClick={calculateBMI}
                className="w-full bg-[#e50158] text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-[#d10151] transition-transform transform hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                Calculate BMI
              </button>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <BMIResult bmi={bmi} category={category} />
            <History history={history} onDelete={clearHistory} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
