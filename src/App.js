import 'bootswatch/dist/sketchy/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MenuRegister from './components/MenuRegister';
import ReceiveOrder from './components/ReceiveOrder';
import AdminLogin from './components/AdminLogin';
import Layout from './components/Layout';
import DashBoard from './components/DashBoard';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/menu-register" element={<MenuRegister />} />
        <Route path="/receive-order" element={<ReceiveOrder />} />
      </Route>
    </Routes>
  );
}

export default App;
