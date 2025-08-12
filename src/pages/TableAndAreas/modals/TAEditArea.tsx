import { nanoid } from "nanoid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../api";

const TAEditArea: React.FC<{ data: Record<string, unknown> }> = () => {
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
      .put<AreaType>("areas/"+`${inputValue}`, data)
      .then(() => console.info("Kayıt işlemi başarılı"))
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));

    setInputValue("");
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

export default TAEditArea;
