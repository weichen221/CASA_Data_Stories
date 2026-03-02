import { useRef, useState } from "react";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/SearchBox";

export default function App() {
  const [infoHtml, setInfoHtml] = useState("Hover over an MSOA");

  const searchFnRef = useRef(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <MapView
        setInfoHtml={setInfoHtml}
        setSearchFn={(fn) => (searchFnRef.current = fn)}
      />

      <Sidebar infoHtml={infoHtml} />

      <SearchBox
        onSearch={(value) => {
          const fn = searchFnRef.current?.(); // ⭐ 取出 searchByMSOA
          fn?.(value);                        // ⭐ 执行搜索
        }}
      />
    </div>
  );
}
