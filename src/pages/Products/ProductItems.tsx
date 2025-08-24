import React from "react";
import ComboBox from "../../components/GenericCombobox";
import { Category } from "../../enums/GeneralEnums";
import "./prdctcss.css";

// Props'ları yeniden tanımla
interface ProductItemsProps {
  formData: {
    name: string;
    price: string;
    category: string;
    recipe_price: string;
  };
  onInputChange: (field: "name" | "price" | "category" | "recipe_price", value: string) => void;
}

const ProductItems: React.FC<ProductItemsProps> = ({ formData, onInputChange }) => {
  return (
    <div className="main-frame">
      <h5>Ürün Tanımlama</h5>
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
          name="price"
          min="1"
          value={formData.price}
          onChange={(e) => onInputChange("price", e.target.value)}
        />
      </div>
      <div className="form-row">
        <ComboBox
          options={Category}
          selectedValue={formData.category}
          onChange={(value) => onInputChange("category", value as string)} // onInputChange'ı çağır
          label="Kategori "
        />
      </div>
    </div>
  );
};

export default ProductItems;