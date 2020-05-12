import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

//export const server = "http://162.241.115.55:80";
export const server = 'http://192.168.1.6:80';
//export const server = "http://localhost:80";

/**
 *
 * @param {props- username, pass}
 *      - props
 *        - - username
 *        - - pass
 */
export const signUpAPI = (props) => {
  let cookie = Cookies.get('__userObj');
  if (cookie && cookie != 'undefined') _params = cookie;
  else _params = {};
  //console.log('_user:param>> ' + JSON.stringify(_params));
  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        server + '/user/signup',
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
        console.log('Signup User Response>> ' + JSON.stringify(response));
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
        server + '/admin/api',
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
        console.log('SignIN response>> ' + JSON.stringify(response));
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

export const getUserAPI = (props) => {
  let cookie = Cookies.get('__userObj');
  if (cookie && cookie != 'undefined') _params = {__userObj: cookie};
  else _params = {};
  return new Promise(async (resolve, reject) => {
    await axios
      .get(server + '/user', {timeout: 2500, params: _params})
      .then((response) => {
        console.log('getUserAPI response>> ' + JSON.stringify(response));
        resolve(response);
      })
      .catch((error) => {
        console.log('getUserAPI Error>>' + JSON.stringify(error));
        reject(error);
      });
  });
};

const SIGNIN_MUTATION = `
  mutation signin($username: String, $pass: String) {
    authenticate: authenticateUserWithPassword(
      username: $username
      password: $pass
    ) {
      token
      item {
        username
        FName
        LName
        email
        Address
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
