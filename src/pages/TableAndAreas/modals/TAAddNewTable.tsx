import { nanoid } from "nanoid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../api";

interface TAAddNewTableProps {
  selectedTab: { id: string; name: string };
  getTables: () => void;
  closeModal: () => void;
}

const TAAddNewTable: React.FC<TAAddNewTableProps> = ({ selectedTab, getTables, closeModal }) => {
  const { t } = useTranslation("navbar_tableandareas");
  const [inputValue, setInputValue] = useState<string>("");

  interface TableType {
    id: string;
    areaId: string;
    name: string;
    isActive: boolean;
  }

  const saveTable = () => {
    
    const data = {
      id: nanoid(),
      areaId: selectedTab.id,
      name: inputValue,
      isActive: false,
    };

    api
      .post<TableType>("tables/", data)
      .then(() => {
        if (getTables) getTables();
        console.info("Kayıt işlemi başarılı");
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));

    setInputValue("");
    closeModal();
  };

  return (
    <div style={{ padding: "1vh", display: "flex" }}>
      <div>
        <div>
          <h5>{selectedTab.name} tab için yeni masa ekleniyor</h5>
        </div>
        <label>{t("addNewTable")}:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        <button
          onClick={() => {
            saveTable();
          }}
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default TAAddNewTable;
