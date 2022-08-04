import React, { useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../constants/baseURL";
import { useState } from "react";
import NavBar from "./NavBar";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [order, setOrder] = useState([]);

  const getProfile = () => {
    axios
      .get(baseURL + "/profile", {
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        setProfile(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const profileCard = (
    <div>
      <strong>
        <h3>Endereço cadastrado</h3>
      </strong>
      <p>{profile.address}</p>
      <p>{profile.cpf}</p>
      <p>{profile.email}</p>
      <p>{profile.name}</p>
    </div>
  );

  useEffect(() => {
    getProfile();
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
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  order
    ? (orderHistoryCard = order.map((order) => {
        return (
          <div>
            <p>{order.restaurantName}</p>
            <p>{new Date(order.createdAt).toLocaleDateString('pt-br',options)}</p>
            <p>Subtotal R$ {order.totalPrice}</p>
          </div>
        );
      }))
    : (orderHistoryCard = <p>Você não realizou nenhhum</p>);

  return (
    <div>
      <h1>Meu perfil</h1>
      {profileCard}
      <p>Histórico de pedidos</p>
      <hr></hr>
      {orderHistoryCard}
      <NavBar/>
    </div>
  );
}
