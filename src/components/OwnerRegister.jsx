import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const MemberRegisterContainer = styled.div`
  padding-top: 250px;
  width: 25em;
  margin: auto;

  .container {
    display: grid;
    grid-template-rows: 1fr 0.2fr;
    grid-template-columns: 1fr 0.2fr;

    grid-template-areas:
      "head ."
      "email mailDuplicate"
      "password ."
      "passwordVerification ."
      "username usernameDuplicate"
      "phonenumber ."
      "bnumber ."
      "join .";
  }

  .head {
    grid-area: head;
    margin-top: 0.5em;
    text-align-last: center;
  }

  .email {
    grid-area: email;
    margin-top: 0.5em;
  }

  .mailDuplicate {
    grid-area: mailDuplicate;
  }

  .username {
    grid-area: username;
    margin-top: 0.5em;
  }

  .usernameDuplicate {
    grid-area: usernameDuplicate;
  }

  .join {
    grid-area: join;
    margin-top: 0.5em;
  }

  .phonenumber {
    grid-area: phonenumber;
    margin-top: 0.5em;
  }

  .password {
    grid-area: password;
    margin-top: 0.5em;
  }

  .passwordVerification {
    grid-area: passwordVerification;
    margin-top: 0.5em;
  }

  .btn {
    margin-top: 0.5em;
    width: 100%;
  }

  .bnumber {
    grid-area: bnumber;
    margin-top: 0.5em;
  }
`;

