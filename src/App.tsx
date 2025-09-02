import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Orders from "./pages/Orders/Orders";
import Product from "./pages/Products/Product";
import Stock from "./pages/Products/Stock";
import TableAndAreas from "./pages/TableAndAreas/TableAndAreas";
import { DataProvider } from "./pages/DataContext";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="d-flex">
          <Sidebar />
          <div className="p-3 flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tanimlamalar/masabolgeler" element={<TableAndAreas />} />
              <Route path="/siparis" element={<Orders />} />
              <Route path="/tanimlamalar/menuurunler" element={<Product />} />
              <Route path="/tanimlamalar/stok" element={<Stock />} />
            </Routes>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
