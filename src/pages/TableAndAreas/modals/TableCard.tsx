import React from "react";

type Props = {
  id: number;
  title: string;
  onButtonClick?: () => void;
};

// 100x100px kare, ortada title, sağ üstte küçük bir buton
export default function Table({ id, title, onButtonClick }: Props) {
  return (
    <div
      className={"relative border rounded bg-white text-gray-800"}
      style={{ width: 100, height: 100, position: "relative" }}
    >
      <div style={{alignItems : "flex-end"}}>
        <button
          onClick={onButtonClick}
          className="absolute w-5 h-5 flex items-center flex-end justify-center bg-gray-200 rounded hover:bg-gray-300"
          style={{ top: 4, right: 4 }}
          aria-label="small-button"
        >
          •
        </button>
      </div>
      {/* Title tam ortada */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <span
          className="text-base font-medium select-none"
          style={{ textAlign: "center" }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
