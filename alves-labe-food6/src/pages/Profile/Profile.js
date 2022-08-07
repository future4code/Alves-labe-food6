import React, { useContext, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";
import { useState } from "react";
import NavBar from "../../components/NavBar";
import styled from "styled-components";
import { EditIcon, Icon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { goToEditAddress, goToEditProfile, goToLoginPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../components/global/GlobalContext";
import Header from "../../components/Header";




const CardAdressInfo = styled.div`
  background-color: #eeeeee;
  padding: 3%;
`;
const CardUserInfo = styled.div`
padding: 3%;
font-weight: 500;
`;
const CardHistoryOrder = styled.div`
padding: 3%;
font-weight: 500;
`;
const RestaurantName = styled.p`
color: red;
font-size: large;
font-weight: 500;
`
const RestaurantCard = styled.div`
margin: 6%;
border-color: gray;
border-width:1px ;
border-radius: 2%;
padding: 2%;
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
const H3 =styled.h3`
color:#c1c1c1;
`
const SubTotal = styled.p`
font-size:larger;
font-weight:700;
text-transform:uppercase;
`;

export default function Profile() {
  const {profile} = useContext(GlobalContext);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    !localStorage.getItem('token') && goToLoginPage(navigate)
  },[])

  const profileCard = (
    <div>
      <CardUserInfo>
       <Flex align={"center"} justify={"space-between"}><p>{profile.name}</p><Icon onClick={()=>goToEditProfile(navigate)}><EditIcon/></Icon></Flex> 
        <p>{profile.email}</p>
        <p>{profile.cpf}</p>
      </CardUserInfo>
      <CardAdressInfo>
      <Flex align={"center"} justify={"space-between"}><H3>Endereço cadastrado</H3><Icon onClick={()=>goToEditAddress(navigate)}><EditIcon/></Icon></Flex>
        <strong>
          <p>{profile.address}</p>
        </strong>
      </CardAdressInfo>
    </div>
  );

  useEffect(() => {
    orderHistory();
  }, []);

  const orderHistory = () => {
    axios
      .get(baseURL + "/orders/history", {
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setOrder(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    : (orderHistoryCard = <p>Você não realizou nenhhum</p>);

  return (
    <div>
      <Header/>
      <hr></hr>
      {profileCard}
      <CardHistoryOrder>
      <p>Histórico de pedidos</p>
      </CardHistoryOrder>
      <DivHr>
      <HR></HR>
      </DivHr>
      {orderHistoryCard}
      <NavBar />
    </div>
  );
}
