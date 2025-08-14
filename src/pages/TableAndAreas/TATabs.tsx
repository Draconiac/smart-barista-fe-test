import { useEffect, useState } from "react";

export interface AreaType {
  id: string;
  name: string;
}

const TATabs = ({
  setSelectedTab,
  areas,
  getTables,
}: {
  setSelectedTab: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }>
  >;
  areas: AreaType[];
  getTables: () => void;
}) => {
  const [selectedTabId, setSelectedTabId] = useState("");

  const areaButtonClicked = (area: { id: string; name: string }) => {
    setSelectedTabId(area.id);
    setSelectedTab(area);
  };

  useEffect(() => {
    getTables();
  }, [selectedTabId]);

  const showSelectedTab = (areaId: string): React.CSSProperties => {
    return selectedTabId === areaId
      ? { backgroundColor: "red" }
      : { backgroundColor: "green" };
  };

  return (
    <div style={{ display: "flex" }}>
      {areas.map((area) => (
        <div key={area.id}>
          <button
            style={showSelectedTab(area.id)}
            onClick={() => {
              areaButtonClicked(area);
            }}
          >
            {area.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TATabs;
