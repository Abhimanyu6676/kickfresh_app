import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Row, Col} from 'native-base';
import {Checkout} from './Checkout';

const Cartinfo = (props) => {
  const [Price, setPrice] = useState(0);
  const [Charges, setCharges] = useState(0);
  const [Total, setTotal] = useState(0);

  useEffect(() => {
    //effect
    let P = 0;
    props.cart.map((item, index) => {
      P = item.currQty * item.Price + P;
    });
    setPrice(P);
    if (P > 20) setCharges(20);
    else if (P <= 20) setCharges(0);
    return () => {
      //cleanup
    };
  });
  return (
    <View
      style={[
        ComStyles.container,
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
      ]}>
      <View
        style={[
          ComStyles.container2,
          props.dimensions.window.width < 500
            ? MobStyles.container2
            : PcStyles.container2,
        ]}>
        <AddressSection dimensions={props.dimensions} cart={props.cart} />
        <AmountSection
          dimensions={props.dimensions}
          cart={props.cart}
          Price={Price}
          Charges={Charges}
        />
      </View>
      <Checkout Price={Price} />
    </View>
  );
};

const AddressSection = (props) => {
  return (
    <View
      style={[
        ComStyles.AddressSection,
        props.dimensions.window.width < 500
          ? MobStyles.AddressSection
          : PcStyles.AddressSection,
      ]}>
      <View
        style={{
          borderWidth: 0,
          borderRadius: 10,
          padding: 10,
        }}>
        <Row>
          <Col>
            <Text style={[ComStyles.Text]}>Delivery Address</Text>
            <Text style={[ComStyles.Text, {fontSize: 8, fontWeight: '600'}]}>
              Tap Here to change address
            </Text>
          </Col>
          <Col>
            <Row>
              <Text style={[ComStyles.Text]}>Paras Tierea, sector 137</Text>
            </Row>
            <Row style={{marginVertical: 10}}>
              <Text style={[ComStyles.Text]}>Noida, UP, 201501</Text>
            </Row>
          </Col>
        </Row>
        <Row style={{backgroundColor: '#fff'}}>
          <Col style={{flex: 1}}>
            <Text style={[ComStyles.Text, {}]}>Delivery Instructions</Text>
          </Col>
          <Col style={{flex: 1.2}}>
            <View
              style={{
                width: '100%',
                height: 50,
                backgroundColor: '#eee',
                borderRadius: 5,
                margin: 5,
              }}></View>
          </Col>
        </Row>
      </View>
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
      <View style={{width: '100%', height: '100%', borderWidth: 0}}>
        <View style={[ComStyles.AmountRow]}>
          <Col style={ComStyles.AmountCol1}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#aaa'}}>
              Cart Price
            </Text>
          </Col>
          <Col style={ComStyles.AmountCol2}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#aaa'}}>
              {props.Price ? props.Price : 0}
            </Text>
          </Col>
        </View>
        <View style={[ComStyles.AmountRow, {display: 'none'}]}>
          <Col style={ComStyles.AmountCol1}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#0a0'}}>
              You Save
            </Text>
          </Col>
          <Col style={ComStyles.AmountCol2}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#0a0'}}>
              20
            </Text>
          </Col>
        </View>
        <View style={ComStyles.AmountRow}>
          <Col style={ComStyles.AmountCol1}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#a00'}}>
              Service % Tax Charge
            </Text>
          </Col>
          <Col style={ComStyles.AmountCol2}>
            <Text style={{fontSize: 14, fontWeight: '400', color: '#a00'}}>
              {props.Charges ? props.Charges : 0}
            </Text>
          </Col>
        </View>
        <View style={[ComStyles.AmountRow, {paddingVertical: 10}]}>
          <Col style={ComStyles.AmountCol1}>
            <Text style={{color: '#aaa', fontSize: 18, fontWeight: '600'}}>
              Payable Amount
            </Text>
          </Col>
          <Col style={ComStyles.AmountCol2}>
            <Text style={{color: '#aaa', fontSize: 18, fontWeight: '600'}}>
              {props.Charges + props.Price}
            </Text>
          </Col>
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
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  container2: {
    display: 'flex',
  },
  AddressSection: {},
  AmountRow: {display: 'flex', flexDirection: 'row', paddingVertical: 5},
  AmountCol1: {
    marginLeft: 10,
    flex: 3,
    borderWidth: 0,
  },
  AmountCol2: {alignItems: 'flex-end', marginRight: 20},
  Text: {
    color: '#aaa',
  },
});

const MobStyles = StyleSheet.create({
  container: {
    width: '90%',
  },
  container2: {
    flexDirection: 'column-reverse',
  },
  AddressSection: {flex: 1},
  AmountSection: {flex: 1},
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {
    width: '80%',
  },
  container2: {
    flexDirection: 'row',
  },
  AddressSection: {flex: 1.3},
  AmountSection: {flex: 1},
});

import {connect} from 'react-redux';

export default CartInfo = connect((state) => ({
  cart: state.cartReducer.cartList,
}))(Cartinfo);
