import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(images/shipping.jpg) center;
  background-size: cover;
  display: flex;
  flex-direction: "column";
  align-items: center;
  justify-content: center; ;
`;
const Wrapper = styled.div`
  text-align: center;
  width: 25%;
  padding: 20px;
  background-color: white;
  opacity: 0.9;
  ${mobile({ width: "90%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 15px;
  ${mobile({ width: "80%", fontSize: "18px" })}
`;

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.cart;
  //   const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          //   userId: currentUser._id,
          products: cart.products.map(item => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data]);

  return (
    <>
      <Container>
        <Wrapper>
          {orderId ? (
            `Order has been created successfully. Your order number is ${orderId}`
          ) : (
            <Title>`Successfull. Your order is being prepared...`</Title>
          )}
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>
        </Wrapper>
      </Container>
    </>
  );
};

export default Success;
