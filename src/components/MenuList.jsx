import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import MenuListEL from "./MenuListEL";
import Modal from "./Modal";
import "./Modal.scss";
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const ReceiveOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
`;

const MenuList = () => {
  const authorization = localStorage.getItem("Authorization");
  const userId = localStorage.getItem("userId");
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };
  const [menulist, setMenuList] = useState([]);
// const arrayLength = 0;
const [arrayLength, setArrayLength] = useState(0);
  
  // 메뉴 조회 api
  async function getMenuList() {
    const foodtruck = await axios
      .get(
        // `https://apifood.blacksloop.com/item-service/items/v1/owner/item/${userId}?page=0&size=10`,
        `http://localhost:8000/item-service/items/v1/owner/item/${userId}?page=0&size=10`,
        { headers }
      )
      .then((res) => {
        console.log(res);
        console.log("최초 렌더링 api 호출");
        setMenuList(res.data.data.itemsDto);
      })
      .catch((err) => console.log(err));
  }

  // 메뉴 삭제 api
  async function deleteMenu(itemId) {
    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      const data = {
        user_id: userId,
        item_id: itemId,
      };
      await axios
        // .delete(`https://apifood.blacksloop.com/item-service/items/v1/owner/item`, {
            .delete(`http://localhost:8000/item-service/items/v1/owner/item`, {
            headers,
            data,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.result === "success") {
            alert(res.data.message);
            document.location.reload();
          }
        })
        .catch((err) => console.log(err));
    }
  }

  // 최초 페이지 렌더링
  useEffect(() => {
    getMenuList();
    setArrayLength(menulist.length)
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
        <p className="fs-1">메뉴목록 <AiFillPlusCircle type="button" onClick={handlePlusModal} /> </p>
        <Row className="mt-5">
          <Col className="d-flex justify-content-center p-0">
            <p className="fs-5">메뉴번호</p>
          </Col>
          <Col className="d-flex justify-content-center p-0">
            <p className="fs-5">이름</p>
          </Col>
          <Col className="d-flex justify-content-center p-0">
            <p className="fs-5">가격</p>
          </Col>
          <Col className="d-flex justify-content-center p-0">
            <p className="fs-5">수정</p>
          </Col>
          <Col className="d-flex justify-content-center p-0">
            <p className="fs-5">삭제</p>
          </Col>
          {/* <Col>설명</Col> */}
          {/* <Col>itemImg</Col> */}
        </Row>
        <ListGroup>
          {menulist.map((item) => {
              return (
                <MenuListEL
                  key={item.itemId}
                  item={item}
                  // handlePlusModal={handlePlusModal}
                  handleMinusModal={handleMinusModal}
                  deleteMenu={deleteMenu}
                />
              );
            })}
          {/* { arrayLength > 0 ? (
            menulist.map((item) => {
              return (
                <MenuListEL
                  key={item.itemId}
                  item={item}
                  // handlePlusModal={handlePlusModal}
                  handleMinusModal={handleMinusModal}
                  deleteMenu={deleteMenu}
                />
              );
            })) : (
                <ListGroup.Item className="d-inline-flex align-items-center">
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col>
                  <AiFillEdit />
                </Col>
                <Col>
                  <TiDelete />
                </Col>
              </ListGroup.Item>
            )
          } */}
        </ListGroup>
      </Container>
      {/* {openPlusModal && <Modal_copy handleModal={handlePlusModal} />}
      {openMinusModal && <Modal_copy handleModal={handleMinusModal} />} */}
      {openPlusModal && <Modal handleModal={handlePlusModal} />}
      {openMinusModal && <Modal handleModal={handleMinusModal} />}
    </ReceiveOrderWrapper>
  );
};

export default MenuList;
