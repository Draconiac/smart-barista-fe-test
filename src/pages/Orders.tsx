import React, { useState } from 'react';
import Modal from 'react-modal';
import Item from '../components/Item';
import ItemModal from '../components/ItemModal';
import coffeeImage from '../assets/coffee.jpeg';

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
                imageSrc={coffeeImage}
                onClick={() => openModal({ title: 'Coffee', imageSrc: coffeeImage })}
            />
            <Item
                title="Tea"
                imageSrc="/assets/coffee.jpeg"
                onClick={() => openModal({ title: 'Tea', imageSrc: './assets/coffee.jpeg' })}
            />
            <Item
                title="Dessert"
                imageSrc="/assets/coffee.jpeg"
                onClick={() => openModal({ title: 'Dessert', imageSrc: '/assets/coffee.jpeg' })}
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
