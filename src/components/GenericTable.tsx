import React from "react";

// Tip tanımlamaları
export interface Column<T> {
  key: keyof T;
  label: string;
}

export interface SpecialColumn<T>{
  buttonName : string,
  headerName : string,
  onButtonClick: (item: T) => void;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  specialColumn?: SpecialColumn<T>;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

const GenericTable = <T extends { id: string | number }>(props: GenericTableProps<T>) => {
  const { data, columns, specialColumn, onEdit, onDelete } = props;

  // Veri yoksa bir mesaj göster
  if (data.length === 0) {
    return <p>Gösterilecek veri bulunamadı.</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#f2f2f2" }}>
          {/* Sütun başlıklarını dinamik olarak oluştur */}
          {columns.map((column) => (
            <th
              key={column.key as string}
              style={{ padding: "8px", border: "1px solid #ddd", textAlign: "left" }}
            >
              {column.label}
            </th>
          ))}
          {specialColumn ?  <th style={{ padding: "8px", border: "1px solid #ddd" }}>{specialColumn?.headerName}</th> : <></>  }
          <th style={{ padding: "8px", border: "1px solid #ddd" }}>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id as string}>
            {/* Her satırdaki veriyi dinamik olarak doldur */}
            {columns.map((column) => (
              <td key={column.key as string} style={{ padding: "8px", border: "1px solid #ddd" }}>
                {String(item[column.key])}
              </td>
            ))}
            {/* Özel istek butonları */}
            {specialColumn  ? (
              <td style={{ padding: "8px", border: "1px solid #ddd", whiteSpace: "nowrap" }}>
                <button onClick={() => specialColumn?.onButtonClick(item)}>{specialColumn?.buttonName}</button>
              </td>
            ) : (
              <></>
            )}
            {/* Düzenle ve Sil butonları */}
            <td style={{ padding: "8px", border: "1px solid #ddd", whiteSpace: "nowrap" }}>
              <button onClick={() => onEdit(item)}>Düzenle</button>
              <button onClick={() => onDelete(item)} style={{ marginLeft: "8px" }}>
                Sil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
