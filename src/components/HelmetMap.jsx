import React, { useEffect, useRef, useState } from "react";

export default function HelmetPlane({ helmetData, distanceTable }) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ x: 0, y: 0 });

  // Center content on mount or when helmetData changes
  useEffect(() => {
    if (!helmetData.length || !containerRef.current) return;

    const container = containerRef.current;
    const padding = 100;

    const minX = Math.min(...helmetData.map(h => h.x));
    const maxX = Math.max(...helmetData.map(h => h.x));
    const minY = Math.min(...helmetData.map(h => h.y));
    const maxY = Math.max(...helmetData.map(h => h.y));

    const contentWidth = maxX - minX || 1;
    const contentHeight = maxY - minY || 1;

    const scaleX = (container.offsetWidth - padding * 2) / contentWidth;
    const scaleY = (container.offsetHeight - padding * 2) / contentHeight;

    const bestZoom = Math.min(scaleX, scaleY);
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const newOffset = {
      x: container.offsetWidth / 2 - centerX * bestZoom,
      y: container.offsetHeight / 2 - centerY * bestZoom,
    };

    setZoom(bestZoom);
    setOffset(newOffset);
  }, [helmetData]);

  // Convert data positions to screen positions
  useEffect(() => {
    setPositions(
      helmetData.map((helmet) => ({
        id: helmet.name,
        rawX: helmet.x,
        rawY: helmet.y,
        x: helmet.x * zoom + offset.x,
        y: helmet.y * zoom + offset.y,
        status: helmet.status || (Math.random() > 0.3 ? "online" : "offline"), // fallback simulated status
      }))
    );
  }, [helmetData, zoom, offset]);

  // Mouse wheel zoom handler
  const handleWheel = (e) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const scaleAmount = e.deltaY < 0 ? 1.1 : 0.9;
    const newZoom = Math.max(0.3, Math.min(zoom * scaleAmount, 5));

    const newOffsetX = mouseX - (mouseX - offset.x) * (newZoom / zoom);
    const newOffsetY = mouseY - (mouseY - offset.y) * (newZoom / zoom);

    setZoom(newZoom);
    setOffset({ x: newOffsetX, y: newOffsetY });
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0 && e.button !== 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    scrollStart.current = { x: offset.x, y: offset.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({
      x: scrollStart.current.x + dx,
      y: scrollStart.current.y + dy,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.2, 20));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.3));

  const resetView = () => {
    if (helmetData.length > 0) {
      const event = new Event("resize");
      window.dispatchEvent(event); // triggers re-centering
    }
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h2 className="text-2xl text-white font-bold mb-4">
        🪖 Helmet Plane (Interactive)
      </h2>

      {/* Zoom & Reset Controls */}
      <div className="mb-4 space-x-4">
        <button
          onClick={zoomIn}
          className="px-4 py-1 rounded bg-green-600 text-white hover:bg-green-700"
        >
          ➕ Zoom In
        </button>
        <button
          onClick={zoomOut}
          className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
        >
          ➖ Zoom Out
        </button>
        <button
          onClick={resetView}
          className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          🔄 Reset View
        </button>
      </div>

      {/* Main Interactive Canvas */}
      <div
        ref={containerRef}
        className={`relative bg-black w-[800px] h-[550px] border 
        bg-[radial-gradient(circle,_#e5e7eb_1px,_transparent_1px)] 
        [background-size:20px_20px] overflow-hidden transition-transform duration-300 
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Helmet Markers */}
        {positions.map((helmet) => (
          <div
            key={helmet.id}
            style={{
              position: "absolute",
              left: `${helmet.x}px`,
              top: `${helmet.y}px`,
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              fontSize: `${30 * zoom}px`,
            }}
            className="group"
          >
            <div className="text-white text-sm font-bold mb-1">
              {helmet.id}
            </div>
            <div className="relative">
              <div
                className={`absolute -top-2 -right-2 w-3 h-3 rounded-full ${
                  helmet.status === "online" ? "bg-green-400" : "bg-red-400"
                } border border-white`}
              ></div>
              <div
                className="text-4xl group-hover:scale-125 transition-transform duration-200 cursor-pointer"
                title={`Coords: (${helmet.rawX}, ${helmet.rawY})`}
              >
                🪖
              </div>
            </div>
          </div>
        ))}

        {/* Distance Lines */}
        {distanceTable.map((item, idx) => {
          const from = positions.find((h) => h.id === item.from);
          const to = positions.find((h) => h.id === item.to);
          if (!from || !to) return null;

          const x1 = from.x;
          const y1 = from.y;
          const x2 = to.x;
          const y2 = to.y;

          const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

          return (
            <div
              key={idx}
              className="absolute origin-left transition-all duration-700 ease-in-out"
              style={{
                left: `${x1}px`,
                top: `${y1}px`,
                width: `${length}px`,
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div className="bg-blue-500 h-0.5 w-full" />
              <div
                className="absolute text-xs bg-white px-1 py-0.5 rounded shadow-sm border text-gray-700"
                style={{
                  left: `${length / 2}px`,
                  top: `-15px`,
                  transform: "translateX(-50%)",
                }}
              >
                {item.distance} m
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
