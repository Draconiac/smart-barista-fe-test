import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import TAButtons from "./TAButtons";
import TAModal from "./modals/TAModal";
import TATabs from "./TATabs";
import TAView from "./TAView";
import { containerStyle, div1Style, div2Style, div3Style } from "./styles";

export default function TableAndAreas() {
  const { t } = useTranslation("navbar");
  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);
  const [selectedAreaTab, setSelectedAreaTab] = useState("");
  const [selectedButton, setSelectedButton] = useState({
    title: "",
    componentName: "",
  });

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
        <TAView selectedAreaTab={selectedAreaTab} />
      </div>
      <TAModal
        title={selectedButton.title}
        isOpen={modalIsOpen}
        componentName={selectedButton.componentName}
        data={{ selectedAreaTab }}
      />
    </div>
  );
}
