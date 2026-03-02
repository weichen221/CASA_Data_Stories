const ptalLevels = [
  { label: "6b", color: "#1d91c0" },
  { label: "6a", color: "#41b6c4" },
  { label: "5", color: "#7fcdbb" },
  { label: "4", color: "#c7e9b4" },
  { label: "3", color: "#d8d991" },
  { label: "2", color: "#fdae6b" },
  { label: "1b", color: "#fdc781" },
  { label: "1a", color: "#fdd49e" },
];

export default function Sidebar({ infoHtml }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        width: 280,
        background: "white",
        borderRadius: 10,
        boxShadow: "0 2px 14px rgba(0,0,0,0.18)",
        padding: 14,
        zIndex: 40,
        fontSize: 13,
        lineHeight: "18px",
      }}
    >
      <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14 }}>
        Public Transport Accessibility Levels in London, 2023
      </h3>

      <p style={{ margin: 0, marginBottom: 10, color: "#475569", fontSize: 12 }}>
        This map visualises public transport accessibility across London using
        the 2023 PTAL dataset from Transport for London (TfL). Data scale: MSOA.
        <br />
        <br />
        <a
          href="https://gis-tfl.opendata.arcgis.com/datasets/d6e6de5b2997431eb872d83a85c228d3/explore"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#0369a1", textDecoration: "underline" }}
        >
          View the 2023 PTAL dataset →
        </a>
      </p>

      <details style={{ marginBottom: 10 }}>
        <summary style={{ cursor: "pointer", fontWeight: 600, color: "#0f172a" }}>
          About PTAL
        </summary>
        <div style={{ marginTop: 8, fontSize: 12, color: "#475569" }}>
          Public Transport Accessibility Levels (PTAL) score how easily an area
          can access public transport. The scale runs from <b>0 (very poor)</b>{" "}
          to <b>6b (excellent)</b>, derived from walking time to nearby stops and
          service frequency. In London, all areas fall within the 1a–6b range.
        </div>
      </details>

      <div style={{ marginBottom: 10 }}>
        <b>Legend</b>
        <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
          {ptalLevels.map((item) => (
            <div key={item.label} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 12 }}>
              <span
                style={{
                  width: 12,
                  height: 12,
                  background: item.color,
                  border: "1px solid #64748b",
                  display: "inline-block",
                }}
              />
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "10px 0" }} />

      <div
        style={{ fontSize: 12, color: "#0f172a" }}
        dangerouslySetInnerHTML={{ __html: infoHtml }}
      />
    </div>
  );
}