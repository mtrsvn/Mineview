import React, { useRef, useEffect } from "react";

export default function SkinViewer3D({ skinUrl, width = 300, height = 400 }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!viewerRef.current || !window.skinview3d) return;
    viewerRef.current.innerHTML = ""; // Clean previous canvas

    try {
      const { skinview3d } = window;
      const skinViewer = new skinview3d.SkinViewer({
        width,
        height,
        skin: skinUrl,
      });
      viewerRef.current.appendChild(skinViewer.canvas);

      if (skinview3d.IdleAnimation) {
        skinViewer.animation = new skinview3d.IdleAnimation();
        skinViewer.animation.speed = 0.5;
      }
    } catch (err) {
      viewerRef.current.innerHTML = "Could not load 3D skin.";
    }

    return () => {
      if (viewerRef.current) viewerRef.current.innerHTML = "";
    };
  }, [skinUrl, width, height]);

  return <div ref={viewerRef} style={{ width, height, margin: "10px auto" }} />;
}