import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderNav from './HeaderNav';

const NavH = styled.nav`
  display: flex;
  margin-left: 15px;
  margin-top: 0px;
  width: 99%;
  height: 90px;
  font-size: 25px;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1000;
`;
const StyledLink = styled(Link)`
  font-size: 30px;
`;
const Header = () => {
  return (
    <>
      <NavH className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid ">
          <StyledLink className="navbar-brand h4" to="/">
            Foodtruck Around Me
          </StyledLink>

          <HeaderNav />
        </div>
      </NavH>
    </>
  );
};

export default Header;
