import { Container } from 'react-bootstrap';
import 'bootswatch/dist/sketchy/bootstrap.css';

import './App.css';
import MenuRegister from './components/MenuRegister';
import OrderHistory from './components/OrderHistory';

function App() {
  return (
    <Container>
      <MenuRegister />
      {/* <OrderHistory /> */}
    </Container>
  );
}

export default App;
