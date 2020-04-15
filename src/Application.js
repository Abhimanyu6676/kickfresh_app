import React, { Component } from "react";
import { AppState } from "react-native";
import AppStackNavigator from "./navigation/Routes";
import { Provider } from "react-redux";
import { store } from "./redux/ReduxStore";

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }
  UNSAFE_componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  UNSAFE_componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    this.setState({ appState: nextAppState });
  };

  render() {
    // console.log("curr : state---->", this.state.appState);
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}

export default Application;
