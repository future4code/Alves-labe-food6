import React, { useContext, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import styled from "styled-components";
import { Icon } from "@chakra-ui/icons";
import { Flex, Image } from "@chakra-ui/react";
import { goToEditAddress, goToEditProfile, goToLoginPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../components/global/GlobalContext";
import Header from "../../components/Header";
import EditIcon from '../../img/edit.svg'
const CardAdressInfo = styled.div`
  background-color: #eeeeee;
  padding: 1rem;
`;
const CardUserInfo = styled.div`
padding: 1rem;
font-weight: 500;
`;
const CardHistoryOrder = styled.div`
padding: 1rem;
font-weight: 500;
`;
const RestaurantName = styled.p`
color: red;
font-size: large;
font-weight: 500;
`
const RestaurantCard = styled.div`
width: 20.5rem;
height: 6.375rem;
border-color: gray;
border-width:1px;
padding: 1rem;
border-radius: 8px;
align-self: center;
margin-top: 0.5rem;
`;

const DivHr = styled.div`
display: flex;
text-align: center;
justify-content: center;
`
const HR = styled.hr`
width: 90vw;
border-width: 1px;
border-radius: 2%;
border-color: black;
`;
const H3 = styled.h3`
color:#c1c1c1;
`
const SubTotal = styled.p`
font-size:larger;
font-weight:700;
text-transform:uppercase;
`;

export default function Profile() {
  const { profile } = useContext(GlobalContext);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  const orderHistory = () => {
    axios
      .get(baseURL + "/orders/history", {
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setOrder(response.data.orders);
      })
  };

  useEffect(() => {
    !localStorage.getItem('token') && goToLoginPage(navigate)
    orderHistory()
  }, [])

  const profileCard = (
    <div>
      <CardUserInfo>
        <Flex align={"center"} justify={"space-between"}><p>{profile.name}</p><Image src={EditIcon} onClick={() => goToEditProfile(navigate)} _hover={{ cursor: 'pointer' }} /></Flex>
        <p>{profile.email}</p>
        <p>{profile.cpf}</p>
      </CardUserInfo>
      <CardAdressInfo>
        <Flex align={"center"} justify={"space-between"}><H3>Endereço cadastrado</H3><Image src={EditIcon} onClick={() => goToEditAddress(navigate)} _hover={{ cursor: 'pointer' }} /></Flex>
        <strong>
          <p>{profile.address}</p>
        </strong>
      </CardAdressInfo>
    </div>
  );

  

  let orderHistoryCard;
  const options = { year: "numeric", month: "short", day: "numeric" };
  order
    ? (orderHistoryCard = order.map((order) => {
      return (
        <RestaurantCard>
          <RestaurantName>{order.restaurantName}</RestaurantName>
          <p>
            {new Date(order.createdAt).toLocaleDateString("pt-br", options)}
          </p>
          <SubTotal>Subtotal R$ {order.totalPrice}</SubTotal>
        </RestaurantCard>
      );
    }))
    : (orderHistoryCard = <p>Você não realizou nenhum</p>);

  return (
    <div>
      <Header name={'Meu perfil'} />
      <Flex flexDir={"column"} minH={'100vh'}>
        <hr></hr>
        {profileCard}
        <CardHistoryOrder>
          <p>Histórico de pedidos</p>
        </CardHistoryOrder>
        <DivHr>
          <HR></HR>
        </DivHr>
        {orderHistoryCard}
      </Flex>
      <NavBar page={'profile'} />
    </div>
  );
}
