// import { Button, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const InputContainer = styled.form`
  padding-top: 250px;
  width: 20em;
  margin: auto;
  text-align-last: center;

  .email {
    text-align-last: left;
  }
  .password {
    margin-top: 0.5em;
    text-align-last: left;
  }
  .btn {
    margin-top: 0.5em;
    width: 100%;
  }
`;

const AdminLogin = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  let [accessToken, setAccessToken] = useState("");
  let [refreshToken, setRefreshToken] = useState("");
  let [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const [mailMessage, setMailMessage] = useState("Email");
  const [passwordMessage, setPasswordMessage] = useState("Password");

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
    console.log(e.target.value);
  };

  const handleInputId = (e) => {
    setInputId(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("Authorization", accessToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("refreshToken", refreshToken);
  }, [accessToken, userId, refreshToken]);

  async function onClickLogin(e) {
    e.preventDefault();

    if (inputId === "") {
      alert("아이디를 입력하세요");
    } else if (inputPw === "") {
      alert("비밀번호를 입력하세요");
    } else {
      axios
        // .post('https://apifood.blacksloop.com/user-service/users/v1/logins', {
        .post("http://localhost:8000/user-service/users/v1/logins", {
          email: inputId,
          password: inputPw,
        })
        .then(function (response) {
          console.log(response);

          if (response.data.result === "success") {
            setAccessToken(response.data.data.accessToken);
            setRefreshToken(response.data.data.refreshToken);
            setUserId(response.data.data.userId);
            navigate("/", { replace: true });
            document.location.reload();
            console.log(response);
          } else if (response.data.message === "Bad credentials") {
            setMailMessage("로그인 실패");
            setPasswordMessage("Password");
            document.getElementById("input_id_label").style.color = "red";
            document.getElementById("input_pw").value = null;
          } else {
            setMailMessage("계정이 존재하지 않습니다.");
            setPasswordMessage("Password");
            document.getElementById("input_id_label").style.color = "red";
            document.getElementById("input_pw").value = null;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <InputContainer>
      <h1>Admin Login</h1>

      <div className="email">
        <div className="form-floating">
          <input
            type="text"
            name="input_id"
            value={inputId}
            className="form-control"
            id="input_id"
            placeholder="아이디를 입력하세요."
            onChange={handleInputId}
          />
          <label id="input_id_label" for="floatingInput">
            {mailMessage}
          </label>
        </div>
      </div>

      <div className="password">
        <div className="form-floating">
          <input
            type="password"
            name="input_pw"
            value={inputPw}
            className="form-control mt-3"
            id="input_pw"
            placeholder="비밀번호를 입력하세요."
            onChange={handleInputPw}
          />
          <label for="floatingPassword">{passwordMessage}</label>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-lg btn-outline-secondary"
        onClick={onClickLogin}
      >
        Login
      </button>
    </InputContainer>
  );
};

const LoginWrapper = styled.div`
  position: absolute;
  align-items: center;
  width: 20%;
  top: 35%;
  left: 43%;
  border: 1px white solid;
  h1 {
    font-size: 70px;
    margin-left: 12%;
  }

  button {
    width: 20%;
    margin-left: 40%;
    margin-top: 25px;
    font-weight: bold;
    font-size: 0.95rem;
  }
`;

export default AdminLogin;
