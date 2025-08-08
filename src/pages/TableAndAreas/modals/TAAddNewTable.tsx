import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks";
import { defineTable } from "../../../features/tableSlice";

const TAAddNewTable: React.FC<{ data: Record<string, unknown> }> = (props) => {
  const { t } = useTranslation("navbar_tableandareas");
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const areaName = props.data ? props.data?.selectedAreaTab : "";

  const addNewTable = () => {
    let tmp: string[] = [inputValue];
    dispatch(defineTable({ areaName: String(areaName), tableName: tmp }));
  };

  return (
    <div
      style={{ padding: "1vh", display: "flex", justifyContent: "flex-start" }}
    >
      <div>
        <label>{t("addNewTable")}:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
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
};

export default TAAddNewTable;
