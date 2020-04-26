import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Row, Container, Thumbnail, Button} from 'native-base';
import {MobileLoginBlock} from '../comp/cartComp/MobileLoginBlock';
import {CartList} from '../comp/cartComp/CartList';
import axios from 'axios';
import Cookies from 'js-cookie';
import useAxios from 'axios-hooks';

export default function CartScreen({navigation, route}) {
  navigation.setOptions({
    headerTitle: (props) => (
      <View style={{paddingRight: 5}}>
        <Row>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#7a0'}}>
            Cart
          </Text>
        </Row>
        <Row>
          <Text style={{color: '#aaa'}}>
            Total Cart Value is <Text style={{color: '#0aa'}}>Rs:737</Text>
          </Text>
        </Row>
      </View>
    ),
    headerRight: () => (
      <Container
        style={{
          justifyContent: 'center',
          paddingHorizontal: 15,
          borderWidth: 0,
        }}>
        <Thumbnail
          style={{padding: 10}}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
          }}
        />
      </Container>
    ),
  });

  const [result, setResult] = React.useState(null);
  const [{data, loading, error}, refetch] = useAxios(
    'http://192.168.1.90:3000/test',
  );

  useEffect(() => {
    Cookies.set(
      'test',
      '<Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text><Text>{data && JSON.stringify(data, null, 2)}</Text>',
    );
    return () => {
      //cleanup;
    };
  });

  return (
    <View>
      <MobileLoginBlock />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text>{data && JSON.stringify(data, null, 2)}</Text>
        <Text>{error && JSON.stringify(error, null, 2)}</Text>
        <Text>{loading && JSON.stringify(loading, null, 2)}</Text>
      </View>
      <CartList />
    </View>
  );
}

const getAllProducts = async () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(
        'http://localhost:3000/',
        {},
        {
          timeout: 2000,
        },
      )
      .then((response) => {
        let c = Cookies.get('test');
        console.log('++++++++++++++' + c);

        console.log(
          'axios response-- ' +
            'LoginAPI_status::' +
            response.status +
            'LoginAPI_body::' +
            response.data,
        );
        resolve(response);
        //cbRes("pass")
      })
      .catch((error) => {
        console.log('axios error:', error);
        reject(error);
      });
  });
};
