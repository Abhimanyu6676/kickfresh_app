import React from 'react';
import {Platform} from 'react-native';
import {AsyncStorage} from 'react-native';
import Cookies from 'js-cookie';
import {RectButton} from 'react-native-gesture-handler';

export const saveToStorage = (props) => {
  return new Promise((resolve, reject) => {
    if (Platform.OS == 'web') {
      saveWeb(props)
        .then((res) => {
          if (res) resolve('DataSet Saved');
          else reject('Cannot save');
        })
        .catch((err) => {
          reject('Cannot save');
        });
    } else {
      savePhone(props)
        .then((res) => {
          if (res) resolve('DataSet Saved');
          else reject('Cannot save');
        })
        .catch((err) => {
          reject('Cannot save');
        });
    }
  });
};

export const fetchFromStorage = (props) => {
  let debug = false;
  return new Promise((resolve, reject) => {
    if (Platform.OS == 'web') {
      fetchWeb(props)
        .then((res) => {
          if (res) {
            {
              debug &&
                console.log(
                  'Fetched "' +
                    props.key +
                    '" from Web Cookie >> Value is > "' +
                    res +
                    '"',
                );
            }
            resolve(res);
          }
          reject('No Value Found');
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      fetchPhone(props)
        .then((res) => {
          if (res) {
            {
              debug &&
                console.log(
                  'Fetched "' +
                    props.key +
                    '" from Phone AsyncStorage >> Value is > "' +
                    res +
                    '"',
                );
            }
            resolve(res);
          }
          reject('No Value Found');
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

export const removeFromStorage = (props) => {
  let debug = false;
  return new Promise((resolve, reject) => {
    if (Platform.OS == 'web') {
      removeWeb(props)
        .then((res) => {
          if (res) resolve(res);
          else reject('Unknown Error while removing');
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      removePhone(props)
        .then((res) => {
          if (res) resolve(res);
          else reject('Unknown Error while removing');
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

const saveWeb = async (props) => {
  let debug = false;
  try {
    {
      debug &&
        console.log(
          'Saving "' +
            props.key +
            '" in Web Cookie with value "' +
            props.value +
            '"',
        );
    }
    await Cookies.set(props.key, props.value);
    return true;
  } catch (error) {
    return false;
  }
};

const savePhone = async (props) => {
  let debug = false;
  try {
    {
      debug &&
        console.log(
          'Saving "' +
            props.key +
            '" in Phone AsyncStorage with value "' +
            props.value +
            '"',
        );
    }
    await AsyncStorage.setItem(props.key, props.value);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const fetchWeb = async (props) => {
  let debug = false;
  {
    debug && console.log('Fettiching "' + props.key + '" from Web Cookie');
  }
  try {
    const item = await Cookies.get(props.key);
    if (item != null || item != 'undefined') return item;
    return null;
  } catch (error) {
    return null;
  }
};

const fetchPhone = async (props) => {
  let debug = false;
  {
    debug &&
      console.log('Fettiching "' + props.key + '" from Phone AsyncStorage');
  }
  try {
    const item = await AsyncStorage.getItem(props.key);
    if (item != null || item != 'undefined') return item;
    return null;
  } catch (error) {
    return null;
  }
};

const removePhone = async (props) => {
  let debug = false;
  {
    debug &&
      console.log('Removing "' + props.key + '" from Phone AsyncStorage');
  }
  try {
    await AsyncStorage.removeItem(props.key);
    return true;
  } catch (error) {
    return false;
  }
};

const removeWeb = async (props) => {
  let debug = false;
  {
    debug && console.log('removing "' + props.key + '" from Web Cookie');
  }
  try {
    Cookies.remove(props.key);
    return true;
  } catch (error) {
    return false;
  }
};
