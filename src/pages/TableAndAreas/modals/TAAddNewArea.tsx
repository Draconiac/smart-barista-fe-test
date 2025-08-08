import { useTranslation } from "react-i18next";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { defineArea } from "../../../features/testSlice";


const TAAddNewArea: React.FC<{ data: Record<string, unknown> }> = (props) => {
  const { t } = useTranslation("navbar_tableandareas");
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  // const[data, setData] = useState(null);
  // const[error, setError] = useState(null);

  // const firstRestCall = ()  => {
  //   axios.get("https://api.restful-api.dev/objects/7")
  //   .then((response: AxiosResponse) => {
  //     setData(response.data);
  //   })
  //   .catch((error) => {
  //     setError(error);
  //   })
  //   .finally(() => {
  //     console.log(error ? error : data);
  //   })
  // };

  const addNewArea = () => {
    dispatch(defineArea({ areaName: inputValue }));
    setInputValue("");
  };

  return (
    <div
      style={{ padding: "1vh", display: "flex", justifyContent: "flex-start" }}
    >
      <div>
        <label>{t("addNewArea")}:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
      <div>
        {/* <button onClick={() => {firstRestCall();}}>Ekle</button> */}
        <button
          onClick={() => {
            addNewArea();
          }}
        >
          Ekle
        </button>
      </div>
    </div>
  );
};

export default TAAddNewArea;
