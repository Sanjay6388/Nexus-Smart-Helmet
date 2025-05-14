import { useEffect, useState } from "react";
import { Thermometer, Droplets, AlertTriangle, Flame, HeartPulse } from "lucide-react";
import { fetchHelmetData } from "../services/fetchHelmets"; // adjust path as needed

export default function HelmetCard({ helmet }) {
  const [liveData, setLiveData] = useState(helmet);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updated = await fetchHelmetData(helmet.token); // Helmet must include token
      if (updated) {
        setLiveData((prev) => ({
          ...prev,
          ...updated,
        }));
      }
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval);
  }, [helmet.token]);

  return (
    <div className="p-5 bg-black rounded-xl shadow hover:shadow-lg transition-all border">
      <h2 className="text-3xl text-white font-bold mb-3">{helmet.name}</h2>
      <div className="space-y-2 text-gray-200 hover:text-green-500 ">
        <div className="flex items-center gap-2">
          <Thermometer className="text-red-500" />
          <span>{liveData.temp} °C</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="text-blue-500" />
          <span>CO : {liveData.co} ppm</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="text-yellow-500" />
          <span>CO<span className="align-sub text-xs">2</span>:   {liveData.gas} ppm</span>
        </div>
        <div className="flex items-center gap-2">
          <HeartPulse className="text-red-500" />
          <span>{liveData.heart} BPM</span>
        </div>
        <div className={`flex items-center gap-2 font-semibold ${liveData.fall ? "text-red-600" : "text-green-600"}`}>
          <AlertTriangle />
          <span>{liveData.fall ? "Fall Detected" : "Safe"}</span>
        </div>
      </div>
    </div>
  );
}
