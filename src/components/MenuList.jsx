import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import MenuListEL from "./MenuListEL";
import Modal from "./Modal";
const MenuList = () => {
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };
  const [menulist, setMenuList] = useState([]);

  //
  //
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

  //modal
  const [openPlusModal, setOpenPlusModal] = useState(false);
  const [openMinusModal, setOpenMinusModal] = useState(false);
  //handleModal
  const handlePlusModal = () => {
    if (!openPlusModal) {
      //Modal On
      console.log("openPlusModal");
    }
    setOpenPlusModal(!openPlusModal);
  };
  const handleMinusModal = () => {
    if (!openMinusModal) {
      //Modal On
      console.log("openMinusModal");
    }
    setOpenMinusModal(!openMinusModal);
  };

  return (
    <ReceiveOrderWrapper>
      <Container className="text-center">
        <p className="fs-1">메뉴목록</p>
        <ListGroup>
          <ListGroup.Item className="d-inline-flex align-items-center">
            <Col>메뉴번호</Col>
            <Col>이름</Col>
            {/* <Col>설명</Col> */}
            <Col>가격</Col>
            <Col>등록</Col>
            <Col>수정</Col>
            <Col>삭제</Col>
            {/* <Col>itemImg</Col> */}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {menulist.map((item) => {
            return (
              <MenuListEL
                key={item.itemId}
                item={item}
                handlePlusModal={handlePlusModal}
                handleMinusModal={handleMinusModal}
              />
            );
          })}
        </ListGroup>
      </Container>
      {openPlusModal && <Modal handleModal={handlePlusModal} />}
      {openMinusModal && <Modal handleModal={handleMinusModal} />}
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
