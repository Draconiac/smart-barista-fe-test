import React, { Component } from 'react';
import Modal from 'react-modal';
import './css/Modal.css';

Modal.setAppElement('#root');

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: any;
  description?: string;
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, selectedItem, description }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={selectedItem ? selectedItem.title : 'Item Detail'}
            className="modal-content"
            overlayClassName="modal-overlay"
            style={{
                content: {
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30vw',
                    maxWidth: '500px',
                    height: '60vh',
                    maxHeight: '600px',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    overflow: 'auto',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    outline: 'none',
                    zIndex: 1001,
                },
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1000,
                }
            }}
        >
            {selectedItem && (
                <>
                    <h2>{selectedItem.title}</h2>
                    <form>
                        <div>
                            <label htmlFor="customerName">Customer Name:</label><br />
                            <input type="text" id="customerName" name="customerName" required />
                        </div>

                        <div>
                            <label htmlFor="productName">Product Name:</label><br />
                            <input type="text" id="productName" name="productName" defaultValue={selectedItem.title} required />
                        </div>

                        <div>
                            <label htmlFor="quantity">Quantity:</label><br />
                            <input type="number" id="quantity" name="quantity" min="1" required />
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                    {/* <img src={selectedItem.imageSrc} alt={selectedItem.title} className="modal-image" /> */}
                    <button onClick={onClose} className="modal-close-button">
                        Kapat
                    </button>
                </>
            )}
        </Modal>
    );
}

export default ItemModal;