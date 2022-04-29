import React, { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import PrevOrderList from "./PrevOrderList";
import DatePicker from "react-datepicker";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ko } from "date-fns/locale";
// import Modal from "./Modal";
// import "./Modal.scss";
import { IoMdArrowDropdown } from "react-icons/io";

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
  const sDateKo =
    sDate.split("-")[0] +
    "년 " +
    sDate.split("-")[1] +
    "월 " +
    sDate.split("-")[2] +
    "일 ";
  const eDateKo =
    eDate.split("-")[0] +
    "년 " +
    eDate.split("-")[1] +
    "월 " +
    eDate.split("-")[2] +
    "일 ";

  console.log("sDate : " + sDate);
  console.log("eDate : " + eDate);
  if (!sDate == eDate) {
    console.log("modal close");
  } else {
    console.log("modal open");
  }

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

  return (
    <>
      <PrevOrderWrapper>
        <Container className="text-center">
          <p className="fs-1">이전 주문</p>

          <InputDate className="inputDate" action="https://example.com">
            <div
              className="dateWrapper"
              onClick={() => {
                setShowDate(!showDate);
              }}
            >
              <div className="showDateRange btn -regular">
                {sDateKo} - {eDateKo} <IoMdArrowDropdown />
              </div>
            </div>
            {showDate && (
              <DateRangePicker className="DateRangePicker">
                <DateRange
                  ranges={[selectionRange]}
                  onChange={handleSelection}
                  rangeColors={["black"]}
                  color="black"
                  locale={ko}
                  startDatePlaceholder="Early"
                />
              </DateRangePicker>
            )}
            <div type="button" className="search_btn btn -regular">
              조회
            </div>
          </InputDate>

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

const PrevOrderWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 85%;
  top: 20%;
`;

const DateRangePicker = styled.div``;
const InputDate = styled.div`
  display: flex;
  justify-content: flex-end;

  .btn {
    display: flex;
    //overflow: hidden;

    font-family: "Do Hyeon", sans-serif;
    cursor: pointer;
    user-select: none;
    transition: all 150ms linear;
    text-align: center;
    white-space: nowrap;
    text-decoration: none !important;
    text-transform: none;
    text-transform: capitalize;
    word-spacing: 1.5px;
    color: #fff;
    border: 0 none;
    border-radius: 36px;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    justify-content: center;
    align-items: center;
    flex: 0 0 160px;

    box-shadow: 2px 5px 10px #e4e4e4;

    &:hover {
      transition: all 150ms linear;

      opacity: 0.85;
    }

    &:active {
      transition: all 150ms linear;
      opacity: 0.75;
    }

    &:focus {
      outline: 1px dotted #959595;
      outline-offset: -4px;
    }
  }
  .showDateRange {
    margin-right: 18px;
    padding: 6px 20px;
  }
  .search_btn {
    display: inline-block;
    // margin: 8px;
    padding: 8px 1px;
  }

  .btn.-regular {
    color: #202129;
    background-color: #f2f2f2;

    &:hover {
      color: #202129;
      background-color: #e1e2e2;
      opacity: 1;
    }

    &:active {
      background-color: #d5d6d6;
      opacity: 1;
    }
  }

  label {
    font-size: 12px;
  }
  .dateWrapper {
    display: flex;
    justify-content: flex-end;
    // padding: 18px;
    :hover {
      cursor: pointer;
    }
  }
  .DateRangePicker {
    position: absolute;
    z-index: 9999;

    border-radius: 8px;
  }
`;
