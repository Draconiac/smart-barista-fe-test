import React from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t: tMain } = useTranslation("mainpage");
  //const { t: tLogin } = useTranslation("login");

  return (
    <div>
      <h2>🏠 Home Page</h2>

      <h2>{tMain("welcome", { name: "LO LO LO" })}</h2>
    </div>
  );
}
