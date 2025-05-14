import { useEffect, useState, useMemo } from "react";
import helmets from "../data/helmets";
import HelmetCard from "./HelmetCard";
import { fetchHelmetData } from "../services/fetchHelmets";
import { generateDistanceTable } from "../utils/distance";
import HelmetMap from "./HelmetMap";

export default function Dashboard() {
  const [helmetData, setHelmetData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update only the dynamic helmet data (e.g., gas, temp, humidity, fall)
  useEffect(() => {
    updateHelmetData(true); // first time, show loading
    const interval = setInterval(() => updateHelmetData(false), 5000); // Update data every 5 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const updateHelmetData = async (showLoading = false) => {
    if (showLoading) setIsLoading(true); // Show loading state initially
    try {
      const updatedHelmetData = await Promise.all(
        helmets.map(async (helmet) => {
          const values = await fetchHelmetData(helmet.token);
          return { ...helmet, ...values }; // Merge helmet info with fetched data
        })
      );
      setHelmetData(updatedHelmetData); // Update the state with new data
    } catch (error) {
      console.error("Error:", error);
    } finally {
      if (showLoading) setIsLoading(false); // Hide loading state once data is fetched
    }
  };

  // Generate the distance table using the updated helmet data
  const distanceTable = useMemo(() => generateDistanceTable(helmetData), [helmetData]);

  // If data is still loading, display loading message
  if (isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  // Sort helmets based on gas levels (descending order)
  const sortedHelmetData = [...helmetData].sort((a, b) => b.gas - a.gas);

  return (
    <div className="relative min-h-screen">
      {/* Vanta Background (doesn't need to re-render) */}
      <div
        className="absolute inset-0 z-0"
        style={{ position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }}
      />

      {/* Dashboard Content */}
      <div className="relative z-10 p-8 overflow-auto">
        {/* Helmet Cards */}
        <div className="grid md:grid-cols-2 md:grid-cols-3 gap-6 ">
        {helmetData.map((helmet, index) => (
            <HelmetCard key={index} helmet={helmet} />
          ))}
        </div>

        {/* Helmet Gas Level Table */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-4xl text-white text-center font-bold mb-8">
              Helmet Gas Level Table
            </h2>
            <table className="w-full bg-white border font-[Poppins] border-gray-300 rounded-xl shadow-md overflow-hidden text-sm">
              <thead className="bg-cyan-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left border-r border-cyan-300">Helmet</th>
                  <th className="px-4 py-2 text-left border-r border-cyan-300">Gas Level</th>
                  <th className="px-4 py-2 text-left border-r border-cyan-300">Position</th>
                </tr>
              </thead>
              <tbody>
                {sortedHelmetData.map((helmet, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-cyan-600 hover:text-white transition-colors duration-200 border-t border-cyan-7000"
                  >
                    <td className="px-4 py-2 border-r border-cyan-600">{helmet.name}</td>
                    <td className="px-4 py-2 border-r border-cyan-600">{helmet.gas || "-"}</td>
                    {/* Display position */}
                    <td className="px-4 py-2">{idx + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Distance Table */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-2xl">
            <h2 className="text-4xl  text-white text-center font-bold mb-8">
              Helmet Distance Table
            </h2>
            <table className="w-full bg-white border font-[Poppins] border-gray-600 rounded-xl shadow-md overflow-hidden text-sm">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">From</th>
                  <th className="px-4 py-2 text-left">To</th>
                  <th className="px-4 py-2 text-left">Distance (m)</th>
                </tr>
              </thead>
              <tbody>
                {distanceTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-200 transition-colors duration-200 hover:text-red-400 border-t border-gray-200"
                  >
                    <td className="px-4 py-2">{row.from}</td>
                    <td className="px-4 py-2">{row.to}</td>
                    <td className="px-4 py-2">{row.distance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Helmet Map */}
        <HelmetMap helmetData={helmetData} distanceTable={distanceTable} />
      </div>
       {/* Footer */}
       <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p>&copy; 2025 Nexus Smart Helmet. All rights reserved.</p>
      </footer>
    </div>
  );
}
