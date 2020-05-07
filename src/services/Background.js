import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Cookies from "js-cookie";
import useAxios from "axios-hooks";
import { useDispatch } from "react-redux";
import { UserAction } from "../redux/actions/UserAction";
import { cartListAction } from "../redux/actions/CartListAction";
import { server } from "./REST";

export default Background = (props) => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  let cookie = Cookies.get("_user");
  if (cookie && cookie != "undefined") _params = { _user: cookie };
  else _params = {};
  const [{ data, loading, error }, executeGet] = useAxios(
    {
      url: server + "/user",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      params: _params,
      timeout: 2500,
    },
    { manual: true }
  );

  //art@world5fund.com

  useEffect(() => {
    let cart = Cookies.get("cart");
    if (cart) {
      var obj = JSON.parse(cart);
      console.log("cart>> " + JSON.stringify(obj));
      dispatch(cartListAction({ cartList: obj }));
    }
    console.log("user>> " + JSON.stringify(data));
    if (data && data.username) {
      console.log("user>> " + JSON.stringify(data.username));
      const u = {
        username: data.username,
        Phone: null,
        Address: [],
        Email: null,
        Token: JSON.stringify(data),
      };
      Cookies.set("_user", data.username);
      Cookies.set("_userData", data);
      dispatch(UserAction({ User: u }));
    } else if (data && data == "No User Found") {
      Cookies.remove("_user");
      setCount(count + 1);
    }
    const service = setInterval(() => {
      if (!data) {
        executeGet();
      } else {
      }
    }, 3000);
    return () => {
      clearInterval(service);
    };
  });

  return <View></View>;
};
