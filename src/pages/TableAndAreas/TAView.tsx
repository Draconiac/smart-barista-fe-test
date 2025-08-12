import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import TableCard from "./modals/TableCard";

export interface TableType {
  id: number;
  areaId: number;
  title: string;
  isActive: boolean;
}

const TAView = ({ selectedAreaTab }: { selectedAreaTab: number }) => {
  const [tables, setTables] = useState<TableType[]>([]);

  useEffect(() => {
    axios
      .get<TableType[]>("/api/blabla")
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu:", error);
      });
  }, []);

  // tables verisini areaId'ye göre grupla
  const tableMap = useMemo(() => groupTablesByArea(tables), [tables]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
      {tableMap.get(selectedAreaTab)?.map((table) => (
        <div key={table.id}>
          <TableCard
            title={table.title}
            onButtonClick={() => alert(`Edit ${table.title}`)}
          />
        </div>
      ))}
    </div>
  );
};

function groupTablesByArea(tables: TableType[]): Map<number, TableType[]> {
  return tables.reduce((map, table) => {
    if (!map.has(table.areaId)) {
      map.set(table.areaId, []);
    }
    map.get(table.areaId)!.push(table);
    return map;
  }, new Map<number, TableType[]>());
}

export default TAView;
