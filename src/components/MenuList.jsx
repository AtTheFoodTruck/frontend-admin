import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import MenuListEL from "./MenuListEL";

const MenuList = () => {
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };
  const [menulist, setMenuList] = useState([]);

  async function getMenuList() {
    const foodtruck = await axios
      .get(
        `http://localhost:8000/item-service/items/v1/owner/item/${userId}?page=0&size=5`,
        { headers }
      )
      .then((res) => {
        console.log("최초 렌더링 api 호출");
        setMenuList(res.data.data.itemsDto);
        console.log(res.data.data.itemsDto);
      })
      .catch((err) => console.log(err));
  }

  // 최초 페이지 렌더링
  useEffect(() => {
    getMenuList();
  }, []);

  return (
    <ReceiveOrderWrapper>
      <Container className="text-center">
        <p className="fs-1">메뉴목록</p>
        <ListGroup>
          <ListGroup.Item className="d-inline-flex align-items-center">
            <Col>itemId</Col>
            <Col>itemName</Col>
            <Col>description</Col>
            <Col>price</Col>
            <Col>itemImg</Col>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {menulist.map((item) => {
            return <MenuListEL key={item.itemId} item={item} />;
          })}
        </ListGroup>
      </Container>
    </ReceiveOrderWrapper>
  );
};

const ReceiveOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 100%;
  top: 20%;
`;

export default MenuList;
