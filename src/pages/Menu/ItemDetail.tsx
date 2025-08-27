import React, { Dispatch, SetStateAction, useState } from "react";
import "./style.css";
import { Product } from "../Products/Product";
import { SelectedItemsProps } from "./Menu";

interface ItemDetailProps {
  product: Product;
  handleInputChange: (fieldName: "quantity", value: string) => void;
  handleSelectedItems: (item: Product) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({
  product,
  handleInputChange,
  handleSelectedItems,
}) => {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

  return (
    <div key={product.id} className="">
      <h5>{product.name}</h5>
      <hr></hr>
      <label>Adet : </label>
      <input name="quantity" type="text" disabled={true} value={count}></input>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <hr></hr>
      <button
        name="ekle"
        onClick={() => {
          product.quantity = count;
          handleSelectedItems(product);
          console.log(product);
          setCount(0);
        }}
      >
        Ekle
      </button>
    </div>
  );
};

export default ItemDetail;
