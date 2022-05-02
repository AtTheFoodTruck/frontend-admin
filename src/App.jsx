import "bootswatch/dist/sketchy/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import DashBoard from "./components/DashBoard";
import Layout from "./components/Layout";
import MenuList from "./components/MenuList";
import MenuRegister from "./components/MenuRegister";
import ReceiveOrder from "./components/ReceiveOrder";
import OwnerRegister from "./components/OwnerRegister";
import Sidebar from "./components/Sidebar";
import StoreRegister from "./components/StoreRegister";
import PrevOrder from "./components/PrevOrder";
function App() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/menu-register" element={<MenuRegister />} />
          <Route path="/receive-order" element={<ReceiveOrder />} />
          <Route path="/menu-list" element={<MenuList />} />
          <Route path="/owner-register" element={<OwnerRegister />} />
          <Route path="/store-register" element={<StoreRegister />} />
          <Route path="/prev-order" element={<PrevOrder />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
