const Header = ({ title }: { title: string }) => {
  return (
    <header
      style={{ padding: "1rem", background: "#eee", textAlign: "left" }}
    >
      <h5>{title}</h5>
    </header>
  );
};

export default Header;
