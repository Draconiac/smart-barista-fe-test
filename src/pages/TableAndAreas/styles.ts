import { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "95vh",
  boxSizing: "border-box",
};

export const div1Style: CSSProperties = {
  flex: "1",
  border: "1px solid black",
  boxSizing: "border-box",
  margin: "2px",
  backgroundColor: "gainsboro",
};

export const div2Style: CSSProperties = {
  flex: ".5",
  justifyContent: "flex-start",
  alignItems: "center",
  border: "1px solid black",
  boxSizing: "border-box",
  margin: "2px",
  backgroundColor: "gainsboro",
};

export const div3Style: CSSProperties = {
  flex: "8",
  border: "1px solid black",
  boxSizing: "border-box",
  margin: "2px",
  backgroundColor: "gainsboro",
};
