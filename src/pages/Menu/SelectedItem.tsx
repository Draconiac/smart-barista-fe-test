import React from 'react';
import './style.css';
import { Product } from '../Products/Product';

interface SelectedItem{
  product: Product;
  edit: () => void;
  remove: () => void;
}

const SelectedItem: React.FC<SelectedItem> = ({ product, edit, remove }) => {
  return (
    <div>
      <label>{product.name} : </label>
      <label>{product.quantity}</label>
      <button onClick={edit}>edit</button>
      <button onClick={remove}>sil</button>
    </div>
  );
};

export default SelectedItem;
