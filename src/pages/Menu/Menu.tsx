import { useEffect, useState } from "react";
import api from "../../api";
import { Category } from "../../enums/GeneralEnums";
import { Product } from "../Products/Product";
import Item from "./Item";
import ItemModal from "./ItemModal";
import SelectedItem from "./SelectedItem";
import "./style.css";
import { nanoid } from "@reduxjs/toolkit";

interface ItemDetailProps {
  quantity: string;
}

export interface SelectedItemsProps {
  productId: string;
  productName: string;
  quantity: number;
}

interface TableProps {
  tableId: string;
  orderedProducts: Product[];
  refreshOrders: (tableId: string) => void;
  closeMenuModal: () => void;
}

export interface TableOrders {
  id: string;
  tableId: string;
  orders: Product[];
  total: number;
  orderTime: string;
  isPaid: boolean;
  paidTime: string;
}

const Menu: React.FC<TableProps> = ({ closeMenuModal, tableId, orderedProducts, refreshOrders }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ItemDetailProps | null>(null);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [drinkTotalCost, setDrinkTotalCost] = useState(0);
  const [foodTotalCost, setFoodTotalCost] = useState(0);
  const [emptyOrder, setEmptyOrder] = useState(true);

  const openModal = (item: Product) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    setSelectedItems(orderedProducts);
    getProducts();
  }, []);

  useEffect(() => {
    selectedItems.length > 0 ? setEmptyOrder(false) : setEmptyOrder(true);
  }, [selectedItems]);

  const getProducts = () => {
    api
      .get<Product[]>("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {});
  };

  const handleInputChange = (fieldName: "quantity", value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    calculateTotalCost();
  }, [selectedItems]);

  const calculateTotalCost = () => {
    let drinkTotal = 0;
    let foodTotal = 0;

    selectedItems.forEach((item) => {
      const cost = Number.parseInt(item.price) * (item.quantity === undefined ? 1 : item.quantity);
      if (item.category === Category.DRINK) {
        drinkTotal += cost;
      } else {
        foodTotal += cost;
      }
    });

    setDrinkTotalCost(drinkTotal);
    setFoodTotalCost(foodTotal);
  };

  const handleSelectedItems = (item: Product) => {
    // Yeni gelen item'ın ID'si dizide zaten var mı diye kontrol et
    const itemExists = selectedItems.some((selectedItem) => selectedItem.id === item.id);

    if (itemExists) {
      // Eğer varsa, map ile o item'ı güncelle
      setSelectedItems((prevData) =>
        prevData.map(
          (selectedItem) => (selectedItem.id === item.id ? item : selectedItem) // Eğer ID'ler eşleşiyorsa, güncel item'ı döndür
        )
      );
    } else {
      // Eğer yoksa, yeni item'ı diziye ekle
      setSelectedItems((prevData) => [...prevData, item]);
    }
  };

  const handleSelectedItemDelete = (item: Product) => {
    setSelectedItems(selectedItems.filter((s) => s.id !== item.id));
  };

  const orderCreated = () => {
    api
      .patch(`tables/${tableId}`, { isActive: true })
      .then(() => {
        closeMenuModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createOrder = () => {
    const date = new Date().toLocaleDateString("tr-TR") + "-" + new Date().toLocaleTimeString("tr-TR");
    const tableOrders: TableOrders = {
      id: nanoid(),
      tableId: tableId,
      orders: selectedItems,
      total: drinkTotalCost + foodTotalCost,
      orderTime: date,
      isPaid: false,
      paidTime: "",
    };

    api.get<TableOrders[]>(`table_orders?tableId=${tableId}&isPaid=false`).then((response) => {
      const activeOrder = response.data[0];
      if (activeOrder) {
        const updatedOrders = selectedItems;
        const newTotal = drinkTotalCost + foodTotalCost;

        api
          .patch(`table_orders/${activeOrder.id}`, {
            orders: updatedOrders,
            total: newTotal,
          })
          .then(() => {
            closeMenuModal();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        //ilk sipariş
        api
          .post<TableOrders>("/table_orders", tableOrders)
          .then(() => {
            orderCreated();
            refreshOrders(tableId);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const getPayment = () => {
    const date = new Date().toLocaleDateString("tr-TR") + "-" + new Date().toLocaleTimeString("tr-TR");

    api
      .get<TableOrders[]>(`table_orders?tableId=${tableId}&isPaid=false`)
      .then((response) => {
        const activeOrder = response.data[0];
        if (activeOrder) {
          api
            .patch(`table_orders/${activeOrder.id}`, { paidTime: date, isPaid: true })
            .then(() => {
              api
                .patch(`tables/${tableId}`, { isActive: false })
                .then(() => {
                  closeMenuModal();
                  refreshOrders(tableId);
                })
                .catch(() => {});
            })
            .catch(() => {});
        }
      })
      .catch();
  };

  return (
    <div className="menu-container">
      <div className="menu-container-left">
        <h5>Menü</h5>
        <hr></hr>
        {products ? (
          products.map((product) => (
            <div key={product.id}>
              <Item
                title={product.name}
                product={product}
                onClick={() => {
                  openModal(product);
                }}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="divider"></div>
      <div className="menu-container-right">
        <h5>Ürünler</h5>
        <hr></hr>

        {selectedItems && selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <div key={item.id}>
              <SelectedItem
                product={item}
                edit={() => {
                  openModal(item);
                }}
                remove={handleSelectedItemDelete}
              />
            </div>
          ))
        ) : (
          <></>
        )}
        <div className="menu-container-right-total">
          <div className="total-divider"></div>

          <div className="total-row">
            <label>İçecek</label>
            <label>{drinkTotalCost} TL</label>
          </div>
          <div className="total-row">
            <label>KDV</label>
            <label>%8</label>
          </div>

          <div className="total-divider"></div>

          <div className="total-row">
            <label>Yiyecek</label>
            <label>{foodTotalCost} TL</label>
          </div>
          <div className="total-row">
            <label>KDV</label>
            <label>%8</label>
          </div>

          <div className="total-divider"></div>

          <div className="final-total">
            <h5>Toplam</h5>
            <h5>{drinkTotalCost + foodTotalCost} TL</h5>
          </div>
          <button disabled={emptyOrder} className="order-button" onClick={() => createOrder()}>
            Siparişi {orderedProducts.length === 0 ? "Oluştur" : "Ekle"}
          </button>
          <button disabled={emptyOrder} className="payment-button" onClick={() => getPayment()}>
            Ödeme Al{" "}
          </button>
        </div>
      </div>
      <ItemModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        handleInputChange={handleInputChange}
        handleSelectedItems={handleSelectedItems}
      />
    </div>
  );
};

export default Menu;
