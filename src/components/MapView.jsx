import { useRef } from "react";
import { useMapbox } from "../hooks/useMapbox";

export default function MapView({ setInfoHtml, setSearchFn }) {
  const mapContainerRef = useRef(null);

  useMapbox(mapContainerRef, { setInfoHtml, setSearchFn });

  return (
    <div
      id="map-container"
      ref={mapContainerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}