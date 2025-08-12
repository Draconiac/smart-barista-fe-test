import { useEffect, useMemo, useState } from "react";
import TableCard from "./modals/TableCard";
import api from "../../api";

export interface TableType {
  id: string;
  areaId: string;
  name: string;
  isActive: boolean;
}

const TAView = ({ selectedAreaTab }: { selectedAreaTab: string }) => {
  const [tables, setTables] = useState<TableType[]>([]);

  useEffect(() => {
    api
      .get<TableType[]>("/tables")
      .then((response) => {
        console.log(response.data);
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
            id={table.id}
            name={table.name}
            isActive={table.isActive}
            onButtonClick={() => alert(`Edit ${table.name}`)}
          />
        </div>
      ))}
    </div>
  );
};

function groupTablesByArea(tables: TableType[]): Map<string, TableType[]> {
  return tables.reduce((map, table) => {
    if (!map.has(table.areaId)) {
      map.set(table.areaId, []);
    }
    map.get(table.areaId)!.push(table);
    return map;
  }, new Map<string, TableType[]>());
}

export default TAView;
