import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  primaryColor,
  secondaryColor,
} from '../../../../assets/theme/global_colors';
import {Row} from '../../../../assets/components/Layouts';

export const DefaultAddressView = (props) => {
  const {defAdd, toggleSelectorView, height} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        toggleSelectorView({view: 1});
      }}>
      {props.cartAddressSelection && !props.selectedAddress.city && (
        <View
          style={{
            width: '100%',
            minHeight: height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: primaryColor, fontSize: 18, fontWeight: 'bold'}}>
            Select a Delivery Address
          </Text>
        </View>
      )}

      {(!props.cartAddressSelection || props.selectedAddress.city) && (
        <View style={{width: '100%', minHeight: height}}>
          <Row
            _style={{
              alignItems: 'center',
              borderWidth: 0,
              justifyContent: 'center',
            }}>
            <Text style={{color: primaryColor, paddingVertical: 5}}>
              {props.cartAddressSelection
                ? 'Tap to change or Add Delivery address'
                : 'Tap to change or Add Default address'}
            </Text>
          </Row>
          <View style={{alignItems: 'center', marginTop: 5}}>
            <Text
              style={{fontWeight: 'bold', color: primaryColor, fontSize: 18}}>
              {defAdd ? defAdd.addLine1 : 'add1'}
            </Text>
            <Text
              style={{fontWeight: 'bold', color: primaryColor, fontSize: 18}}>
              {defAdd ? defAdd.addLine2 : 'add2'}
            </Text>
            <Row>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: primaryColor,
                  fontSize: 18,
                }}>
                {defAdd ? defAdd.addRef : ''},
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: primaryColor,
                  fontSize: 18,
                  marginLeft: 8,
                }}>
                {defAdd ? defAdd.city.Location : ''}
              </Text>
            </Row>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};
