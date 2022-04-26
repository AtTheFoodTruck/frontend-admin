import MenuRegister from './MenuRegister';
import ReceiveOrder from './ReceiveOrder';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const AdminLogin = () => {
  return (
    <Container>
      <div>로그인페이지</div>

      <Link to="/menu-register">
        <Button>메뉴 등록</Button>
      </Link>
      <Link to="/receive-order">
        <Button>주문접수</Button>
      </Link>
    </Container>
  );
};

export default AdminLogin;