const OwnerRegister = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputpwVerification, setPwVerification] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPhonenumber, setInputPhonenumber] = useState("");
  const [mailDuplicate, setMailDuplicate] = useState(false);
  const [nameDuplicate, setNameDuplicate] = useState(false);

  const [isEmail, setIsEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("Email");

  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("Password");

  const [setConfirm, isSetConfirm] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState("Password Check");

  const [isName, setIsName] = useState(false);
  const [nameMessage, setNameMessage] = useState("Username");

  const [isPhone, setIsPhone] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("Phone Number");

  const [bNumber, setBNumber] = useState("");
  const [isbNumber, setIsBNumber] = useState(false);
  const [bNumberMessage, setBNumberMessage] = useState("Business Number");

  const navigate = useNavigate();

  // 메일 입력시 상태값 변경
  const handleInputEmail = (e) => {
    e.preventDefault();
    const emailCurrent = e.target.value;
    setInputEmail(emailCurrent);

    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(inputEmail)) {
      document.getElementById("input_email").style.color = "red";
      setEmailMessage("이메일 형식으로 입력 해주세요");
      setIsEmail(false);
    } else {
      document.getElementById("input_email").style.color = "green";
      setEmailMessage("Email");
      setIsEmail(true);
    }
  };

  // 메일 인풋창 클릭시 중복체크 해제 후 입력가능하게 함
  const handleInputEmailClick = (e) => {
    e.preventDefault();
    setMailDuplicate(false);
    document.getElementById("input_email").readOnly = false;
  };

  // 비밀번호 입력시 상태값 변경
  const handleInputPw = (e) => {
    e.preventDefault();
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,1000}$/;

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상");
      document.getElementById("input_pw").style.color = "red";
      setIsPassword(false);
    } else {
      setPasswordMessage("Password");
      document.getElementById("input_pw").style.color = "green";
      setIsPassword(true);
    }

    if (setConfirm && passwordCurrent !== inputpwVerification) {
      setPasswordConfirmMessage("비밀번호가 서로 맞지 않습니다.");
      document.getElementById("input_pwVerification").style.color = "red";
      setIsPassword(false);
    } else {
      setPasswordConfirmMessage("Password Check");
      document.getElementById("input_pwVerification").style.color = "green";
      setIsPassword(true);
    }
  };

  // 확인 비밀번호 입력시 상태값 변경
  const onChangePasswordConfirm = (e) => {
    e.preventDefault();
    const passwordConfirmCurrent = e.target.value;
    setPwVerification(passwordConfirmCurrent);
    isSetConfirm(true);

    if (passwordConfirmCurrent === inputPw) {
      setPasswordConfirmMessage("Password Check");
      document.getElementById("input_pwVerification").style.color = "green";
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 서로 맞지 않습니다.");
      document.getElementById("input_pwVerification").style.color = "red";
      setIsPasswordConfirm(false);
    }
  };

  // 이름 입력시 상태값 변경
  const handleInputUsername = (e) => {
    e.preventDefault();
    setInputUsername(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setNameMessage("2글자 이상 20글자 미만으로 입력해주세요.");
      setIsName(false);
      document.getElementById("input_username").style.color = "red";
    } else {
      setNameMessage("Username");
      setIsName(true);
      document.getElementById("input_username").style.color = "green";
    }
  };

  // 유저이름 인풋창 클릭시 중복체크 해제 후 입력가능하게 함
  const handleInputUsernameClick = (e) => {
    e.preventDefault();
    setNameDuplicate(false);
    document.getElementById("input_username").readOnly = false;
  };

  // 휴대 전화 번호 입력시 상태값 변경
  const handleInputPhonenumber = (e) => {
    e.preventDefault();
    setInputPhonenumber(e.target.value);

    const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!regPhone.test(e.target.value)) {
      setPhoneMessage("형식을지켜주세요 (ex. 01x-xxxx-xxx)");
      setIsPhone(false);
      document.getElementById("input_phonenumber").style.color = "red";
    } else {
      setPhoneMessage("Phone Number");
      setIsPhone(true);
      document.getElementById("input_phonenumber").style.color = "green";
    }
  };

  // 사업자 번호 입력시 상태값 변경
  const handleInputBnumber = (e) => {
    e.preventDefault();
    setBNumber(e.target.value);

    if (e.target.value.length === 10) {
      setBNumberMessage("Business Number");
      setIsBNumber(true);
      document.getElementById("input_bnumber").style.color = "green";
    } else {
      setBNumberMessage("사업자 번호 10자리");
      setIsBNumber(false);
      document.getElementById("input_bnumber").style.color = "red";
    }
  };

  // 메일 중복 확인
  async function mailDuplicateCheck(e) {
    e.preventDefault();

    if (inputEmail === "") {
      alert("이메일을 입력하세요");
    } else if (!isEmail) {
      alert("메일 형식을 지켜주세요");
    } else {
      axios
        .post(
          "https://apifood.blacksloop.com/user-service/users/v1/validation/email",
          {
            email: inputEmail,
          }
        )
        .then(function (response) {
          if (response.data.result === "fail") {
            alert(response.data.message);
            console.log(response);
            document.getElementById("input_email").value = null;
            setMailDuplicate(false);
          } else {
            document.getElementById("input_email").readOnly = true;
            alert("사용가능합니다!");
            setMailDuplicate(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 이름 중복 확인
  async function usernameDuplicateCheck(e) {
    e.preventDefault();
    if (inputUsername === "") {
      alert("이름을 입력하세요");
    } else if (!isName) {
      alert("형식을 지켜주세요");
    } else {
      axios
        .post(
          "https://apifood.blacksloop.com/user-service/users/v1/validation/name",
          {
            username: inputUsername,
          }
        )
        .then(function (response) {
          if (response.data.result === "fail") {
            alert(response.data.message);
            document.getElementById("input_username").value = null;
            setNameDuplicate(false);
          } else {
            document.getElementById("input_username").readOnly = true;
            alert("사용가능합니다!");
            setNameDuplicate(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 회원 가입
  async function onClickJoin(e) {
    e.preventDefault();
    if (inputEmail === "") {
      alert("아이디를 입력하세요");
    } else if (inputPw === "") {
      alert("비밀번호를 입력하세요");
    } else if (mailDuplicate === false) {
      alert("메일 중복확인을 해주세요");
    } else if (inputPw !== inputpwVerification) {
      alert("입력하신 비밀번호가 동일하지 않습니다.");
    } else if (nameDuplicate === false) {
      alert("이름 중복확인을 해주세요");
    } else if (inputPhonenumber === "") {
      alert("전화번호를 입력해주세요");
    } else if (isPhone === false) {
      alert("전화번호 형식을 맞춰주세요");
    } else if (
      !(
        isEmail &&
        isPassword &&
        isPasswordConfirm &&
        isName &&
        isPhone &&
        isbNumber
      )
    ) {
      alert("양삭애 맞게 다시 기입해주세요");
    } else {
      axios
        .post("https://apifood.blacksloop.com/user-service/users/v1/join", {
          email: inputEmail,
          username: inputUsername,
          password: inputPw,
          phone_num: inputPhonenumber,
        })
        .then(function (response) {
          if (response.data.result === "fail") {
            alert(response.data.error[0].message);
          } else {
            alert("가입 성공");
            navigate("/login", { replace: true });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <MemberRegisterContainer>
      <form className="container">
        <div className="head">
          <h1>Sign up</h1>
        </div>

        <div className="email">
          <div className="form-floating">
            <input
              type="text"
              name="input_email"
              value={inputEmail}
              className="form-control"
              id="input_email"
              placeholder="아이디를 입력하세요."
              onChange={handleInputEmail}
              onClick={handleInputEmailClick}
            />
            <label for="floatingInput">{emailMessage}</label>
          </div>
        </div>

        <div className="mailDuplicate">
          <button
            type="submit"
            className=" btn btn-lg btn-outline-secondary"
            onClick={mailDuplicateCheck}
          >
            check
          </button>
        </div>

        <div className="password">
          <div className="form-floating">
            <input
              type="password"
              name="input_pw"
              value={inputPw}
              className="form-control"
              id="input_pw"
              placeholder="비밀번호를 입력하세요."
              onChange={handleInputPw}
            />
            <label for="floatingPassword">{passwordMessage}</label>
          </div>
        </div>

        <div className="passwordVerification">
          <div className="form-floating">
            <input
              type="password"
              name="input_pwVerification"
              value={inputpwVerification}
              className="form-control"
              id="input_pwVerification"
              placeholder="비밀번호 확인 입력하세요."
              onChange={onChangePasswordConfirm}
            />
            <label for="floatingPassword">{passwordConfirmMessage}</label>
          </div>
        </div>

        <div className="username">
          <div className="form-floating">
            <input
              type="text"
              name="input_username"
              value={inputUsername}
              className="form-control"
              id="input_username"
              placeholder="이름을 입력하세요."
              onChange={handleInputUsername}
              onClick={handleInputUsernameClick}
            />
            <label for="floatingPassword">{nameMessage}</label>
          </div>
        </div>

        <div className="usernameDuplicate">
          <button
            type="submit"
            className=" btn btn-lg btn-outline-secondary"
            onClick={usernameDuplicateCheck}
          >
            check
          </button>
        </div>

        <div className="phonenumber">
          <div className="form-floating">
            <input
              type="text"
              name="input_phonenumber"
              value={inputPhonenumber}
              className="form-control"
              id="input_phonenumber"
              placeholder="휴대전화 번호를 입력하세요."
              onChange={handleInputPhonenumber}
            />
            <label for="floatingPassword">{phoneMessage}</label>
          </div>
        </div>

        <div className="bnumber">
          <div className="form-floating">
            <input
              type="text"
              name="input_bnumber"
              value={bNumber}
              className="form-control"
              id="input_bnumber"
              placeholder="사업자 번호를 입력하세요."
              onChange={handleInputBnumber}
            />
            <label for="floatingPassword">{bNumberMessage}</label>
          </div>
        </div>

        <div className="join">
          <button
            type="submit"
            className=" btn btn-lg btn-outline-secondary"
            onClick={onClickJoin}
          >
            Join
          </button>
        </div>
      </form>
    </MemberRegisterContainer>
  );
};

export default OwnerRegister;
