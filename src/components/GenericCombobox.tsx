import React from "react";

// İki farklı veri tipi için birleşim (union) tipi
type OptionData<T> =
  | T // Enum için (örn: { DRINK: 'İçecek', FOOD: 'Yiyecek' })
  | { key: string; value: string }[]; // Key-Value dizisi için (örn: [{ key: '1', value: 'Seçenek 1' }])

// ComboBox'un alacağı props'lar için tip tanımlaması
interface ComboBoxProps<T extends object> {
  options: OptionData<T>;
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  label?: string;
}

const ComboBox = <T extends object>(props: ComboBoxProps<T>) => {
  const { options, selectedValue, onChange, label } = props;

  // Verinin key-value dizisi mi yoksa Enum mu olduğunu kontrol et
  const isArrayOfObjects = Array.isArray(options);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {label && <label>{label}:</label>}
      <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
        <option value="">Seçiniz...</option>
        {isArrayOfObjects
          ? // Eğer veri key-value dizisiyse

            (options as { key: string; value: string }[]).map((option) => (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            ))
          : // Eğer veri Enum objesiyse
            Object.entries(options).map(([key, value]) => (
              <option key={key} value={key}>
                {String(value)}
              </option>
            ))}
      </select>
    </div>
  );
};

export default ComboBox;
