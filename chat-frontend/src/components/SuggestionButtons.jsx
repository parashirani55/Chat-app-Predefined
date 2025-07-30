import React from "react";

function SuggestionButtons({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
      {suggestions.map((sug, i) => (
        <button
          key={i}
          onClick={() => onSelect(sug)}
          style={{
            margin: "5px 5px 0 0",
            padding: "8px 12px",
            backgroundColor: "#f3f3f3",
            border: "1px solid #ccc",
            borderRadius: "20px",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e0e0";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#f3f3f3";
          }}
        >
          {sug}
        </button>
      ))}
    </div>
  );
}

export default SuggestionButtons;
