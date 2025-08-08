import { useTranslation } from "react-i18next";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { openModal, closeModal } from '../../features/modalSlice';
import ReduxTestPage from "../../features/posts/ReduxTestPage";
import Orders from "../Orders";

export default function TAButtons() {
  const { t } = useTranslation("navbar_tableandareas");
  const dispatch = useAppDispatch();
  const content = <div><Orders/></div>; // Example content for the modal

  const handleAddNewArea = () => {
    console.log("Add new area clicked");
    dispatch(openModal(content));
  };

  const handleEditArea = () => {
    dispatch(closeModal());
  };

  const handleAddNewTable = () => {
    console.log("Add new table clicked");
  };

  const handleAddNewTableBulk = () => {
    console.log("Add new tables in bulk clicked");
  };

  const handleNewTable = () => {
    console.log("New table clicked");
  };

  return (
    <div className="d-flex justify-content-end">
      <button className="btn btn-primary mb-2" onClick={handleAddNewArea}>
        {t("addNewArea")}
      </button>
      <button className="btn btn-primary mb-2" onClick={handleEditArea}>
        {t("editArea")}
      </button>
      <button className="btn btn-primary mb-2">{t("addNewTable")}</button>
      <button className="btn btn-primary mb-2">{t("addNewTableBulk")}</button>
      <button className="btn btn-primary mb-2">{t("newTable")}</button>
    </div>
  );
}
