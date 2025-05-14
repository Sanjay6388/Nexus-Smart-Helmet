import React from 'react';
import VantaBackground from './components/VantaBackground'; // Import your custom Vanta component
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <VantaBackground /> {/* Add the Vanta background */}
      <div className="min-h-screen relative z-10"> {/* Make sure your content is above the background */}
        <h1 className="text-4xl text-white text-center p-8 font-bold">Nexus Smart Helmet Dashboard</h1>
        <Dashboard />
      </div>
    </>
  );
}

export default App;
