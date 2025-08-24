import { useEffect, useState } from "react";
import GenericTable, { Column, SpecialColumn } from "../../components/GenericTable";
import { Category } from "../../enums/GeneralEnums";
import api from "../../api";
import ProductItems from "./ProductItems";
import Ingredients from "./Ingredients";
import { isVisible } from "@testing-library/user-event/dist/utils";

// API'den gelen verinin tipi
export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  recipe_price: string;
}

const Product = () => {
  // Tüm form verilerini tek bir state objesinde topla
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    price: "",
    category: Category.DRINK,
    recipe_price: "",
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [isVisible, setVisible] = useState(false);
  const [ingredientProduct, setIngredientProduct] = useState<Product>({
    id: "",
    name: "",
    price: "",
    category: Category.DRINK,
    recipe_price: "",
  });

  // Input değişimlerini yöneten tek bir fonksiyon
  const handleInputChange = (fieldName: "name" | "price" | "category" | "recipe_price", value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Formu temizleme fonksiyonu
  const handleClear = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      category: Category.DRINK,
      recipe_price: "",
    });
  };

  const saveProduct = () => {
    api
      .post<Product>("products", formData)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getProducts(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const updateProduct = () => {
    api
      .put<Product>(`products/${formData.id}`, formData)
      .then(() => {
        console.info("Kayıt işlemi başarılı");
        getProducts(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const getProducts = () => {
    api
      .get<Product[]>("products")
      .then((response) => {
        setProducts(response.data);
        console.info("Kayıt işlemi başarılı");
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const productColumns: Column<Product>[] = [
    { key: "name", label: "Ürün Adı" },
    { key: "price", label: "Fiyat" },
    { key: "category", label: "Kategori" },
    { key: "recipe_price", label: "Maliyet" },
  ];

  const specialColumn: SpecialColumn<Product> = {
    buttonName: "İçerik Görüntüle",
    headerName: "İçerik",
    onButtonClick: (product: Product) => {
      setVisible(true);
      setIngredientProduct(product);
    },
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
  };

  const handleDelete = (product: Product) => {
    const isConfirmed = window.confirm("Silmek istediğinizden emin misiniz?");

    if (isConfirmed) {
      api
        .delete(`products/${product.id}`)
        .then(() => {
          console.info("Silme işlemi başarılı");
          getProducts();
        })
        .catch((error) => console.log("Silme işlemi başarısız oldu" + error));
    }
  };

  return (
    <div>
      <ProductItems formData={formData} onInputChange={handleInputChange} />
      <div className="">
        <button onClick={saveProduct}>Kaydet</button>
        <button onClick={updateProduct}>Güncelle</button>
        <button onClick={handleClear}>Temizle</button>
      </div>
      <GenericTable
        data={products}
        columns={productColumns}
        specialColumn={specialColumn}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Ingredients isVisible={isVisible} product={ingredientProduct} />
    </div>
  );
};

export default Product;
