import React, { useEffect, useState } from "react";
import "./style.css";

interface TableProps {
  occupied: boolean;
  title: string;
  imageSrc?: string;
  onClick: () => void;
}

const Table: React.FC<TableProps> = ({ occupied, title, imageSrc, onClick }) => {

  //const[occupied, setOccupied] = useState(false);
  
  const checkOccupied = () =>{
    return occupied ? {backgroundColor: "rgb(234, 124, 124)"} : {backgroundColor: "rgb(209, 244, 187)"}
  }

  // const handleOccupied = () => {
  //   setOccupied(prev => !prev);
  // }

  return (
    <div
      className="custom-table-card"
      style= { checkOccupied() }
      onClick={() => {
        // handleOccupied();
        onClick();
      }}
    >
      {imageSrc ? <img src={imageSrc} alt={title} className="custom-table-image" /> : <></>}
      <div className="custom-table-title">{title}</div>
    </div>
  );
};

export default Table;
