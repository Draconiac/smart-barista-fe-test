import { useEffect, useState } from "react";
import api from "../../api";

export interface AreaType {
  id: string;
  name: string;
}

const TATabs = ({
  setSelectedAreaTab,
}: {
  setSelectedAreaTab: (val: string) => void;
}) => {
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [selectedTab, setSelectedTab] = useState("");

  const areaButtonClicked = (id: string) => {
    setSelectedTab(id);
    setSelectedAreaTab(id);
  };

  useEffect(() => {
    api
      .get<AreaType[]>("/areas")
      .then((response) => {
        console.log(response.data);
        setAreas(response.data);
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu:", error);
      });
  }, []);

  const showSelectedTab = (areaId: string): React.CSSProperties => {
    return selectedTab === areaId
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
              areaButtonClicked(area.id);
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
