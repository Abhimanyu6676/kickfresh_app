import axios from 'axios';
import Cookies from 'js-cookie';

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
  let cookie = Cookies.get('_userObj');
  if (cookie && cookie != 'undefined') _params = cookie;
  console.log('_user:param>> ' + JSON.stringify(_params));
  return new Promise(async (resolve, reject) => {
    await axios
      .post(
        server + '/user/signup',
        {
          username: props.username,
          password: props.pass,
          _user: _params,
        },
        {
          timeout: 10000,
        },
      )
      .then((response) => {
        console.log('Create User Response>> ' + JSON.stringify(response));
        if (response.data.data.updateUser) {
          /* signIN({username: props.username, pass: props.pass})
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          }); */
          resolve(response.data.data.updateUser);
        } else reject('Unknown Error');
      })
      .catch((error) => {
        console.log('Create User Error>> ' + JSON.stringify(error));
        reject(error);
      });
  });
};

export const signIN = (props) => {
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
        },
      )
      .then((response) => {
        console.log(
          'SignIN response>> ' +
            JSON.stringify(response.data.data.authenticate),
        );
        if (response.data.data.authenticate.token)
          resolve(response.data.data.authenticate);
        else reject('User Authentication Failed');
      })
      .catch((error) => {
        console.log('SignIN Error>>' + JSON.stringify(error));
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
        isAdmin
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
