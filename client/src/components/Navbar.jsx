import { Badge } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import logo from "../assets/rak2.png";
import { useSelector } from "react-redux";
import AuthModal from "../pages/Log/AuthModal";
import { CryptoState } from "../CryptoContex";
import UserSidebar from "../pages/Log/UserSidebar";

const Container = styled.div`
  height: 60px;
  text-decoration: none;
  background-color: #f5fafd;
  z-index: 1;
  ${mobile({
    width: "100%",
    height: "70px",
    backgroundColor: "#f5fafd",
    position: "fixed",
    zIndex: "10",
    opacity: "0.95",
    top: "20px",
    padding: "0px 5px",
  })}
`;

const Wrapper = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  text-decoration: none;

  ${mobile({ display: "none" })}
`;

const Center = styled.div`
  flex: 1;

  text-align: center;
  align-items: center;
`;

const Logo = styled.div`
  height: 100%;

  ${mobile({
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
  ${mobile({ flex: 1, justifyContent: "flex-end", marginRight: "10px" })};
`;

const MenuItem = styled.div`
  color: black;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
  text-decoration: none;

  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const { user } = CryptoState();
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link style={{ textDecoration: "none" }} to="/">
            <MenuItem>HOME</MenuItem>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/products/women">
            <MenuItem>PRODUCTS</MenuItem>
          </Link>
        </Left>
        <Center>
          <Link to="/">
            <Logo>
              <img style={{ height: "60px" }} src={logo} alt="logo" />
            </Logo>
          </Link>
        </Center>
        <Right>
          {user ? <UserSidebar /> : <AuthModal />}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
