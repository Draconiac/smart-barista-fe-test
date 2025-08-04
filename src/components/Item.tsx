import React from 'react';
import './_css/Item.css';

interface ItemProps{
  title: string;
  imageSrc: string;
  onClick: () => void;
}

const Item: React.FC<ItemProps> = ({ title, imageSrc, onClick }) => {
  return (
    <div className="custom-item-card" onClick={onClick}>
      <img src={imageSrc} alt={title} className="custom-item-image" />
      <div className="custom-item-title">{title}</div>
    </div>
  );
};

export default Item;
