import React, { useEffect, useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';
import MenuListEL from './MenuListEL';

const ReceiveOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
`;

// 메뉴 조회 api
const MenuList = () => {
  const authorization = localStorage.getItem('Authorization');
  const userId = localStorage.getItem('userId');
  const headers = {
    Authorization: `Bearer ${authorization}`,
  };
  const [menulist, setMenuList] = useState([]);

  async function getMenuList() {
    const foodtruck = await axios
      .get(
        `http://localhost:8000/item-service/items/v1/owner/item/${userId}?page=0&size=10`,
        { headers }
      )
      .then((res) => {
        console.log('최초 렌더링 api 호출');
        setMenuList(res.data.data.itemsDto);
        console.log(res.data.data.itemsDto);
      })
      .catch((err) => console.log(err));
  }

  // 메뉴 삭제 api
  async function deleteMenu(itemId) {
    if (window.confirm('메뉴를 삭제하시겠습니까?')) {
      const data = {
        user_id: userId,
        item_id: itemId,
      };
      await axios
        .delete(`http://localhost:8000/item-service/items/v1/owner/item`, {
          headers,
          data,
        })
        .then((res) => {
          console.log(res);
          if (res.data.result === 'success') {
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
  }, []);

  return (
    <ReceiveOrderWrapper>
      <Container className="text-center">
        <p className="fs-1">메뉴목록</p>
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
            <p className="fs-5">등록</p>
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
                deleteMenu={deleteMenu}
              />
            );
          })}
        </ListGroup>
      </Container>
    </ReceiveOrderWrapper>
  );
};

export default MenuList;
