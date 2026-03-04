import { useRef, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/SearchBox";

export default function App() {
  const [infoHtml, setInfoHtml] = useState("Hover over an MSOA");
  const [autocompleteList, setAutocompleteList] = useState([]);

  const searchFnRef = useRef(null);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <MapView
        setInfoHtml={setInfoHtml}
        setSearchFn={(fn) => (searchFnRef.current = fn)}
        setAutocompleteList={setAutocompleteList}
      />

      <Sidebar infoHtml={infoHtml} />

      <SearchBox
        autocompleteList={autocompleteList}
        onSearch={(value) => {
          const fn = searchFnRef.current?.();
          fn?.(value);
        }}
      />
    </div>
  );
}
