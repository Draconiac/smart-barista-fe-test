import React from 'react';
import './style.css';
import { Product } from '../Products/Product';

interface ItemProps{
  title: string;
  product: Product;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ title, product, onClick }) => {
  return (
    <div className="custom-item-card" onClick={onClick}>
      <div className="custom-item-title">{title}</div>
    </div>
  );
};

export default Item;
