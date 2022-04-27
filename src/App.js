import "bootswatch/dist/sketchy/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLogin from "./components/AdminLogin";
import DashBoard from "./components/DashBoard";
import Layout from "./components/Layout";
import MenuList from "./components/MenuList";
import MenuRegister from "./components/MenuRegister";
import ReceiveOrder from "./components/ReceiveOrder";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/menu-register" element={<MenuRegister />} />
        <Route path="/receive-order" element={<ReceiveOrder />} />
        <Route path="/menu-list" element={<MenuList />} />
      </Route>
    </Routes>
  );
}

export default App;
