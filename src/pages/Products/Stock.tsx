import { useEffect, useState } from "react";
import StockItems from "./StockItems";
import { Units } from "../../enums/GeneralEnums";
import GenericTable, { Column } from "../../components/GenericTable";
import api from "../../api";

interface Stock {
  id: string;
  name: string;
  amount: string;
  unit: string;
  used_amount: string;
  cost: string;
  unit_cost: string;
  buy_date: string;
  finish_date: string;
}

const Stock = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [formData, setFormData] = useState<Stock>({
    id: "",
    name: "",
    amount: "",
    unit: Units.KG,
    used_amount: "",
    cost: "",
    unit_cost: "",
    buy_date: "",
    finish_date: "",
  });

  // Input değişimlerini yöneten tek bir fonksiyon
  const handleInputChange = (
    fieldName: "name" | "amount" | "unit" | "used_amount" | "cost" | "unit_cost" | "buy_date" | "finish_date",
    value: string
  ) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleUnitCostCalculated = (calculatedCost: string) => {
    setFormData((prev) => ({ ...prev, unit_cost: calculatedCost }));
  };

  // Formu temizleme fonksiyonu
  const handleClear = () => {
    setFormData({
      id: "",
      name: "",
      amount: "",
      unit: Units.KG,
      used_amount: "",
      cost: "",
      unit_cost: "",
      buy_date: "",
      finish_date: "",
    });
  };

  const saveStock = () => {
    api
      .post<Stock>("stocks", formData)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getStocks(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const updateProduct = () => {
    api
      .put<Stock>(`stocks/${formData.id}`, formData)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getStocks(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const getStocks = () => {
    api
      .get<Stock[]>("stocks")
      .then((response) => {
        setStocks(response.data);
        console.info("Kayıt işlemi başarılı");
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  useEffect(() => {
    getStocks();
  }, []);

  const productColumns: Column<Stock>[] = [
    { key: "name", label: "Ürün Adı" },
    { key: "cost", label: "Fiyat" },
    { key: "amount", label: "Miktar" },
    { key: "unit", label: "Birim" },
    { key: "unit_cost", label: "Birim Fiyat" },
    { key: "used_amount", label: "Kullanılan Miktar" },
    { key: "buy_date", label: "Alış Tarihi" },
    { key: "finish_date", label: "Bitiş Tarihi" },
  ];

  const handleEdit = (product: Stock) => {
    setFormData(product);
  };

  const handleDelete = (product: Stock) => {
    const isConfirmed = window.confirm("Silmek istediğinizden emin misiniz?");

    if (isConfirmed) {
      api
        .delete(`stocks/${product.id}`)
        .then(() => {
          console.info("Silme işlemi başarılı");
          getStocks();
        })
        .catch((error) => console.log("Silme işlemi başarısız oldu" + error));
    }
  };

  return (
    <>
      <StockItems
        formData={formData}
        onInputChange={handleInputChange}
        onCalculateUnitCost={handleUnitCostCalculated}
      />
      <div className="">
        <button onClick={saveStock}>Kaydet</button>
        <button onClick={updateProduct}>Güncelle</button>
        <button onClick={handleClear}>Temizle</button>
      </div>
      <GenericTable data={stocks} columns={productColumns} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};
export default Stock;
