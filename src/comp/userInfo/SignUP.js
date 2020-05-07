import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Form, Item, Input, Label, Container, Content } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { signUpAPI, signIN } from "../../services/REST";
import { UserAction } from "../../redux/actions/UserAction";
import Cookies from "js-cookie";

export default SignUP = () => {
  const [username, setUsername] = useState("Abhimanyu");
  const [pass, setPass] = useState("12345678");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("SIGNUP");
    return () => {};
  });

  handleSignIn = () => {
    signUpAPI({ username, pass })
      .then((res) => {
        console.log("signUpAPI Response>> " + JSON.stringify(res));
        if (res.username) {
          console.log("user>> " + JSON.stringify(res.username));
          const u = res;
          Cookies.set("_user", res.username);
          Cookies.set("_userData", res);
          dispatch(UserAction({ User: u }));
        }
      })
      .catch((err) => {
        console.log("signUpAPI Error" + JSON.stringify(err));
      });
  };

  return (
    <View style={{ backgroundColor: "#fff", margin: 5, borderRadius: 10 }}>
      <Form>
        <Item inlineLabel>
          <Label>Username</Label>
          <Input onChangeText={(text) => setUsername(text)} />
        </Item>
        <Item inlineLabel>
          <Label>Password</Label>
          <Input onChangeText={(text) => setPass(text)} />
        </Item>
      </Form>

      <TouchableOpacity
        style={{
          width: 250,
          height: 40,
          alignSelf: "center",
          margin: 20,
          borderRadius: 5,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={handleSignIn}
      >
        <Text>SignUP</Text>
      </TouchableOpacity>

      <Text>{username}</Text>
      <Text>{pass}</Text>
    </View>
  );
};
