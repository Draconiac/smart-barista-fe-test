import React, { useState } from 'react';
import Modal from 'react-modal';
import Item from '../components/Item';
import ItemModal from '../components/ItemModal';

Modal.setAppElement('#root');

const Orders = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

    type SelectedItem ={
        title: string;
        imageSrc: string;
      }

    const openModal = (item: SelectedItem) => {
        setSelectedItem(item);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedItem(null);
    };

    return (
        <div className="orders-container">
            <h2>📦 Orders Page</h2>
            <Item
                title="Coffee"
                imageSrc="/images/coffee.jpeg"
                onClick={() => openModal({ title: 'Coffee', imageSrc: '/images/coffee.jpeg' })}
            />
            <Item
                title="Tea"
                imageSrc="/images/coffee.jpeg"
                onClick={() => openModal({ title: 'Tea', imageSrc: '/images/coffee.jpeg' })}
            />
            <Item
                title="Dessert"
                imageSrc="/images/coffee.jpeg"
                onClick={() => openModal({ title: 'Dessert', imageSrc: '/images/coffee.jpeg' })}
            />

            <ItemModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                selectedItem={selectedItem}
                description={undefined} />
        </div>
    );
};

export default Orders;
