import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Checkout} from './Checkout';
import {useSelector} from 'react-redux';
import {Row} from '../../../assets/components/Layouts';
import AddressSection from '../userInfo/AddressSection';

const Cartinfo = (props) => {
  const [Price, setPrice] = useState(0);
  const [saving, setSaving] = useState(0);
  const [Charges, setCharges] = useState(0);
  const [Total, setTotal] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const windowRef = useRef(null);

  useEffect(() => {
    //effect
    let P = 0,
      saving = 0;
    props.cart.map((item, index) => {
      P += item.currQty * item.Price;
      saving += item.currQty * (item.MRP - item.Price);
    });
    setPrice(P);
    setSaving(saving);
    if (P > 20) setCharges(20);
    else if (P <= 20) setCharges(0);
    return () => {
      //cleanup
    };
  });
  return (
    <View
      onLayout={(event) => {
        setWindowWidth(event.nativeEvent.layout.width);
      }}
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}>
      <View
        style={[
          ComStyles.container2,
          windowWidth < 500 ? MobStyles.container2 : PcStyles.container2,
        ]}>
        <_AddressSection
          dimensions={props.dimensions}
          cart={props.cart}
          User={props.User}
          updateSelectedAddress={props.updateSelectedAddress}
          selectedAddress={props.selectedAddress}
        />
        <AmountSection
          dimensions={props.dimensions}
          cart={props.cart}
          Price={Price}
          Charges={Charges}
          saving={saving}
          GST={Charges > 0 ? Math.round(Charges * 0.18) : 0}
        />
      </View>
      <View stylw={ComStyles.checkout}>
        <Checkout
          Price={Price}
          selectedAddress={props.selectedAddress}
          resolveCart={props.resolveCart}
          User={props.User}
          resolverLoading={props.resolverLoading}
          cartHasChanges={props.cartHasChanges}
        />
      </View>
    </View>
  );
};

const _AddressSection = (props) => {
  const [deliveryInstruction, setDeliveryInstruction] = useState('');
  return (
    <View
      style={[
        ComStyles.AddressSection,
        props.dimensions.window.width < 500
          ? MobStyles.AddressSection
          : PcStyles.AddressSection,
      ]}>
      {/*//Sec1: DeliveryAddress */}
      <View
        style={[
          ComStyles._address,
          window.width < 500 ? MobStyles._address : PcStyles._address,
        ]}>
        <AddressSection
          User={props.User}
          cartAddressSelection={true}
          updateSelectedAddress={props.updateSelectedAddress}
          selectedAddress={props.selectedAddress}
        />
      </View>
      {/*  <Row _style={{backgroundColor: '#fff', borderWidth: 0}}>
        <View style={{flex: 1, borderWidth: 0, padding: 0}}> */}
      <TextInput
        style={[
          ComStyles.deliveryInstruction,
          window.width < 500
            ? MobStyles.deliveryInstruction
            : PcStyles.deliveryInstruction,
        ]}
        underlineColorAndroid="transparent"
        placeholder={'Type In Delivery Instructions'}
        placeholderTextColor={'#9E9E9E'}
        numberOfLines={5}
        multiline={true}
        onChangeText={(text) => setDeliveryInstruction(text)}
      />
      {/*   </View>
      </Row> */}
    </View>
  );
};

