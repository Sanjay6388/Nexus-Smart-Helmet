// /components/HelmetGasTable.js
import React, { useState } from 'react';
import helmetsData from '../data/helmets';  // Import the helmet data
import './Table.css';

const HelmetGasTable = () => {
  // Use the helmets data imported from helmets.js
  const [helmets, setHelmets] = useState(helmetsData);

  // Function to sort helmets by gas level in descending order
  const sortHelmetsByGasLevel = (helmets) => {
    return helmets.sort((a, b) => b.gasLevel - a.gasLevel);
  };

  // Function to update the gas level of Helmet C and resort the table
  const increaseHelmetCGasLevel = () => {
    const updatedHelmets = helmets.map(helmet =>
      helmet.name === "Helmet C" ? { ...helmet, gasLevel: helmet.gasLevel + 50 } : helmet
    );

    // Sort the helmets after the update
    setHelmets(sortHelmetsByGasLevel(updatedHelmets));
  };

  const getStatusClass = (level) => {
    if (level > 200) {
      return 'critical';  // Pulsing Icon
    } else if (level > 100) {
      return 'high';  // Flashing Icon
    }
    return 'normal';  // Normal Icon
  };

  return (
    <div className="table-container">
      <button onClick={increaseHelmetCGasLevel}>Increase Helmet C Gas Level</button>
      <table>
        <thead>
          <tr>
            <th>Helmet Name</th>
            <th>Gas Level (ppm)</th>
            <th>Interactive Icon</th>
          </tr>
        </thead>
        <tbody>
          {helmets.map((helmet) => (
            <tr key={helmet.token}>
              <td>{helmet.name}</td>
              <td>{helmet.gasLevel}</td>
              <td>
                <span className={`icon ${getStatusClass(helmet.gasLevel)}`}></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HelmetGasTable;
