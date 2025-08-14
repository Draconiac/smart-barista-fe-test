import { useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../api";

interface TAEditAreaProps {
  selectedTab: { id: string; name: string };
  getTabs?: () => void;
  closeModal: () => void;
}

const TAEditArea: React.FC<TAEditAreaProps> = ({ selectedTab, getTabs, closeModal }) => {
  const { t } = useTranslation("navbar_tableandareas");
  const [inputValue, setInputValue] = useState<string>("");
  const areaId = selectedTab.id;

  interface AreaType {
    id: string;
    name: string;
  }

  const editArea = () => {
    const data = {
      name: inputValue,
    };

    api
      .put<AreaType>(`areas/${areaId}`, data)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        if (getTabs) {
          getTabs();
        }
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));

    setInputValue("");
    closeModal();
  };

  const deleteArea = () => {
    api
      .delete(`areas/${areaId}`)
      .then(() => {
        if (getTabs) {
          getTabs();
        }
      })
      .catch((error) => console.log("Silme işlemi başarısız oldu" + error));
      closeModal();
  };

  return (
    <div>
      
      <div>
        <h5>{selectedTab.name} bölgesi adı güncellenecek</h5>
        <label>{t("areaName")}:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <button onClick={editArea}>Güncelle</button>
      </div>
      <div>
        <label>Alanı Sil : </label>
        <button onClick={deleteArea}>Sil</button>
      </div>
      
    </div>
  );
};

export default TAEditArea;
