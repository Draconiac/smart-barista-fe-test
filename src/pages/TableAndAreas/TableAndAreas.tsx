import React, { useState } from "react";
import TAButtons from "./TAButtons";
import TATabs from "./TATabs";
import { useTranslation } from "react-i18next";
import TAView from "./TAView";
import TAModal from "./TAModal";
import { useAppSelector } from '../../app/hooks'

export default function TableAndAreas() {
  const { t } = useTranslation("navbar");
  const modalIsOpen = useAppSelector(state => state.modal.isOpen);
  const content = useAppSelector(state => state.modal.content);

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
    flex: "1",
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
      <div style={div1Style}><TAButtons/></div>
      <div style={div2Style}><TATabs/></div>
      <div style={div3Style}><TAView /></div>

      <TAModal
        isOpen={modalIsOpen}
        content={content}
      />
    </div>

  );
}
