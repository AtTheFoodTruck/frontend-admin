import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import PrevOrderList from "./PrevOrderList";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import Modal from "./Modal";
// import "./Modal.scss";

const PrevOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
`;

const InputDate = styled.div`
  label {
    font-size: 12px;
  }
  .startDate {
    padding: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;
const PrevOrder = () => {
  const url = `http://localhost:8000/order-service/orders/v1/owner/order?page=0&size=15`;

  const authorization = localStorage.getItem("Authorization");
  const [prevOrderList, setPrevOrderList] = useState([]);

  const [state, setState] = useState({
    userId: 0,
    startData: "",
    endData: "",
  });

  const headers = {
    Authorization: `Bearer ${authorization}`,
  };
  const getPrevOrderList = async () => {
    // console.log("state : " + state);
    await axios
      .post(
        url,
        {
          user_id: state.userId,
          start_data: state.startData,
          end_data: state.endData,
        },
        { headers }
      )
      .then((response) => {
        setPrevOrderList(response);
        console.log(response);
        console.log("조회 성공");
      })
      .catch((err) => console.log(err.response));
  };

  //    setState({
  //      ...state,
  //      user_id: userId,
  //      start_data: startData,
  //      end_data: endData,
  //    });

  //datePicker

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelection = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  // 날짜 함수
  function leftPad(value) {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  }

  // 날짜 함수
  function toStringByFormatting(source, delimiter = "-") {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());
    return [year, month, day].join(delimiter);
  }

  // 최초 페이지 렌더링
  useEffect(() => {}, []);

  const sDate = toStringByFormatting(startDate);
  const eDate = toStringByFormatting(endDate); // ex)2021-04-24
  console.log("sDate : " + sDate);
  console.log("eDate : " + eDate);

  //etc
  //상세보기    detail
  const storeList = [
    {
      id: 1,
      store_name: "aa분식",
      category: "분식",
      item: "떡볶이",
      store_img: "https://dummyimage.com/600x400/000/0011ff.jpg&text=test",
      rating: 3,
    },
  ];
  console.log("startDate : " + startDate);
  console.log("endDate : " + endDate);
  return (
    <>
      <PrevOrderWrapper>
        <Container className="text-center">
          <p className="fs-1">이전 주문</p>

          <InputDate className="inputDate" action="https://example.com">
            <label>시작일 - 종료일</label>
            <div className="startDate" onClick={() => setShowDate(!showDate)}>
              {/* 삼항연산자로  */}
              2022-12-22 - 2022-12-22
            </div>
          </InputDate>
          {showDate && (
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelection}
              onBlur
            />
          )}

          <Row className="mt-5">
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문번호</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문상태</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문시간</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">주문상품</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">결제금액</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">닉네임</p>
            </Col>
            <Col className="d-flex justify-content-center p-0">
              <p className="fs-5">상세보기</p>
            </Col>
          </Row>
          <ListGroup>
            {storeList.map((item) => {
              return (
                <PrevOrderList
                  key={item.itemId}
                  item={item}
                  // handlePlusModal={handlePlusModal}
                  // handleMinusModal={handleMinusModal}
                  // deleteMenu={deleteMenu}
                />
              );
            })}
          </ListGroup>
        </Container>
        {/* {openPlusModal && <Modal handleModal={handlePlusModal} />}
      {openMinusModal && <Modal handleModal={handleMinusModal} />} */}
      </PrevOrderWrapper>
    </>
  );
};

export default PrevOrder;
