import React from "react";
import "./style.css";
import { Product } from "../Products/Product";

interface SelectedItem {
  product: Product;
  edit: () => void;
  remove: (product: Product) => void;
}

const SelectedItem: React.FC<SelectedItem> = ({ product, edit, remove }) => {
  return (
    <div className="selected-item-container">
      <div className="selected-item-info">
        <label className="item-name">{product.name}</label>
        <label className="item-quantity">
          {" x "} {product.quantity}
        </label>
        <label className="item-price">
          = {Number.parseInt(product.price) * (product.quantity ? product.quantity : 1)} TL
        </label>
      </div>
      <div className="selected-item-actions">
        <button onClick={edit} className="edit-button">
          Düzenle
        </button>
        <button onClick={() => remove(product)} className="remove-button">
          Sil
        </button>
      </div>
    </div>
  );
};

export default SelectedItem;
