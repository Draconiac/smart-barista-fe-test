import React from "react";
import TAButtons from "./TAButtons";
import TATabs from "./TATabs";

export default function TableAndAreas() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "95vh",
    boxSizing: "border-box",
  };

  const div1Style: React.CSSProperties = {
    flex: "3",
    border: "1px solid black",
    boxSizing: "border-box",
    margin: "2px",
    backgroundColor: "#7f79d1ff",
  };

  const div2Style: React.CSSProperties = {
    flex: "1",
    border: "1px solid black",
    boxSizing: "border-box",
    margin: "2px",
    backgroundColor: "#79b256ff",
  };

  const div3Style: React.CSSProperties = {
    flex: "8",
    border: "1px solid black",
    boxSizing: "border-box",
    margin: "2px",
    backgroundColor: "#bb65adff",
  };

  return (
    <div style={containerStyle}>
      <div style={div1Style}><TAButtons/></div>
      <div style={div2Style}><TATabs/></div>
      <div style={div3Style}></div>
    </div>
  );
}
