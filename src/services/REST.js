import axios from 'axios';
import Cookies from 'js-cookie';
import {fetchFromStorage} from '../services/Storage';

//export const server = 'http://162.241.115.55:80';
//export const server = 'https://freshkick.in/backend';
export const server2 = 'https://freshkick.in/Images';
export const server = 'http://192.168.1.6:3000/backend';
//export const server = 'http://192.168.1.6/Images';
//export const server = "http://localhost:80";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = server;

/**
 *
 * @param {props- username, pass}s
 *      - props
 *        - - username
 *        - - pass
 */
export const signUpAPI = async (props) => {
  let cookie = 'undefined';
  await fetchFromStorage({key: '__userObj'})
    .then((val) => {
      cookie = val;
    })
    .catch((err) => {
      console.log('fetch error>>');
      console.log(err);
    });
  if (cookie && cookie != 'undefined') _params = cookie;
  else _params = {};
  //console.log('_user:param>> ' + JSON.stringify(_params));
  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        '/user/signup',
        {
          username: props.username,
          password: props.pass,
          email: props.email,
          phone: props.phone,
          __userObj: _params,
        },
        {
          timeout: 5000,
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('Signup User Response>> ' + JSON.stringify(response.data));
        if (response.data) {
          signInAPI({username: props.username, pass: props.pass})
            .then((res) => {
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
          //resolve(response.data);
        } else reject('Unknown Error');
      })
      .catch((error) => {
        console.log('Create User Error>> ' + JSON.stringify(error));
        reject(error);
      });
  });
};

export const signInAPI = (props) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        '/admin/api',
        {
          query: SIGNIN_MUTATION,
          variables: {
            username: props.username,
            pass: props.pass,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {
          timeout: 10000,
          withCredentials: true,
        },
      )
      .then((response) => {
        console.log('SignIN response>> ' + JSON.stringify(response.data));
        if (response.data.data.authenticate.token)
          resolve(response.data.data.authenticate);
        else if (response.data.errors) {
          reject(response.data.errors[0].message);
        } else reject('User Authentication Failed');
      })
      .catch((error) => {
        if (error.response)
          console.log(
            'SignIN Error>>' +
              JSON.stringify(error.response.data.errors[0].message),
          );
        else console.log('SignIN Error>>>' + JSON.stringify(error));
        reject(error);
      });
  });
};

export const getUserAPI = async (props) => {
  let debug = false;
  let cookie = 'undefined';
  await fetchFromStorage({key: '__userObj'})
    .then((val) => {
      cookie = val;
    })
    .catch((err) => {});
  if (cookie && cookie != 'undefined') _params = {__userObj: cookie};
  else _params = {};
  return new Promise(async (resolve, reject) => {
    await axios
      .get('/user', {timeout: 2500, params: _params})
      .then((response) => {
        {
          debug &&
            console.log(
              'axios getUserAPI response>> ' + JSON.stringify(response.data),
            );
        }
        if (
          response.data != null &&
          response.data != 'undefined' &&
          response.data.username
        )
          resolve(response.data);
        else reject('NO DATA RETURNED');
      })
      .catch((error) => {
        {
          debug &&
            console.log(
              'getUserAPI Error>>>--' + JSON.stringify(error.message),
            );
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          {
            debug && console.log(error.request);
          }
        }
        reject(error);
      });
  });
};

export const resolveCartAPI = async (props) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        '/admin/api',
        {
          query: gql_resolveCart,
          variables: {
            products: props.products,
            userID: props.userID,
            addID: props.addID,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        },
        {
          timeout: 10000,
          withCredentials: true,
        },
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const gql_resolveCart = `
  query($products: [cartResolverInput!]!, $userID:ID!, $addID:ID!) {
    cartResolver(products: $products, userID: $userID, addID:$addID) {
      Products {
        ProductName
        ProductID
        Price
        MRP
        Breakqty
        available
        modified
        PriceModified
      }
      success
      errorMsg
    }
  }
`;

const SIGNIN_MUTATION = `
  mutation signin($username: String, $pass: String) {
    authenticate: authenticateUserWithPassword(
      username: $username
      password: $pass
    ) {
      token
      item {
        id
        username
        FName
        LName
        email
      }
    }
  }
`;

const GET_ALL_PRODUCTS = `
query {
  allProducts {
    ProductName
  }
}`;
