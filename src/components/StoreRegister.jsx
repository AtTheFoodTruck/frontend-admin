import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const MemberRegisterContainer = styled.div`
  position: absolute;
  align-items: center;
  top: 15%;
  left: 46%;
  width: 25em;
  margin: auto;

  .container {
    display: grid;
    grid-template-rows: 1fr 0.2fr;
    grid-template-columns: 1fr 0.2fr;

    grid-template-areas:
      "head ."
      "store storeDuplicate"
      "phonenumber ."
      "address ."
      "notice ."
      "openTime ."
      "radiobutton radiobutton2"
      "logo ."
      "join .";
  }

  .head {
    grid-area: head;
    margin-top: 0.5em;
    text-align-last: center;
  }
  .store {
    grid-area: store;
    margin-top: 0.5em;
  }
  .storeDuplicate {
    grid-area: storeDuplicate;
  }
  .phonenumber {
    grid-area: phonenumber;
    margin-top: 0.5em;
  }
  .address {
    grid-area: address;
    margin-top: 0.5em;
  }
  .notice {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-area: notice;
    margin-top: 0.5em;
  }
  .textarea {
    height: 200px;
    resize: none;
  }
  .openTime {
    grid-area: openTime;
    margin-top: 0.5em;
  }
  .radiobutton {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-area: radiobutton;
    margin-top: 0.5em;
  }
  .logo {
    grid-area: logo;
    margin-top: 0.5em;
  }

  .join {
    grid-area: join;
    margin-top: 0.5em;
  }

  .btn {
    margin-top: 0.5em;
    width: 100%;
  }
`;

const StoreRegister = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPhonenumber, setInputPhonenumber] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [StoreName, setStoreName] = useState("StoreName");
  const [isPhone, setIsPhone] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("Phone Number");
  const [address, setAddress] = useState("Address");
  const [Notice, setNotice] = useState("notice");
  const [openTime, setopenTime] = useState("openTime");
  const navigate = useNavigate();

  // 메일 입력시 상태값 변경

  //TODO 회원 가입
  async function onClickJoin(e) {
    e.preventDefault();
    if (inputEmail === "") {
      alert("상점 이름을 입력해주세요");
    } else if ("비어있음" === "") {
      alert("핸드폰 번호 입력해주세요");
    } else if (inputPhonenumber === "") {
      alert("주소를 입력해주세요");
    } else if (isPhone === false) {
      alert("공지사항을 입력해주세요");
    } else if (!(isEmail && isPhone)) {
      alert("양삭애 맞게 다시 기입해주세요");
    } else {
      axios
        .post("https://apifood.blacksloop.com/user-service/users/v1/join", {
          email: inputEmail,
          username: inputUsername,
          phone_num: inputPhonenumber,
        })
        .then(function (response) {
          if (response.data.result === "fail") {
            alert(response.data.message);
          } else {
            alert("메뉴 등록 성공");
            navigate("/", { replace: true });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  //카테고리
  const [cate, setCate] = useState();
  const handlecate = (e) => {
    console.log(`선택한 radio 값 : ${e.target.value}`);

    setCate(e.target.value);
  };
  const category = [
    { id: 1, name: "치킨" },
    { id: 2, name: "피자" },
    { id: 3, name: "햄버거" },
    { id: 4, name: "스테이크" },
    { id: 5, name: "닭강정" },
    { id: 6, name: "핫도그" },
    { id: 7, name: "아이스크림" },
  ];
  return (
    <MemberRegisterContainer>
      <form className="container">
        <div className="head">
          <h1>Store Register</h1>
        </div>
        <div className="store">
          <div className="form-floating">
            <input
              type="text"
              name="store"
              //   value={inputEmail}
              className="form-control"
              id="storelabel"
              placeholder="상점 이름을 입력하세요."
            />
            <label htmlFor="storelabel">{StoreName}</label>
          </div>
        </div>
        <div className="storeDuplicate">
          <button type="submit" className=" btn btn-lg btn-outline-secondary">
            check
          </button>
        </div>
        <div className="phonenumber">
          <div className="form-floating">
            <input
              type="text"
              name="phone"
              className="form-control"
              id="phonelabel"
              placeholder="휴대전화 번호를 입력하세요."
            />
            <label htmlFor="phonelabel">{phoneMessage}</label>
          </div>
        </div>
        {/* 주소*/}
        <div className="address">
          <div className="form-floating">
            <input
              type="text"
              name="address"
              className="form-control"
              id="addresslabel"
              placeholder="주소를 입력하세요."
            />
            <label htmlFor="addresslabel">{address}</label>
          </div>
        </div>
        {/* notice */}
        <div className="notice form-group">
          <div className="form-floating">
            <textarea
              name="notice"
              className="form-control textarea"
              id="noticelabel"
              placeholder="공지사항을 입력하세요."
            />
            <label className="form-label" htmlFor="noticelabel">
              {Notice}
            </label>
          </div>
        </div>
        {/*TODO 달력변경 오픈 시간 */}
        <div className="openTime">
          <div className="form-floating">
            <input
              type="text"
              name="calendar"
              className="form-control"
              id="calendarlabel"
              placeholder="오픈 시간을 입력하세요."
            />
            <label htmlFor="calendarlabel">{openTime}</label>
          </div>
        </div>
        {/* 라디오 버튼 시작 */}
        <div className="radiobutton radio form-group">
          {category.map((item) => (
            <div key={item.id} className="form-check">
              <label className="form-check-label" htmlfor={item.name}>
                {item.name}
              </label>
              <input
                className="form-check-input"
                type="radio"
                name={item.name}
                id={item.name}
                value={item.name}
                checked={cate === item.name}
                onChange={handlecate}
              />
            </div>
          ))}
        </div>

        {/*TODO AWS이미지 업데이트 변경  Logo */}
        <div className="form-group logo">
          <label htmlfor="formFile" className="form-label mt-2 mb-3 ">
            Logo
          </label>
          <input className="form-control" type="file" id="formFile" />
        </div>
        {/* store push 버튼 */}
        <div className="join">
          <button
            type="submit"
            className=" btn btn-lg btn-outline-secondary"
            onClick={onClickJoin}
          >
            Store Push
          </button>
        </div>
      </form>
    </MemberRegisterContainer>
  );
};

export default StoreRegister;
