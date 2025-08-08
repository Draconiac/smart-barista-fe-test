import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks";
import { defineTable } from "../../../features/tableSlice";

const TAAddNewTableBulk: React.FC<{ data: Record<string, unknown> }> = ( props ) => {
  const { t } = useTranslation("navbar_tableandareas");
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [inputNumberValue, setInputNumberValue] = useState<number>(0);
  const areaName = props.data ? props.data?.selectedAreaTab : ""; 
  
  const addNewTable = () => {
    
    let tmpName: string[] = [];
    for (let i = 1; i <= inputNumberValue; i++) {
      tmpName.push(inputValue + " " + i);
    }
    dispatch(defineTable({ areaName: String(areaName), tableName: tmpName }));
  };

  return (
    <div style={{ padding: "1vh", justifyContent: "flex-start" }}>
      <div>
        <h5>{ String(areaName) }</h5>
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
            addNewTable();
          }}
        >
          Ekle
        </button>
      </div>
    </div>
  );
}

export default TAAddNewTableBulk;