import { useEffect, useState } from "react";
import api from "../../api";
import GenericTable, { Column, SpecialColumn } from "../../components/GenericTable";
import { Category, MinUnits } from "../../enums/GeneralEnums";
import Ingredients from "./Ingredients";
import ProductItems from "./ProductItems";
import { nanoid } from "@reduxjs/toolkit";
import { Stock } from "./Stock";

// API'den gelen verinin tipi
export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  recipe_price: number;
  quantity?: number; //sipariş verildiğinde setlenir sadece
}

const Product = () => {
  // Tüm form verilerini tek bir state objesinde topla
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    price: "",
    category: Category.DRINK,
    recipe_price: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isVisible, setVisible] = useState(false);
  const [ingredientProduct, setIngredientProduct] = useState<Product>({
    id: "",
    name: "",
    price: "",
    category: Category.DRINK,
    recipe_price: 0,
  });
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);

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
      recipe_price: 0,
    });
  };

  const saveProduct = () => {
    formData.id = nanoid();
    api
      .post<Product>("products", formData)
      .then(() => {
        getProducts(); // Veritabanını güncelle
        handleClear(); // Formu temizle
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const updateProduct = () => {
    api
      .put<Product>(`products/${formData.id}`, formData)
      .then(() => {
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
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const getStocks = () => {
    api
      .get<Stock[]>("stocks")
      .then((response) => {
        setStocks(response.data);
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  useEffect(() => {
    getProducts();
    getStocks();
  }, []);

  useEffect(() => {
    getIngredients();
  }, [ingredientProduct.id]);

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

  const getIngredients = () => {
    api
      .get<Ingredients[]>(`ingredients?productId=${ingredientProduct.id}`)
      .then((response) => {
        const ingredientsData = response.data;
        
        ingredientsData.forEach((data) => {
          let stock = stocks.filter(stock => stock.id === data.stockId);
          data.stockName = stock[0]?.name;
        })
        setIngredients(ingredientsData);
      })
      .catch((error) => console.log("Kayıt işlemi başarısız oldu" + error));
  };

  const getIngredientsAndUpdatePrice = (productId: string) => {
    // Ürüne ait tüm malzemeleri getir
    api.get<Ingredients[]>(`/ingredients?productId=${productId}`)
      .then((response) => {
        const ingredientsData = response.data;
        
        ingredientsData.forEach((data) => {
          let stock = stocks.filter(stock => stock.id === data.stockId);
          data.stockName = stock[0].name;
        })
        setIngredients(ingredientsData);

        const newPrice = ingredientsData.reduce((total, i) => {
          return total + Number(i.amountCost);
        }, 0);

        // Ürünün tarif fiyatını veritabanında güncelle
        api.patch(`products/${productId}`, { recipe_price: newPrice })
          .then(() => {
            console.log("Ürün tarif fiyatı başarıyla güncellendi");
            getProducts();
          })
          .catch(() => {});
      })
      .catch((error) => console.log("Malzemeler getirilirken hata oluştu: " + error));
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
      <Ingredients
        isVisible={isVisible}
        product={ingredientProduct}
        ingredients={ingredients}
        getIngredientsAndUpdatePrice={getIngredientsAndUpdatePrice}
      />
    </div>
  );
};

export default Product;
