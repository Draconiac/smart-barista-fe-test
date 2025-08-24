import React, { useEffect } from "react";
import ComboBox from "../../components/GenericCombobox";
import { Units } from "../../enums/GeneralEnums";
import "./prdctcss.css";

// Props'ları yeniden tanımla
export interface StockItemsProps {
  formData: {
    id: string;
    name: string;
    amount: string;
    unit: string;
    used_amount: string;
    cost: string;
    unit_cost: string;
    buy_date: string;
    finish_date: string;
  };
  onInputChange: (
    field: "name" | "amount" | "unit" | "used_amount" | "cost" | "unit_cost" | "buy_date" | "finish_date",
    value: string
  ) => void;
  onCalculateUnitCost: (unitCost: string) => void;
}

const StockItems: React.FC<StockItemsProps> = ({ formData, onInputChange, onCalculateUnitCost }) => {
  useEffect(() => {
    if (formData.amount && formData.cost) {
      let cost = Number.parseFloat(formData.cost);
      let amount = Number.parseFloat(formData.amount);
      let result = 0;

      if (formData.unit === Units.KG || formData.unit === Units.LT) {
        result = cost / (amount * 1000);
      } else if (formData.unit === Units.gr || formData.unit === Units.PIEACE) {
        result = cost / amount;
      }

      onCalculateUnitCost(result.toFixed(3));
    }
  }, [formData.amount, formData.cost, formData.unit]);

  return (
    <div className="main-frame">
      <h5>Stok Tanımlama</h5>
      <div className="form-row">
        <label>Ürün Adı : </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => onInputChange("name", e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Fiyat : </label>
        <input
          type="number"
          name="cost"
          min="1"
          value={formData.cost}
          onChange={(e) => {
            onInputChange("cost", e.target.value);
          }}
        />
      </div>
      <div className="form-row">
        <label>Miktar : </label>
        <input
          type="number"
          name="amount"
          min="1"
          value={formData.amount}
          onChange={(e) => {
            onInputChange("amount", e.target.value);
          }}
        />
        <div className="form-row">
          <ComboBox
            options={Units}
            selectedValue={formData.unit}
            onChange={(value) => {
              onInputChange("unit", value as string);
            }}
          />
        </div>
      </div>
      <div className="form-row">
        <label>Birim Fiyat : </label>
        <input
          disabled={true}
          type="number"
          name="unit_cost"
          min="1"
          value={formData.unit_cost}
          onChange={(e) => onInputChange("unit_cost", e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Kullanılan Miktar : </label>
        <input
          disabled={true}
          type="number"
          name="used_amount"
          min="1"
          value={formData.used_amount}
          onChange={(e) => onInputChange("used_amount", e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Alındığı Tarih : </label>
        <input
          type="date"
          name="buy_date"
          value={formData.buy_date}
          onChange={(e) => onInputChange("buy_date", e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Bittiği Tarih : </label>
        <input
          disabled={true}
          type="date"
          name="finish_date"
          value={formData.finish_date}
          onChange={(e) => onInputChange("finish_date", e.target.value)}
        />
      </div>
    </div>
  );
};

export default StockItems;
