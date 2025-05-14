const connectMongo = require("./connectMongo");
const HelmetData = require("./models/HelmetData");
const path = require("path");
const XLSX = require("xlsx");

let helmetDataForExcel = [];  // Array to hold data for Excel export

const saveData = async () => {
  try {
    console.log("Attempting to dynamically import fetchHelmetData and helmets...");
    const { fetchHelmetData } = await import('../src/services/fetchHelmets.js'); // Dynamic import for fetch data
    const { default: helmets } = await import('../src/data/helmets.js'); // Import helmets data

    console.log("Data fetched successfully, now saving to MongoDB and Excel...");

    for (const helmet of helmets) {
      const data = await fetchHelmetData(helmet.token); // Fetch data for each helmet

      if (data) {
        // Prepare the data for MongoDB
        await HelmetData.create({
          name: helmet.name,
          temperature: data.temp,
          co: data.co,
          co2: data.gas,
          heartrate:data.heart,
          distance: data.x,
          timestamp: new Date(),
          fallDetected: data.fall, // Store fall detection status
        });

        // Add data to the array for Excel (live data)
        helmetDataForExcel.push({
          Name: helmet.name,
          Temperature: data.temp,
          Co: data.co,
          Co2: data.gas,
          HeartRate:data.heart,
          Distance: data.x, // Save all 3 coordinates (x, y, z)
          FallDetected: data.fall ? "Yes" : "No", // Convert fall detection to "Yes"/"No"
          Timestamp: new Date().toLocaleString(),
        });

        console.log(`✅ Saved data for ${helmet.name} at ${new Date().toLocaleTimeString()}`);
      } else {
        console.log(`❌ No data fetched for ${helmet.name}`);
      }
    }

    // Save the collected data into an Excel file
    const ws = XLSX.utils.json_to_sheet(helmetDataForExcel); // Convert array to Excel sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "Helmet Data"); // Append sheet to workbook

    const excelFilePath = path.join(__dirname, "helmet_data.xlsx"); // Set the path for the Excel file

    // Write the Excel file
    XLSX.writeFile(wb, excelFilePath);
    console.log(`✅ Data saved to Excel file: ${excelFilePath}`);

  } catch (error) {
    console.error("Error in saving data:", error);
  }
};

const run = async () => {
  try {
    await connectMongo();  // Connect to MongoDB
    console.log("✅ MongoDB connected");

    setInterval(saveData, 10000);  // Save data every 10 seconds (adjust as needed)
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

run();
