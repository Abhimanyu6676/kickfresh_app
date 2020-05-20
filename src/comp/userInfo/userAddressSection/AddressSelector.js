import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  primaryColor,
  secondaryColor,
} from '../../../../assets/theme/global_colors';
import {AddressItem} from './AddressItem';
import {DefaultAddressView} from './DefaultAddressView';
import {CreateEditAddress} from './CreateEditAddress';

export const AddressSelector = (props) => {
  const constant = {DEFAULT: 0, SELECTOR: 1, EDIT_ADDRESS: 2};
  const [height, setHeight] = useState(100);
  const [ShowAll, setShowAll] = useState(constant.DEFAULT);
  const [editID, setEditID] = useState(null);

  const toggleSelectorView = (props) => {
    switch (props.view) {
      case constant.DEFAULT:
        setShowAll(constant.DEFAULT);
        setHeight(100);
        break;

      case constant.SELECTOR:
        setShowAll(constant.SELECTOR);
        //setHeight(200);
        break;

      case constant.EDIT_ADDRESS:
        setEditID(props.id);
        setShowAll(constant.EDIT_ADDRESS);
        //setHeight(200);

        break;

      default:
        break;
    }
  };

  switch (ShowAll) {
    case constant.DEFAULT:
      if (props.data.User.Address.length < 1)
        return (
          <TouchableOpacity
            onPress={() => {
              toggleSelectorView({
                view: 2,
                id: 0,
              });
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 60,
                height: 100,
              }}>
              <Text style={{color: primaryColor, textAlign: 'center'}}>
                User Account Don't have any address, Add one now
              </Text>
            </View>
          </TouchableOpacity>
        );
      else {
        const _defaultAddress = props.data.User.Address.filter((item) => {
          if (item.id == props.data.User.defaultAddress) return item;
        });
        const defAdd =
          _defaultAddress.length > 0
            ? _defaultAddress[0]
            : props.data.User.Address[0];
        console.log('default address - ' + JSON.stringify(defAdd));
        return (
          //{/*//Sec1: <Default AddressSection> */}
          <DefaultAddressView
            defAdd={defAdd}
            height={height}
            toggleSelectorView={toggleSelectorView}
            cartAddressSelection={props.cartAddressSelection}
            selectedAddress={props.selectedAddress}
          />
        );
      }

      break;

    case constant.SELECTOR:
      return (
        <View style={{width: '100%', minHeight: height, paddingBottom: 10}}>
          {console.log('User>>>>>>>>>>>>> ' + props.User.id)}
          <Text
            style={{
              marginVertical: 8,
              marginHorizontal: 20,
              color: primaryColor,
              alignSelf: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {props.data.User.Address.length
              ? props.cartAddressSelection
                ? 'Select One Address to for Delivery, or Tap&Hold to edit/delete'
                : 'Select One Address to set Default, or Tap&Hold to edit/delete'
              : 'We do not find any address for your account'}
          </Text>
          {props.data.User.Address.map((item, index) => {
            return (
              <AddressItem
                item={item}
                toggleSelectorView={toggleSelectorView}
                User={props.User}
                UserFromServer={props.data.User}
                cartAddressSelection={props.cartAddressSelection}
                updateSelectedAddress={props.updateSelectedAddress}
              />
            );
          })}
          <TouchableOpacity
            style={{
              borderWidth: 0,
              height: 40,
              backgroundColor: primaryColor,
              borderRadius: 10,
              marginHorizontal: 15,
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              toggleSelectorView({
                view: 2,
                id: 0,
              });
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              ADD NEW ADDRESS
            </Text>
          </TouchableOpacity>
        </View>
      );
      break;

    case constant.EDIT_ADDRESS:
      /* const filter = props.data.User.Address.filter(
        (item) => item.id === editID,
      );
      const selectedItem = filter[0]; */

      const _selectedItem = props.data.User.Address.filter((item) => {
        if (item.id && item.id == editID) return item;
      });
      const selectedItem = _selectedItem.length > 0 ? _selectedItem[0] : null;
      return (
        <CreateEditAddress
          height={height}
          selectedItem={selectedItem}
          User={props.User}
          toggleSelectorView={toggleSelectorView}
        />
      );
      break;

    default:
      return <View></View>;
      break;
  }
};
