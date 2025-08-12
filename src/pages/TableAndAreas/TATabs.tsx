import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { nanoid } from "nanoid";

const TATabs = ({
  setSelectedAreaTab,
}: {
  setSelectedAreaTab: (val: string) => void;
}) => {
  const tabs = useAppSelector((state) => state.test);
  const [selectedTab, setSelectedTab] = useState("");

  const areaButtonClicked = (areaName: string) => {
    setSelectedTab(areaName);
    setSelectedAreaTab(areaName);
  };

  const showSelectedTab = (areaName: string): React.CSSProperties => {
    return selectedTab === areaName
      ? { backgroundColor: "red" }
      : { backgroundColor: "green" };
  };

  return (
    <div style={{ display: "flex" }}>
      {tabs.map((area) => (
        <div key={nanoid()}>
          <button
            style={showSelectedTab(area.areaName)}
            onClick={() => {
              areaButtonClicked(area.areaName);
            }}
          >
            {area.areaName}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TATabs;
