import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavR = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 90px;

  .logout {
    cursor: pointer;
  }

  //네비게이션 메뉴바 오른쪽 정렬
`;

const HeaderNav = () => {
  let isAuthorized = localStorage.getItem('Authorization');
  console.log("isAuthorized " + isAuthorized);

  const onClickLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('userId');
    window.location.replace('/');
  };

  return (
    <NavR className="collapse navbar-collapse " id="navbarColor03">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link active" to="/receive-order">
            주문접수
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/menu-register">
            메뉴등록
          </Link>
        </li>

        {!isAuthorized ? (
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              login
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <div onClick={onClickLogout} className="nav-link logout">
              logout
            </div>
          </li>
        )}
      </ul>
    </NavR>
  );
};

// const NavR = styled.div`
//   display: flex;
//   justify-content: end;
//   margin-right: 90px;

//   //네비게이션 메뉴바 오른쪽 정렬
// `;
export default HeaderNav;
