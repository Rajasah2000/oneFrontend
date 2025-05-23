import React from "react";

const MovingHeader = () => {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#7f8c8d",
        padding: "14px 0",
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "moveText 20s linear infinite",
          paddingLeft: "50%", // Start from middle
        }}
      >
        <span style={textStyle}>🔥 Always Ahead Since 1997 |🔥 • </span>
        <span style={textStyle}>
          🔥 Party Speakers for every occasion 🔥 •{" "}
        </span>
        <span style={textStyle}>A dream theater for your Home • </span>
        <span style={textStyle}>
          🔥 Party Speakers for every occasion 🔥 •{" "}
        </span>
        <span style={textStyle}>A dream theater for your Home • </span>
      </div>

      <style>{`
        @keyframes moveText {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

const textStyle = {
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  marginRight: "50px",
};

export default MovingHeader;
