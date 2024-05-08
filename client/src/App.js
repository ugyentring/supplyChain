import Home from "./components/Home/Home";
import Login from "./components/Home/Login";
import Admin from "./components/pages/Admin";
import ScannerPage from "./components/pages/ScannerPage";
import AuthenticProduct from "./components/pages/AuthenticProduct";
import AddAccount from "./components/pages/AddAccount";
import ManageAccount from "./components/pages/ManageAccount";
import RequireAuth from "./components/RequireAuth";
import Manufacturer from "./components/pages/Manufacturer";
import AddProduct from "./components/pages/AddProduct";
import FakeProduct from "./components/pages/FakeProduct";
import Product from "./components/pages/Product";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/scanner" element={<ScannerPage />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/authentic-product" element={<AuthenticProduct />} />
        <Route exact path="/fake-product" element={<FakeProduct />}></Route>

        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/add-account" element={<AddAccount />} />
          <Route exact path="/manage-account" element={<ManageAccount />} />
        </Route>

        {/*manufacturer route */}
        <Route element={<RequireAuth allowedRoles={["manufacturer"]} />}>
          <Route exact path="/manufacturer" element={<Manufacturer />} />
          <Route exact path="/add-product" element={<AddProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
