import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../app/hooks";
import TAButtons from "./TAButtons";
import TAModal from "./modals/TAModal";
import TATabs from "./TATabs";
import TAView from "./TAView";
import api from "../../api";
import { closeModal } from "../../features/modalSlice";
import { useAppDispatch } from "../../app/hooks";
import { containerStyle, div1Style, div2Style, div3Style } from "./styles";

interface AreaType {
  id: string;
  name: string;
}

interface TableType {
  id: string;
  areaId: string;
  name: string;
  isActive: boolean;
}

export default function TableAndAreas() {
  const { t } = useTranslation("navbar");
  const [areas, setAreas] = useState<AreaType[]>([]);
  const modalIsOpen = useAppSelector((state) => state.modal.isOpen);
  const dispatch = useAppDispatch();
  const [selectedTab, setSelectedTab] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [selectedButton, setSelectedButton] = useState({
    title: "",
    componentName: "",
  });
  const [tables, setTables] = useState<TableType[] | []>();

  useEffect(() => {
    getTabs();
  }, []);

  const _closeModal = () => {
    dispatch(closeModal());
  }

  const getTabs = () => {
    api
      .get("/areas")
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu: ", error);
      });
  };

  const getTables = async () => {
    if (selectedTab.id) {
      setTables([]);
      try {
        const response = await api.get<TableType[]>(
          `/tables?areaId=${selectedTab.id}`
        );
        setTables(response.data);
      } catch (error) {
        console.error("Veri çekilirken hata oluştu:", error);
        setTables([]);
      }
    } else setTables([]);
  };

  interface GenericModalData {
    selectedTab?: {};
  }
  
  return (
    <div style={containerStyle}>
      <h4 className="text-left">{t("tableandareas")}</h4>
      <div style={div1Style}>
        <TAButtons
          selectedTab={selectedTab}
          setSelectedButton={setSelectedButton}
        />
      </div>
      <div style={div2Style}>
        <TATabs
          setSelectedTab={setSelectedTab}
          areas={areas}
          getTables={getTables}
        />
      </div>
      <div style={div3Style}>
        <TAView selectedTab={selectedTab} tables={tables} />
      </div>
      <TAModal<GenericModalData>
        title={selectedButton.title}
        isOpen={modalIsOpen}
        componentName={selectedButton.componentName}
        data={{ selectedTab }}
        getTabs={getTabs}
        getTables={getTables}
        closeModal={_closeModal}
      />
    </div>
  );
}
