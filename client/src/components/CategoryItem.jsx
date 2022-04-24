import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "60vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  margin-top: 30px;
  opacity: 0.8;
  background: linear-gradient(
    90deg,
    rgba(142, 135, 255, 1) 0%,
    rgba(31, 177, 160, 1) 33%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const Button = styled.button`
  margin-top: 30px;
  font-size: 16px;
  border: none;
  border-radius: 15px;
  opacity: 0.9;
  width: 120px;
  padding: 10px;
  background-color: teal;

  color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: darkcyan;
    color: black;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
