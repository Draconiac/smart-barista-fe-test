import { useEffect, useState } from "react";
import api from "../../api";
import GenericTable, { Column } from "../../components/GenericTable";
import IngredientsItems from "./IngredientsItems";
import { MinUnits } from "../../enums/GeneralEnums";
import { Product } from "./Product";
import { nanoid } from "@reduxjs/toolkit";

interface Ingredients {
  id: string;
  stockId: string;
  amount: string;
  unit: string;
  productId: string;
}

interface IngredientsProps {
  isVisible: boolean;
  product: Product;
  ingredients: Ingredients[];
  getIngredients: ()=> void;
}

const Ingredients: React.FC<IngredientsProps> = (props: IngredientsProps) => {
  const { isVisible, product, ingredients, getIngredients } = props;
  const [formData, setFormData] = useState<Ingredients>({
    id: "",
    stockId: "",
    amount: "",
    unit: MinUnits.gr,
    productId: product.id,
  });
  
  // Input değişimlerini yöneten tek bir fonksiyon
  const handleInputChange = (fieldName: "stockId" | "amount" | "unit", value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Formu temizleme fonksiyonu
  const handleClear = () => {
    setFormData({
      id: "",
      stockId: "",
      amount: "",
      unit: MinUnits.gr,
      productId: "",
    });
  };

  const saveIngredient = () => {
    console.log("formData", formData);
    formData.id = nanoid();
    formData.productId = product.id;
    api
      .post<Ingredients>("/ingredients", formData)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getIngredients(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const updateIngredient = () => {
    api
      .put<Ingredients>(`ingredients/${formData.id}`, formData)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getIngredients(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  // const getIngredients = () => {
  //   api
  //     .get<Ingredients[]>(`ingredients?productId=${product.id}`)
  //     .then((response) => {
  //       setIngredients(response.data);
  //       console.info("Kayıt işlemi başarılı");
  //     })
  //     .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  // };

  // product prop'u her değiştiğinde formData'yı güncelle
  useEffect(() => {
    if (product && product.id) {
      setFormData((prevData) => ({
        ...prevData,
        productId: product.id,
      }));
    }
  }, [product]);

  useEffect(() => {
    getIngredients();
  }, []);

  const ingredientColumns: Column<Ingredients>[] = [
    { key: "stockId", label: "Ürün" },
    { key: "amount", label: "Miktar" },
  ];

  const handleEdit = (ingredient: Ingredients) => {
    setFormData(ingredient);
  };

  const handleDelete = (ingredient: Ingredients) => {
    const isConfirmed = window.confirm("Silmek istediğinizden emin misiniz?");

    if (isConfirmed) {
      api
        .delete(`ingredients/${ingredient.id}`)
        .then(() => {
          console.info("Silme işlemi başarılı");
          getIngredients();
        })
        .catch((error) => console.log("Silme işlemi başarısız oldu" + error));
    }
  };
  return isVisible ? (
    <div>
      <IngredientsItems formData={formData} product={product} onInputChange={handleInputChange} />
      <div className="">
        <button onClick={saveIngredient}>Kaydet</button>
        <button onClick={updateIngredient}>Güncelle</button>
        <button onClick={handleClear}>Temizle</button>
      </div>
      <GenericTable
        data={ingredients}
        columns={ingredientColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  ) : (
    <></>
  );
};

export default Ingredients;
