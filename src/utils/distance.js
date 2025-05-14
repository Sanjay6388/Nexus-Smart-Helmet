export function generateDistanceTable(helmetData) {
    const table = [];
  
    for (let i = 0; i < helmetData.length; i++) {
      for (let j = i + 1; j < helmetData.length; j++) {
        const h1 = helmetData[i];
        const h2 = helmetData[j];
  
        const dx = h1.x - h2.x;
        const dy = h1.y - h2.y;
        const dz = h1.z - h2.z;
  
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz).toFixed(2);
  
        table.push({
          from: h1.name,
          to: h2.name,
          distance: `${distance} m`,
        });
      }
    }
  
    return table;
  }
  