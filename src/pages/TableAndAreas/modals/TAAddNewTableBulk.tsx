import { nanoid } from "nanoid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../api";

interface TAAddNewTableBulkProps {
  selectedTab: { id: string; name: string };
  getTables?: () => void;
  closeModal: () => void;
}

const TAAddNewTableBulk: React.FC<TAAddNewTableBulkProps> = ({
  selectedTab,
  getTables,
  closeModal,
}) => {
  const { t } = useTranslation("navbar_tableandareas");
  const [inputValue, setInputValue] = useState<string>("");
  const [inputNumberValue, setInputNumberValue] = useState<number>(0);
  const area = selectedTab;

  interface TableType {
    id: string;
    areaId: string;
    name: string;
    isActive: boolean;
  }

  const saveTable = () => {
    for (let i = 1; i <= inputNumberValue; i++) {
      let data = {
        id: nanoid(),
        areaId: area.id,
        name: inputValue + " " + i,
        isActive: false,
      };

      api
        .post<TableType>("tables/", data)
        .then(() => {
          if (getTables) getTables();
          console.info("Kayıt işlemi başarılı");
        })
        .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
    }
    if (getTables) getTables();
    setInputValue("");
    closeModal();
  };

  return (
    <div style={{ padding: "1vh", justifyContent: "flex-start" }}>
      <div>
        <h5>{String(area.name)} alanı için masa ekleniyor</h5>
      </div>
      <div>
        <label>{t("addNewTableBulk")}:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div>
        <label>{t("addNewTableBulkSize")}:</label>
        <input
          type="number"
          value={inputNumberValue}
          onChange={(e) => {
            setInputNumberValue(Number(e.target.value));
          }}
        />
      </div>
      <div>
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

export default TAAddNewTableBulk;
