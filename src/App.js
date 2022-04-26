import { Container } from "react-bootstrap";
import "bootswatch/dist/sketchy/bootstrap.css";

import "./App.css";
import OrderHistory from "./components/OrderHistory";
import MenuRegister from "./components/DashBoard/MenuRegister/MenuRegister";
import Ex from "./components/DashBoard/MenuRegister/Ex";

function App() {
  return (
    <Container>
      <MenuRegister />
      {/* <OrderHistory /> */}
      <Ex />
    </Container>
  );
}

export default App;
