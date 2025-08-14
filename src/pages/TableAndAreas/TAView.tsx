import { useEffect, useState } from "react";
import TableCard from "./modals/TableCard";

export interface TableType {
  id: string;
  areaId: string;
  name: string;
  isActive: boolean;
}

interface TAViewProps {
  selectedTab: { id: string; name: string };
  tables: TableType[] | [] | undefined;
}

const TAView: React.FC<TAViewProps> = ({ selectedTab, tables }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
      {tables ? (
        tables.map((table) => (
          <div key={table.id}>
            <TableCard
              id={table.id}
              name={table.name}
              isActive={table.isActive}
            />
          </div>
        ))
      ) : (
        <div>Masa Yok</div>
      )}
    </div>
  );
};

export default TAView;
