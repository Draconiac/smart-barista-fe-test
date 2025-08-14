import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { useAppDispatch } from "../../../app/hooks";
import "../../../components/css/Modal.css";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { closeModal } from "../../../features/modalSlice";
import { taModalMap } from "./TAModalExport";

Modal.setAppElement("#root");

interface TAModalProps<T> {
  isOpen: boolean;
  componentName: string;
  title: string;
  data?: T;
  getTabs?: () => void;
  getTables?: () => void;
  closeModal?: () => void;
}

const TaModal = <T extends {}>(props: TAModalProps<T>) => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(closeModal());
  const { t } = useTranslation("navbar_tableandareas");
  const Comp = taModalMap.get(props.componentName);

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={onClose}
      contentLabel={"Content Label Detail"}
      className="modal-content"
      overlayClassName="modal-overlay"
      style={{
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "30vw",
          maxWidth: "500px",
          height: "60vh",
          maxHeight: "600px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          overflow: "auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          outline: "none",
          zIndex: 1001,
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 1000,
        },
      }}
    >
      {
        <>
          <Header title={t(props.title)} />
          {Comp ? (
            <Comp
              {...props.data}
              getTabs={props.getTabs}
              getTables={props.getTables}
              closeModal={props.closeModal}
            />
          ) : (
            <p>Modal bulunamadı</p>
          )}
          <Footer onClose={onClose} />
        </>
      }
    </Modal>
  );
};

export default TaModal;