const AmountSection = (props) => {
  return (
    <View
      style={[
        ComStyles.AmountSection,
        props.dimensions.window.width < 500
          ? MobStyles.AmountSection
          : PcStyles.AmountSection,
      ]}>
      <View style={{width: '100%', borderWidth: 0}}>
        {/*//Sec5: <<Subtotal>> */}
        <View style={[ComStyles.AmountRow]}>
          <View style={ComStyles.AmountCol1}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#aaa'}}>
              SubTotal
            </Text>
          </View>
          <View style={ComStyles.AmountCol2}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#aaa'}}>
              {props.Price ? props.Price : 0}
            </Text>
          </View>
          {/*//Sec5: <<Subtotal>> */}
        </View>
        {/*//Sec4: <<Delivery Charges>> */}
        <View style={[ComStyles.AmountRow]}>
          <View style={ComStyles.AmountCol1}>
            <Text style={{fontSize: 12, fontWeight: '600', color: '#aaa'}}>
              Delivery Charges
            </Text>
          </View>
          <View style={ComStyles.AmountCol2}>
            <Text style={{fontSize: 12, fontWeight: '600', color: '#aaa'}}>
              {props.Charges}
            </Text>
          </View>
          {/*//Sec4: <<Delivery Charges>> */}
        </View>
        {/*//Sec3: <GST<>> */}
        <View style={[ComStyles.AmountRow, {}]}>
          <View style={ComStyles.AmountCol1}>
            <Text style={{fontSize: 12, fontWeight: '400', color: '#FF5733'}}>
              GST
            </Text>
          </View>
          <View style={ComStyles.AmountCol2}>
            <Text style={{fontSize: 12, fontWeight: '400', color: '#FF5733'}}>
              {props.GST}
            </Text>
          </View>
          {/*//Sec3: <GST<>> */}
        </View>
        {/*//Sec2: <<You Save>> */}
        <View style={ComStyles.AmountRow}>
          <View style={ComStyles.AmountCol1}>
            <Text
              style={{fontSize: 14, fontWeight: '400', color: primaryColor}}>
              You Save
            </Text>
          </View>
          <View style={ComStyles.AmountCol2}>
            <Text
              style={{fontSize: 14, fontWeight: '400', color: primaryColor}}>
              {props.saving ? props.saving : 0}
            </Text>
          </View>
          {/*//Sec2: <<You Save>> */}
        </View>
        {/*//Sec1: <<Total Amount Payable>> */}
        <View style={[ComStyles.AmountRow, {paddingVertical: 10}]}>
          <View style={ComStyles.AmountCol1}>
            <Text style={{color: '#aaa', fontSize: 14, fontWeight: '600'}}>
              Total Amount Payable
            </Text>
          </View>
          <View style={ComStyles.AmountCol2}>
            <Text style={{color: '#aaa', fontSize: 14, fontWeight: '600'}}>
              {props.Charges + props.Price + props.Charges + props.GST}
            </Text>
          </View>
          {/*//Sec1: <<Total Amount Payable>> */}
        </View>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
    width: '100%',
    padding: 5,
    display: 'flex',
  },
  container2: {},
  AddressSection: {
    borderWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  _address: {
    borderWidth: 0,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    borderRadius: 10,
  },
  AmountSection: {borderWidth: 0},
  AmountRow: {display: 'flex', flexDirection: 'row', paddingVertical: 5},
  AmountCol1: {
    marginLeft: 10,
    flex: 3,
    borderWidth: 0,
  },
  AmountCol2: {marginRight: 20},
  Text: {
    color: '#aaa',
  },
  checkout: {display: 'flex'},
  deliveryInstruction: {
    minHeight: 50,
    color: '#999',
    borderRadius: 5,
    backgroundColor: '#e0e3e4',
    marginTop: 10,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  container2: {
    flexDirection: 'column-reverse',
  },
  AddressSection: {
    flex: 1,
    marginTop: 20,
  },
  _address: {},
  AmountSection: {flex: 1},
});

const TabStyles = StyleSheet.create({
  container: {},
  _address: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  container2: {
    flexDirection: 'row',
  },
  AddressSection: {flex: 1.3, alignItems: 'center'},
  _address: {maxWidth: 500, width: '100%'},
  deliveryInstruction: {maxWidth: 500, width: '100%'},
  AmountSection: {flex: 1},
});

import {connect} from 'react-redux';
import {
  primaryColor,
  secondaryColor,
} from '../../../assets/theme/global_colors';

export default CartInfo = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartinfo);
