import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import TAButtons from "./TAButtons";
import TAModal from "./modals/TAModal";
import TATabs from "./TATabs";
import TAView from "./TAView";

export default function TableAndAreas() {
  const { t } = useTranslation("navbar");
  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);
  const [selectedAreaTab, setSelectedAreaTab] = useState("");
  const [selectedButton, setSelectedButton] = useState({
    title: "",
    componentName: "",
  });

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "95vh",
    boxSizing: "border-box",
  };

  const div1Style: React.CSSProperties = {
    flex: "1",
    border: "1px solid black",
    boxSizing: "border-box",
    margin: "2px",
    backgroundColor: "#dbdae3ff",
  };

  const div2Style: React.CSSProperties = {
    flex: ".5",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "1px solid black",
    boxSizing: "border-box",
    margin: "2px",
    backgroundColor: "#dbdae3ff",
  };

  const div3Style: React.CSSProperties = {
    flex: "8",
    border: "1px solid black",
    boxSizing: "border-box",
    margin: "2px",
    backgroundColor: "#dbdae3ff",
  };

  return (
    <div style={containerStyle}>
      <h4 className="text-left">{t("tableandareas")}</h4>
      <div style={div1Style}>
        <TAButtons
          selectedAreaTab={selectedAreaTab}
          setSelectedButton={setSelectedButton}
        />
      </div>
      <div style={div2Style}>
        <TATabs setSelectedAreaTab={setSelectedAreaTab} />
      </div>
      <div style={div3Style}>
        <TAView selectedAreaTab={selectedAreaTab}/>
      </div>
      <TAModal
        title={selectedButton.title}
        isOpen={modalIsOpen}
        componentName={selectedButton.componentName}
        data={{ selectedAreaTab: selectedAreaTab }}
      />
    </div>
  );
}
