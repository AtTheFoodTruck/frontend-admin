import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DashBoardWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 100%;
  top: 25%;
`;

const DashBoard = () => {
  return (
    <DashBoardWrapper>
      <Container className="text-center">
        <h1>ADMIN</h1>
        <Row className="d-flex justify-content-center mt-5">
          <Col>
            <Link to="/receive-order">
              <Button style={{ width: '18rem' }}>
                <p className="fs-1">주문접수</p>
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="/menu-register">
              <Button style={{ width: '18rem' }}>
                <p className="fs-1">메뉴등록</p>
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </DashBoardWrapper>
  );
};

export default DashBoard;
