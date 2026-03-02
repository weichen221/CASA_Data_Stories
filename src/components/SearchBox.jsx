import { useState } from "react";

export default function SearchBox({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSearch?.(v);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        background: "white",
        padding: "6px 8px",
        borderRadius: 6,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        display: "flex",
        gap: 6,
        alignItems: "center",
        zIndex: 50,
        fontSize: 12,
      }}
    >
      <input
        type="text"
        placeholder="MSOA21CD..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          border: "1px solid #cbd5e1",
          padding: "2px 6px",
          fontSize: 12,
          width: 140,
          borderRadius: 4,
        }}
      />
      <button
        type="submit"
        style={{
          padding: "3px 10px",
          background: "#0f172a",
          color: "white",
          borderRadius: 4,
          border: "none",
          cursor: "pointer",
        }}
      >
        Go
      </button>
    </form>
  );
}