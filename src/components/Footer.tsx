interface FooterProps {
  onClose: () => void;
}

const Footer: React.FC<FooterProps> = ({ onClose }) => {
  return (
    <footer
      style={{
        padding: "1rem",
        background: "#eee",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={onClose} className="modal-close-button">
          Kapat
        </button>
      </div>
    </footer>
  );
};

export default Footer;
