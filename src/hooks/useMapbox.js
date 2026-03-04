import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoid2VpY2hlbjIyMSIsImEiOiJjbWtwYjVxdHMwYXF2M2RzNmU2cGYyc25wIn0.LKrnd3HzNXAW2bRps8_oEw";

function getFeatureCenter(feature) {
  const geom = feature?.geometry;
  if (!geom) return null;

  const ring =
    geom.type === "Polygon"
      ? geom.coordinates?.[0]
      : geom.coordinates?.[0]?.[0];

  if (!ring?.length) return null;

  let sx = 0;
  let sy = 0;

  for (const [x, y] of ring) {
    sx += x;
    sy += y;
  }

  return [sx / ring.length, sy / ring.length];
}

export function useMapbox(
  containerRef,
  { setInfoHtml, setSearchFn, setAutocompleteList } = {}
) {
  const mapRef = useRef(null);
  const lastHoveredIdRef = useRef(null);

  const infoFnRef = useRef(setInfoHtml);
  const searchFnRef = useRef(setSearchFn);
  const autoListRef = useRef(setAutocompleteList);

  infoFnRef.current = setInfoHtml;
  searchFnRef.current = setSearchFn;
  autoListRef.current = setAutocompleteList;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/weichen221/cmlmki6rp001g01qn9b0sf1my",
      center: [-0.1, 51.5],
      zoom: 10,
    });

    mapRef.current = map;
    window.map = map;

    const resize = () => map.resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(resize);

    const BASE_LAYER_ID = "aaaatry-b3w0fj";

    function setHoverFilter(id) {
      if (!map.getLayer("msoa-hover")) return;
      map.setFilter("msoa-hover", ["==", ["get", "MSOA21CD"], id || ""]);
    }

    // ⭐⭐⭐ 搜索功能（不锁定）
    const searchByMSOA = (query) => {
      const q = (query || "").trim();
      if (!q) return;

      const features = map.queryRenderedFeatures({
        layers: [BASE_LAYER_ID],
        filter: ["==", ["get", "MSOA21CD"], q],
      });

      if (!features.length) {
        setHoverFilter("");
        infoFnRef.current?.(`No MSOA found with ID: <b>${q}</b>`);
        return;
      }

      const f = features[0];
      const props = f.properties || {};

      // ⭐ 搜索后高亮，但不锁定
      setHoverFilter(props.MSOA21CD);

      infoFnRef.current?.(
        `<b>MSOA NAME:</b> ${props.MSOA21NM ?? ""}<br/>
         <b>MSOA ID:</b> ${props.MSOA21CD ?? ""}<br/>
         <b>Mean PTAL:</b> ${props.MEAN_PTAL_ ?? ""}`
      );

      const center = getFeatureCenter(f);
      if (center) {
        map.flyTo({ center, zoom: 12 });
      }
    };

    searchFnRef.current?.(() => searchByMSOA);

    map.on("load", () => {
      infoFnRef.current?.("Hover over an MSOA");

      const baseLayer = map.getLayer(BASE_LAYER_ID);
      if (!baseLayer) {
        console.error("Layer not found:", BASE_LAYER_ID);
        return;
      }

      // ⭐ 自动补全数据
      const source = map.getSource(baseLayer.source);
      if (source && source._data) {
        const features = source._data.features || [];
        const list = features.map((f) => ({
          id: f.properties.MSOA21CD,
          name: f.properties.MSOA21NM,
        }));
        autoListRef.current?.(list);
      }

      if (!map.getLayer("msoa-hover")) {
        map.addLayer({
          id: "msoa-hover",
          type: "fill",
          source: baseLayer.source,
          "source-layer": baseLayer["source-layer"],
          paint: {
            "fill-color": "#ffcc00",
            "fill-opacity": 0.7,
          },
          filter: ["==", ["get", "MSOA21CD"], ""],
        });
      }

      // ⭐ Hover（搜索后也能覆盖）
      map.on("mousemove", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [BASE_LAYER_ID],
        });

        if (!features.length) return;

        const props = features[0].properties || {};
        const id = props.MSOA21CD;

        if (lastHoveredIdRef.current === id) return;
        lastHoveredIdRef.current = id;

        setHoverFilter(id);

        infoFnRef.current?.(
          `<b>MSOA NAME:</b> ${props.MSOA21NM ?? ""}<br/>
           <b>MSOA ID:</b> ${props.MSOA21CD ?? ""}<br/>
           <b>Mean PTAL:</b> ${props.MEAN_PTAL_ ?? ""}`
        );
      });

      map.on("mouseenter", BASE_LAYER_ID, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", BASE_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
        lastHoveredIdRef.current = null;
        setHoverFilter("");
        infoFnRef.current?.("Hover over an MSOA");
      });
    });

    return () => {
      window.removeEventListener("resize", resize);
      try {
        map.remove();
      } catch {}
      mapRef.current = null;
    };
  }, [containerRef]);
}
