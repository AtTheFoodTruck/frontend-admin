import { Container, ListGroup, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const ReceiveOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
`;

const ReceiveOrder = () => {
  return (
    <ReceiveOrderWrapper>
      <Container className="text-center">
        <p className="fs-1">주문접수</p>
        <ListGroup>
          <ListGroup.Item className="d-inline-flex align-items-center">
            <Col>1</Col>
            <Col>2022-03-02 22:22</Col>
            <Col>메뉴명</Col>
            <Col>주문상태</Col>
            <Col>
              <Button>수락</Button>
            </Col>
            <Col>
              <Button>거절</Button>
            </Col>
            <Col>
              <Button>조리완료</Button>
            </Col>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item className="d-inline-flex align-items-center">
            <Col>1</Col>
            <Col>2022-03-02 22:22</Col>
            <Col>메뉴명</Col>
            <Col>주문상태</Col>
            <Col>
              <Button>수락</Button>
            </Col>
            <Col>
              <Button>거절</Button>
            </Col>
            <Col>
              <Button>조리완료</Button>
            </Col>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item className="d-inline-flex align-items-center">
            <Col>1</Col>
            <Col>2022-03-02 22:22</Col>
            <Col>메뉴명</Col>
            <Col>주문상태</Col>
            <Col>
              <Button>수락</Button>
            </Col>
            <Col>
              <Button>거절</Button>
            </Col>
            <Col>
              <Button>조리완료</Button>
            </Col>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item className="d-inline-flex align-items-center">
            <Col>1</Col>
            <Col>2022-03-02 22:22</Col>
            <Col>메뉴명</Col>
            <Col>주문상태</Col>
            <Col>
              <Button>수락</Button>
            </Col>
            <Col>
              <Button>거절</Button>
            </Col>
            <Col>
              <Button>조리완료</Button>
            </Col>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </ReceiveOrderWrapper>
  );
};

export default ReceiveOrder;
