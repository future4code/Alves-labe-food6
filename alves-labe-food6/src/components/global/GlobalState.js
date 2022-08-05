import React, { useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { baseURL } from "../../constants/baseURL";
import { useNavigate } from "react-router-dom";
import { getRestaurants } from "../../services/restaurants";

export default function GlobalState(props) {
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    cpf: false,
    name: false,
  });
  const [rest, setRest] = useState([]);
  const [filter, setFilter] = useState("");
  console.log(filter);

  const [rest, setRest] = useState([])
  const [filter, setFilter] = useState('')
  const [restDetail, setRestDetail] = useState({})

  console.log(restDetail)


  const navigate = useNavigate();

  useEffect(() => {
    getRestaurants(setRest);
  }, []);

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
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setErrors({ email: false, password: false });
      })
      .catch((err) => {
        console.log(err);
      });
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
    if (form.cpf.match("^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}")) {
      setErrors({ cpf: true });
      return;
    }

    axios
      .post(baseURL + "/signup", form)
      .then((res) => {
        console.log(res.data);
        navigate("/address");
        setErrors({ email: false, password: false, name: false, cpf: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const userAddAddress = (form) => {
    if (form.street === "") {
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
      .put(baseURL + "/address", form, {
        headers: { auth: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setErrors({
          street: false,
          number: false,
          neighbourhood: false,
          city: false,
          state: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  };

  return <Provider value={values}>{props.children}</Provider>;
}
