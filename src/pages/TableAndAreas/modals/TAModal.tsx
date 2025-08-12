import React, { Component } from "react";
import Modal from "react-modal";
import "../../../components/css/Modal.css";
import { useAppDispatch } from "../../../app/hooks";
import { closeModal } from "../../../features/modalSlice";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useTranslation } from "react-i18next";
import { taModalMap } from "./TAModalExport";

Modal.setAppElement("#root");

interface TAModalProps {
  isOpen: boolean;
  componentName: string;
  title: string;
  data?: Record<string, unknown>;
}

const TaModal: React.FC<TAModalProps> = ({
  title,
  isOpen,
  componentName,
  data,
}) => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(closeModal());
  const { t } = useTranslation("navbar_tableandareas");
  const Comp = taModalMap.get(componentName);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={"Content Label Detail"}
      className="modal-content"
      overlayClassName="modal-overlay"
      style={{
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "30vw",
          maxWidth: "500px",
          height: "60vh",
          maxHeight: "600px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          overflow: "auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          outline: "none",
          zIndex: 1001,
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        },
      }}
    >
      {
        <>
          <Header title={t(title)} />
          {Comp ? <Comp data={data} /> : <p>Modal bulunamadı</p>}
          <Footer onClose={onClose} />
        </>
      }
    </Modal>
  );
};

export default TaModal;
