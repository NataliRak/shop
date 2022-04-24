import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${mobile({ position: "absolute", top: "20px" })}
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column", top: "20px" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;

  ${mobile({ height: "60vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  ${mobile({ textAlign: "center" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({ textAlign: "center" })}
`;

const Price = styled.span`
  font-weight: 500;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 60%;
  margin: 30px 0px 40px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "90%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.select`
  margin-left: 10px;
  padding: 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  cursor: pointer;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
  ${mobile({ flexDirection: "column" })}
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;

  background-color: black;
  color: white;
  padding: 15px;
  border: 1px solid black;
  cursor: pointer;
  font-weight: 500;
  border-radius: 15px;
  ${mobile({ fontSize: "12px" })}

  &:hover {
    color: teal;
    border: 1px solid teal;
  }
`;
const ButtonAdd = styled.button`
  border: 1px solid black;
  background-color: darkcyan;
  color: white;
  padding: 15px;

  cursor: pointer;
  font-weight: 500;
  border-radius: 15px;
  ${mobile({ fontSize: "12px" })}

  &:hover {
    background-color: teal;
    color: black;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [color, setColor] = useState("white");
  const [size, setSize] = useState("36");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/find/" + id
        );
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  //Quantity

  const handleQuantity = type => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>

              <FilterColor onChange={e => setColor(e.target.value)}>
                {product.color?.map(c => (
                  <FilterSizeOption key={c}>{c}</FilterSizeOption>
                ))}
              </FilterColor>
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={e => setSize(e.target.value)}>
                {product.size?.map(s => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Add onClick={() => handleQuantity("inc")} />
              <Amount>{quantity}</Amount>
              <Remove onClick={() => handleQuantity("dec")} />
            </AmountContainer>
            <ButtonAdd onClick={handleClick}>ADD TO CART</ButtonAdd>
            <Link to="/cart">
              <Button>GO TO CART</Button>
            </Link>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
