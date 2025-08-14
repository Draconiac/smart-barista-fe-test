import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import { openModal } from "../../features/modalSlice";

const TAButtons = ({
  selectedTab,
  setSelectedButton,
}: {
  selectedTab: {id: string, name: string};
  setSelectedButton: (val: { title: string; componentName: string }) => void;
}) => {
  const { t } = useTranslation("navbar_tableandareas");
  const dispatch = useAppDispatch();

  const handleAddNewArea = () => {
    setSelectedButton({ title: "addNewArea", componentName: "TAAddNewArea" });
    dispatch(openModal());
  };

  const handleEditArea = () => {
    let editData = {
      title: "editArea",
      componentName: "TAEditArea",
      selectedTab: selectedTab
    };
    setSelectedButton(editData);
    dispatch(openModal());
  };

  const handleAddNewTable = () => {
    setSelectedButton({ title: "addNewTable", componentName: "TAAddNewTable" });
    dispatch(openModal());
  };

  const handleAddNewTableBulk = () => {
    setSelectedButton({
      title: "addNewTableBulk",
      componentName: "TAAddNewTableBulk",
    });
    dispatch(openModal());
  };

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-primary mb-2" onClick={handleAddNewArea}>
        {t("addNewArea")}
      </button>
      <button
        className="btn btn-primary mb-2"
        disabled={selectedTab.id === ""}
        onClick={handleEditArea}
      >
        {t("editArea")}
      </button>
      <button
        className="btn btn-primary mb-2"
        disabled={selectedTab.id === ""}
        onClick={handleAddNewTable}
      >
        {t("addNewTable")}
      </button>
      <button
        className="btn btn-primary mb-2"
        disabled={selectedTab.id === ""}
        onClick={handleAddNewTableBulk}
      >
        {t("addNewTableBulk")}
      </button>
    </div>
  );
};

export default TAButtons;
