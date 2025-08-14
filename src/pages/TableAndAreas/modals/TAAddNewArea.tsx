import { nanoid } from "nanoid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../api";

interface TAAddNewAreaProps {
  getTabs: () => void;
  closeModal: () => void;
}

const TAAddNewArea: React.FC<TAAddNewAreaProps>= ({getTabs , closeModal}) => {
  const { t } = useTranslation("navbar_tableandareas");
  const [inputValue, setInputValue] = useState<string>("");

  interface AreaType { 
    id: string;
    name: string;
  }

  const saveArea = () => {
    const data = {
      id: nanoid(),
      name: inputValue,
    };

    api
      .post<AreaType>("areas", data)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getTabs();
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));

    setInputValue("");
    closeModal();
  };

  return (
    <div>
      <div>
        <label>{t("areaName")}:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={saveArea}>Ekle</button>
      </div>
    </div>
  );
};

export default TAAddNewArea;
