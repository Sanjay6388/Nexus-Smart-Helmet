import { useEffect, useRef } from "react";
import * as THREE from "three";

const VantaBackground = () => {
  const vantaRef = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.THREE = THREE;

      import("vanta/dist/vanta.halo.min").then((Vanta) => {
        effectRef.current = Vanta.default({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x131a43,
          baseColor: 0x001a59, // 0x1a59 padded with leading zeros for full 24-bit hex
          size: 1,
          amplitudeFactor: 1,
          xOffset: 0,
          yOffset: 0,
        });
      }).catch((err) => {
        console.error("[VANTA] Failed to load Vanta HALO effect", err);
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 z-0"
      style={{ position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }}
    />
  );
};

export default VantaBackground;
