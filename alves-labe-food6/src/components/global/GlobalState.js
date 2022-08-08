import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { baseURL } from "../../constants/baseURL";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../../services/restaurants";
import { getAddress, getProfile } from "../../services/profile";
import { goBack, goToAddress, goToEditProfile, goToHome, goToRestaurant } from "../../routes/coordinator";

export default function GlobalState(props) {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    cpf: false,
    name: false,
  });
  const [rest, setRest] = useState([])
  const [filter, setFilter] = useState('')
  const [restDetail, setRestDetail] = useState({})
  const [address, setAddress] = useState({})
  const [editControl, setEditControl] = useState(false)
  const [profile, setProfile] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({})
  const [restaurantProducts, setRestaurantProducts] = useState([])
  const [cartProducts, setCartProducts] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants(setRest)
    getProfile(setProfile)
  }, [])
  useEffect(() => {
    getAddress(setAddress)
    getRestaurants(setRest)
    getProfile(setProfile)
    goToEditProfile(setProfile)
  }, [editControl])

  const userLogin = (form) => {
    if (
      form.email === "" ||
      !form.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors({ email: true });
      return;
    }
    if (form.password === "" || form.password.length < 6) {
      setErrors({ password: true });
      return;
    }
    axios
      .post(baseURL + "/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        goToHome(navigate)
        setErrors({ email: false, password: false });
      })
  };

  const userSignUp = (form) => {
    if (
      form.email === "" ||
      !form.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors({ email: true });
      return;
    }
    if (form.password === "" || form.password.length < 6) {
      setErrors({ password: true });
      return;
    }
    if (form.name === "") {
      setErrors({ name: true });
      return;
    }
    if (form.cpf
      .match(
        '^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}'
      )
    ) {

      setErrors({ cpf: true });
      return;
    }
    axios
      .post(baseURL + "/signup", form)
      .then((res) => {

        navigate("/address");
        setErrors({ email: false, password: false, name: false, cpf: false });
      })
  };

  const userAddAddress = (form) => {
    if (
      form.street === "") {
      setErrors({ street: true });
      return;
    }
    if (form.number === "") {
      setErrors({ number: true });
      return;
    }
    if (form.neighbourhood === "") {
      setErrors({ neighbourhood: true });
      return;
    }
    if (form.city === "") {
      setErrors({ city: true });
      return;
    }
    if (form.state === "") {
      setErrors({ state: true });
      return;
    }
    axios
      .put(baseURL + "/address", form, { headers: { auth: localStorage.getItem("token") } })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        goToHome(navigate)
        setEditControl(!editControl)
        setErrors({ street: false, number: false, neighbourhood: false, city: false, state: false });
      })
  };

  const userEditProfile = (form) => {
    if (
      form.email === "" ||
      !form.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors({ email: true });
      return;
    }
    if (form.name === "") {
      setErrors({ name: true });
      return;
    }
    if (form.cpf
      .match(
        '^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}'
      )
    ) {
      setErrors({ cpf: true });
      return;
    }
    axios
      .put(baseURL + "/profile", form, { headers: { auth: localStorage.getItem("token") } })
      .then((res) => {
        goBack(navigate);
        setEditControl(!editControl)
        setErrors({ email: false, name: false, cpf: false });
      })
  };

  const getRestaurantDetails = (id) => {
    axios.get(baseURL + `/restaurants/${id}`, {
      headers: {
        auth: localStorage.getItem('token')
      }
    })
      .then((res) => {
        setRestaurantDetails(res.data.restaurant)
        setRestaurantProducts(res.data.restaurant.products)
        goToRestaurant(navigate, id)
      })
  }

  const placeOrder = (paymentMethod, restaurantId) => {
    if( cartProducts.length === 0 ) {
      return
    }
    setCartProducts([])
    localStorage.setItem('cartProducts', JSON.stringify([]))
    const products = cartProducts.map((item) => {
      let obj = {
        id: item.id,
        quantity: item.quantity
      }
      return obj
    })
    const body = {
      products: products,
      paymentMethod: paymentMethod
    }
    axios.post(baseURL + `/restaurants/${restaurantId}/order`, body, {
      headers : {
        auth: localStorage.getItem('token')
      }
    })
  }

  const [activeOrder, setActiveOrder] = useState({})
  const getActiveOrder = () => {
    axios.get(baseURL + '/active-order', {
      headers: {
        auth: localStorage.getItem('token')
      }
    }).then((res) => {
      setActiveOrder(res.data.order)
    })
  }

  const Provider = GlobalContext.Provider;
  const values = {
    userLogin,
    userSignUp,
    userAddAddress,
    errors,
    rest,
    setRest,
    filter,
    setFilter,
    restDetail,
    setRestDetail,
    address,
    profile,
    userEditProfile,
    restaurantDetails,
    restaurantProducts,
    cartProducts,
    setCartProducts,
    setRestaurantDetails,
    getRestaurantDetails,
    placeOrder,
    getActiveOrder,
    activeOrder
  };

  return <Provider value={values}>{props.children}</Provider>;
}
