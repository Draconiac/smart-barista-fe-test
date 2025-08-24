import React, { useEffect, useState } from "react";
import api from "../../api";
import ComboBox from "../../components/GenericCombobox";
import { MinUnits } from "../../enums/GeneralEnums";
import "./prdctcss.css";
import { Product } from "./Product";

interface IngredientsItemsProps {
  formData: {
    stockId: string;
    amount: string;
    unit: string;
  };
  product: Product;
  onInputChange: (field: "stockId" | "amount" | "unit", value: string) => void;
}

interface StockItems {
  key: string;
  value: string;
}

const IngredientsItems: React.FC<IngredientsItemsProps> = ({
  formData,
  product,
  onInputChange
}) => {
  const [stockItems, setStockItems] = useState<StockItems[] | []>([]);

  useEffect(() => {
    getStocksAsIngredients();
  }, []);

  const getStocksAsIngredients = () => {
    api
      .get("stocks")
      .then((response) => {
        const stockData = response.data;
        const stockMap = stockData.map((item: any) => {
          return {
            key: item.id,
            value: item.name,
          };
        });

        setStockItems(stockMap);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-frame">
      <h5>{product.name} için İçerik Tanımlama</h5>
      <div className="ing-frame">
        
        <ComboBox
          options={stockItems}
          selectedValue={formData.stockId}
          onChange={(value) => {
            onInputChange("stockId", value as string);
          }}
          label="Ürün / Miktar "
        />
        <input
          type="number"
          name="amount"
          min="1"
          value={formData.amount}
          onChange={(e) => {
            onInputChange("amount", e.target.value);
          }}
        />
        <ComboBox
          options={MinUnits}
          selectedValue={formData.unit}
          onChange={(value) => {
            onInputChange("unit", value as string);
          }}
        />
      </div>
    </div>
  );
};

export default IngredientsItems;
