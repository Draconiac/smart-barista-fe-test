import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../../api";
import ItemModal from "../../components/X_ItemModal";
import { AreaType } from "../TableAndAreas/TATabs";
import { TableType } from "../TableAndAreas/TAView";
import Item from "../Menu/Item";
import Table from "./Table";
import { Product } from "../Products/Product";

Modal.setAppElement("#root");

const Orders = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [tables, setTables] = useState<TableType[]>([]);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [tableAndAreas, setTableAndAreas] = useState<[]>([]);

  type SelectedItem = {
    product: Product;
  };

  const openModal = (item: SelectedItem) => {
    setSelectedItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    getTables();
    getAreas();
  }, []);

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
                    <Table
                      title={table.name}
                      imageSrc={""}
                      onClick={()=>{window.alert("Menüyü ac işlemler altına koydum geçiçi olarak")}}
                    />
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

      <ItemModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        selectedItem={selectedItem}
        description={undefined}
      />
    </div>
  );
};

export default Orders;
