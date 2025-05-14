const exportToExcel = async () => {
    const allData = await HelmetData.find().lean();
  
    const formattedData = allData.map(item => ({
      HelmetID: item.helmetId,
      Temp: item.temp,
      Humidity: item.humidity,
      Gas: item.gas,
      Fall: item.fall ? "Yes" : "No",
      X: item.x,
      Y: item.y,
      Z: item.z,
      Time: item.timestamp.toLocaleString(),
    }));
  
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "HelmetData");
  
    const filePath = path.join(__dirname, "../helmet_data.xlsx");
    XLSX.writeFile(wb, filePath);
  
    console.log("📁 Data exported to Excel");
  };
  
  module.exports = exportToExcel;
  