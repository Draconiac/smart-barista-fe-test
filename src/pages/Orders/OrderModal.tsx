import React from "react";
import Modal from "react-modal";
import Menu from "../Menu/Menu";
import { TableType } from "../TableAndAreas/TAView";
import "./style.css";
import { Product } from "../Products/Product";

Modal.setAppElement("#root");

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshOrders: (tableId: string) => void;
  selectedItem: TableType | null;
  orderedProducts: Product[] | []
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, selectedItem, orderedProducts, refreshOrders }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={selectedItem ? selectedItem.name : "Item Detail"}
      className="modal-content-order"
      overlayClassName="modal-overlay-order"
      style={{
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      height: "80%",
      background: "white",
      borderRadius: "8px",
      padding: "20px",
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
          <h5>{selectedItem.name} için sipariş ekleniyor</h5>
          <Menu tableId={selectedItem.id} closeMenuModal={onClose}orderedProducts = {orderedProducts} refreshOrders={refreshOrders}/>
          <button onClick={onClose} className="modal-close-button">
            x
          </button>
        </>
      )}
    </Modal>
  );
};

export default OrderModal;
