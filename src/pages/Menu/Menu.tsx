import React, { useEffect, useState } from "react";
import "./style.css";
import { Product } from "../Products/Product";
import api from "../../api";
import Item from "./Item";
import ItemModal from "../../components/ItemModal";
import ItemDetail from "./ItemDetail";



const Menu = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const openModal = (item: Product) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    api
      .get<Product[]>("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {});
  };

  return (
    <div className="menu-container">
      <div className="menu-container-left">
        <h5>Menü</h5>
        <hr></hr>
        {products ? (
          products.map((product) => (
            <Item
              title={product.name}
              product={product}
              onClick={() => {
                openModal(product);
              }}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="divider"></div>
      <div className="menu-container-right">
        <h5>Ürünler</h5>
        <hr></hr>
      </div>
      <ItemModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Menu;
