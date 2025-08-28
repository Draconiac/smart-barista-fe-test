import React, { Component, Dispatch, SetStateAction } from "react";
import Modal from "react-modal";
import "./style.css";
import ItemDetail from "./ItemDetail";
import { Product } from "../Products/Product";
import { SelectedItemsProps } from "./Menu";

Modal.setAppElement("#root");

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleInputChange: (fieldName: "quantity", value: string) => void;
  selectedItem: Product | null;
  handleSelectedItems: (item: Product) => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
  handleInputChange,
  handleSelectedItems
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={selectedItem ? selectedItem.name : "Item Detail"}
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
      {selectedItem && (
        <>
          <ItemDetail
            product={selectedItem}
            handleInputChange={handleInputChange}
            handleSelectedItems= {handleSelectedItems}
            onClose={onClose}
          />
          <button onClick={onClose} className="modal-close-button">
            x
          </button>
        </>
      )}
    </Modal>
  );
};

export default ItemModal;
