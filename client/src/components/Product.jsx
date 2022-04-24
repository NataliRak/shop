import { Link } from "react-router-dom";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;


const Price = styled.h2`
  color: teal;
  position: absolute;
  bottom: 1px;
  left: 20px;
  font-size: 30px;
`;
const Name = styled.h2`
  color: teal;
  position: absolute;
  top: 5px;
  font-size: 18px;
  text-align: center;
`;
const Button = styled.button`
  background-color: darkcyan;
  color: white;
  opacity: 0.7;
  padding: 7px;
  cursor: pointer;
  font-weight: 500;
  border-radius: 15px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    color: black;
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Name>{item.title}</Name>
        <Price>{item.price + "$"}</Price>
        <Link to={`/product/${item._id}`}>
          <Button> BUY NOW</Button>
        </Link> 
      </Info>
    </Container>
  );
};

export default Product;
