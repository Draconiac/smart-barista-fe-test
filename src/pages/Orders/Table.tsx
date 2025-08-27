import React from 'react';
import "./style.css"

interface TableProps{
  title: string;
  imageSrc?: string;
  onClick: () => void;
}

const Table: React.FC<TableProps> = ({ title, imageSrc, onClick }) => {
  return (
    <div className="custom-table-card" onClick={onClick}>
      {imageSrc ? <img src={imageSrc} alt={title} className="custom-table-image" /> : <></>}
      <div className="custom-table-title">{title}</div>
    </div>
  );
};

export default Table;
