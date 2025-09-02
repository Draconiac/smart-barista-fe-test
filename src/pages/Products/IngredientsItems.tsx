import React, { useEffect, useState } from "react";
import api from "../../api";
import ComboBox from "../../components/GenericCombobox";
import { MinUnits } from "../../enums/GeneralEnums";
import "./prdctcss.css";
import { Product } from "./Product";
import { Stock } from "./Stock";

interface IngredientsItemsProps {
  formData: {
    stockId: string;
    amount: string;
    amountCost: number;
    unit: string;
  };
  product: Product;
  onInputChange: (field: "stockId" | "amount" | "unit" | "amountCost", value: string) => void;
}

interface StockItems {
  key: string;
  value: string;
}

const IngredientsItems: React.FC<IngredientsItemsProps> = ({ formData, product, onInputChange }) => {
  const [stockItems, setStockItems] = useState<StockItems[] | []>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [amountCost, setAmountCost] = useState(0);

  useEffect(() => {
    getStocksAsIngredients();
  }, []);

  useEffect(() => {
    calc();
  }, [formData.amount]);

  const getStocksAsIngredients = () => {
    api
      .get("stocks")
      .then((response) => {
        const stockData = response.data;
        setStocks(stockData);
        const stockMap = stockData.map((item: Stock) => {
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

  const calc = () => {
    let item = stocks.filter((i) => i.id === formData.stockId);
    let unit_cost = parseFloat(item[0]?.unit_cost);
    let amount = parseFloat(formData.amount);
    let calculatedCost = (unit_cost * amount).toFixed(3);
    
    onInputChange("amountCost", calculatedCost);
    setAmountCost(Number(calculatedCost));
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
        <ComboBox
          options={MinUnits}
          selectedValue={formData.unit}
          onChange={(value) => {
            onInputChange("unit", value as string);
          }}
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
        <label>{isNaN(amountCost)  ? 0 : amountCost}</label>
        <label>TL</label>
      </div>
    </div>
  );
};

export default IngredientsItems;
