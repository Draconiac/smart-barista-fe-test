import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../api";
import { TableOrders } from "../Menu/Menu";
import { Product } from "../Products/Product";
import { AreaType } from "../TableAndAreas/TATabs";
import { TableType } from "../TableAndAreas/TAView";
import OrderModal from "./OrderModal";
import Table from "./Table";

Modal.setAppElement("#root");

const Orders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TableType | null>(null);
  const [tables, setTables] = useState<TableType[]>([]);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [orderedProducts, setOrderedProducts] = useState<Product[]>([]);

  const openModal = (item: TableType) => {
    setSelectedItem(item);
    setOrderedProducts([]);
    getTableOrders(item.id).then(()=>{ setModalIsOpen(true)});
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
    setOrderedProducts([]);
  };

  useEffect(() => {
    getTables();
    getAreas();
  }, []);

  const refreshOrders = (tableId: string) => {//seçilen masayı refresle
    setTables(prevTables =>
        prevTables.map(table =>
          table.id === tableId ? { ...table, isActive: !table.isActive } : table
        )
      );
  }

  const getTableOrders = (tableId: string) => {
    setOrderedProducts([]);
    return api
      .get<TableOrders[]>(`table_orders?tableId=${tableId}&isPaid=false`)
      .then((response) => {
        const resp = response.data[0];
        if (resp && resp.orders) {
          const orders = resp.orders;
          setOrderedProducts(orders);
        }else {
          setOrderedProducts([]); 
        }
      })
      .catch((error) => {
        console.log(error);
        setOrderedProducts([]); 
      });
  };

  function sortTables(tables: TableType[]) {
    return tables.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // Karşılaştırmayı büyük harfe dönüştürerek yap
      const nameB = b.name.toUpperCase(); // Bu, "a" ve "A" gibi harflerin doğru sıralanmasını sağlar.

      if (nameA < nameB) {
        return -1; // a, b'den önce gelsin
      }
      if (nameA > nameB) {
        return 1; // a, b'den sonra gelsin
      }

      return 0; // İsimler eşitse, sıralama değişmesin
    });
  }

  const getTables = () => {
    api
      .get<TableType[]>("/tables")
      .then((response) => {
        setTables(sortTables(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAreas = () => {
    api
      .get<AreaType[]>("/areas")
      .then((response) => {
        setAreas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="orders-container">
      <h2>📦 Orders Page</h2>

      {areas.length > 0 ? (
        areas.map((area) => (
          <div key={area.name}>
            <h4>{area.name}</h4>
            <hr />
            <div className="table-items-container">
              {tables ? (
                tables.map((table) =>
                  table.areaId === area.id ? (
                    <div key={table.id}>
                      <Table
                        occupied={table.isActive}
                        title={table.name}
                        imageSrc={""}
                        onClick={() => {
                          openModal(table);
                        }}
                      />
                    </div>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
      <OrderModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        orderedProducts={orderedProducts}
        refreshOrders={refreshOrders}
      />
    </div>
  );
};

export default Orders;
