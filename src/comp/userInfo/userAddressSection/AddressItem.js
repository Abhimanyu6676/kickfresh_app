import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  primaryColor,
  secondaryColor,
} from '../../../../assets/theme/global_colors';
import {useMutation} from '@apollo/react-hooks';
import {
  gql_getAllAddress,
  gql_updateDefaultAddress,
} from '../../../services/gqls';

export const AddressItem = (props) => {
  const [
    updateDefaultAddress,
    {loading: updateDefaultLoading, error: updateDefaultError},
  ] = useMutation(gql_updateDefaultAddress, {
    onCompleted(data) {
      console.log('Address Default Updated>> ' + JSON.stringify(data));
      props.toggleSelectorView({view: 0});
    },
    onError(error) {
      console.log('Address Default Not Updated> ' + JSON.stringify(error));
      alert('Cannot Update Default Address, Please try later');
    },
  });
  return (
    <TouchableOpacity
      style={{
        borderWidth: 0,
        width: '90%',
        minHeight: 80,
        alignSelf: 'center',
        marginVertical: 4,
        borderRadius: 12,
        paddingHorizontal: 4,
        shadowColor: '#aaa',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
      }}
      onLongPress={() => {
        props.toggleSelectorView({
          view: 2,
          id: props.item.id,
          /* check: props.item.isDefault, */
        });
      }}
      onPress={() => {
        if (props.cartAddressSelection) {
          console.log('Updating user address ' + props.User.id);
          props.updateSelectedAddress(props.item);
        }
        updateDefaultAddress({
          variables: {
            id: props.User.id,
            defaultAddress: props.item.id,
          },
          refetchQueries: [
            {query: gql_getAllAddress, variables: {id: props.User.id}},
          ],
        });
      }}>
      {props.UserFromServer.defaultAddress == props.item.id && (
        <View
          style={{
            position: 'absolute',
            top: 5,
            right: 8,
            backgroundColor: primaryColor,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 5,
          }}>
          <Text style={{color: '#fff'}}>Default</Text>
        </View>
      )}
      <Text
        style={{
          alignSelf: 'center',
          color: primaryColor,
          marginVertical: 5,
          marginTop: 10,
        }}>
        {props.item.addLine1}
      </Text>

      <Text
        style={{alignSelf: 'center', color: primaryColor, textAlign: 'center'}}>
        {props.item.addLine2}
      </Text>
      {props.item.addRef.length > 0 && (
        <Text
          style={{
            alignSelf: 'center',
            color: primaryColor,
            textAlign: 'center',
          }}>
          {props.item.addRef}
        </Text>
      )}
      <Text
        style={{
          alignSelf: 'center',
          fontWeight: 'bold',
          color: primaryColor,
          textAlign: 'center',
          marginBottom: 8,
        }}>
        {props.item.city.Location},{' '}
        {props.item.city.State ? props.item.city.State : ''},
      </Text>
    </TouchableOpacity>
  );
};
