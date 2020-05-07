import React, { Component } from "react";
import { AppState } from "react-native";
import AppStackNavigator from "./navigation/Routes";
import { Provider } from "react-redux";
import { store } from "./redux/ReduxStore";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Background from "./services/Background";

//const host = 'http://162.241.115.55';
const host = "http://192.168.1.90:80";
//const host = 'http://localhost';

//Apollo Client Configuration
const client = new ApolloClient({
  cache: new InMemoryCache(),
  /* ApolloLink.from([
    onError(({graphQLErrors, networkError}) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }), */
  link: new HttpLink({
    uri: host + "/admin/api",
    credentials: "same-origin",
  }),
  /* ]), */
});

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Background />
          <AppStackNavigator />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default Application;
