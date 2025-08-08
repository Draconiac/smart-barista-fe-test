import React, { Component } from "react";
import Modal from "react-modal";
import "../../components/css/Modal.css";
import { useAppDispatch } from "../../app/hooks";
import { closeModal } from "../../features/modalSlice";

Modal.setAppElement("#root");

interface TAModalProps {
  isOpen: boolean;
  content: React.ReactNode | null;
}

const ItemModal: React.FC<TAModalProps> = ({ isOpen, content }) => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(closeModal());

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
          <form>
            <div>
              <label htmlFor="customerName">Customer Name:</label>
              <br />
              <input
                type="text"
                id="customerName"
                name="customerName"
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
          {content}
          <button onClick={onClose} className="modal-close-button">
            Kapat
          </button>
        </>
      }
    </Modal>
  );
};

export default ItemModal;
