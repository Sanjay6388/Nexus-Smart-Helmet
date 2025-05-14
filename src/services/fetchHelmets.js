import axios from "axios";

export const fetchHelmetData = async (token) => {
  const baseUrl = `https://blynk.cloud/external/api/get?token=${token}`;
  const fields = ["V0", "V1", "V2", "V3", "V4", "V5", "V6","V7"];

  // If the fields need values, replace empty strings with valid data or remove the fields if not needed
  const url = `${baseUrl}&${fields.map((f) => `${f}=valid_value`).join("&")}`;

  
  try {
    const res = await axios.get(url);
    
    // Check if the response is valid
    if (res.data) {
      return {
        temp: res.data.V4,
        co: res.data.V7,
        gas: res.data.V6,
        fall: res.data.V5 === "1" || res.data.V5 === 1,
        x: parseFloat(res.data.V0),
        y: parseFloat(res.data.V1),
        z: parseFloat(res.data.V2),
        heart: res.data.V3,
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Example of how the fetchHelmets function should look like
export const fetchHelmets = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/helmets'); // Replace with your backend's base URL
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data); // Log the data to check if it's being fetched correctly
    return data;
  } catch (error) {
    console.error("Error fetching helmets:", error);
    return [];
  }
};


