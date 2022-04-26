import 'bootswatch/dist/sketchy/bootstrap.css';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MenuRegister from './components/MenuRegister';
import ReceiveOrder from './components/ReceiveOrder';
import AdminLogin from './components/AdminLogin';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/menu-register" element={<MenuRegister />} />
      <Route path="/receive-order" element={<ReceiveOrder />} />
    </Routes>
    // <Container>
    //   <MenuRegister />
    //   <ReceiveOrder />
    // </Container>
  );
}

export default App;
