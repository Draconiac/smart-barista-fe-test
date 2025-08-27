import React from 'react';
import './style.css';
import { Product } from '../Products/Product';

interface ItemDetailProps{
  product: Product;
  onClick: () => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ product, onClick }) => {
  return (
    <div className="">
      <h5>{product.name}</h5>
      <hr></hr>
      <label>Adet : </label>
      <input type="number"></input>
      <hr></hr>
      <button onClick={() => {onClick();}}>Ekle</button>
    </div>
  );
};

export default ItemDetail;
