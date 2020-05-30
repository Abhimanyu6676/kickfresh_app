import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  primaryColor,
  secondaryColor,
} from '../../../assets/theme/global_colors';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql_getAllAddress} from '../../services/gqls';
import {AddressSelector} from './userAddressSection/AddressSelector';
import {useDispatch, useSelector} from 'react-redux';

export default AddressSection = (props) => {
  const User = useSelector((state) => state.userReducer.User);
  const {loading, error, data} = useQuery(gql_getAllAddress, {
    variables: {id: User.id},
    //skip: !id,
    //pollInterval: 1000, //turn it to 1000ms
  });

  useEffect(() => {
    const debug = false;
    {
      debug && console.log('log-User' + User.username);
    }
    return () => {};
  });

  if (!User.username || User.username.includes('temp'))
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(error);
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: primaryColor}}>
            Consider <Text style={{fontWeight: 'bold'}}>SigningUP</Text> to
            continue
          </Text>
        </View>
      </TouchableOpacity>
    );
  else if (loading)
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(error);
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: primaryColor}}>Loading Address</Text>
        </View>
      </TouchableOpacity>
    );
  else if (data) {
    return (
      <AddressSelector
        data={data}
        User={User}
        cartAddressSelection={props.cartAddressSelection}
        updateSelectedAddress={props.updateSelectedAddress}
        selectedAddress={props.selectedAddress}
      />
    );
  } else
    return (
      <TouchableOpacity
        onPress={() => {
          console.log('refresh');
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Some error while fetching data from server</Text>
        </View>
      </TouchableOpacity>
    );
};
