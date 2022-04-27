import { Container, Col, Row, Button, Form } from 'react-bootstrap';
import React from 'react';
import styled from 'styled-components';

const MenuRegisterWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 100%;
  top: 20%;
`;

const MenuRegister = () => {
  return (
    <MenuRegisterWrapper>
      <Container className="text-center">
        <p className="fs-1">메뉴관리</p>

        <Row className="d-flex align-items-center">
          <Col>
            <div class="form-group ">
              <label for="formFile" class="form-label mt-4">
                사진
              </label>
              <input class="form-control" type="file" id="formFile" />
            </div>
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5">메뉴명</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5">가격</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </Col>
          <Col>
            <Form.Label htmlFor="inputPassword5">설명</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
          </Col>
          <Col>
            <Button>등록</Button>
          </Col>
        </Row>
      </Container>
    </MenuRegisterWrapper>
  );
};

export default MenuRegister;
