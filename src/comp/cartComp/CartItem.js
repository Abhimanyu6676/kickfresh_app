import React, {useEffect} from 'react';
import {
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  View,
} from 'native-base';
import {QuantityView1} from '../common/quantityViews/QuantityView1';
import {useSelector, useDispatch} from 'react-redux';
import {cartListAction} from '../../redux/actions/CartListAction';
import {AddToCart, RemoveFromCart} from '../../services/CartUpdate';

export default Cartitems = (props) => {
  const cart = useSelector((state) => state.cartReducer.cartList);
  const dispatch = useDispatch();

  useEffect(() => {
    //effect
    console.log('))-' + JSON.stringify(cart));
    return () => {
      //cleanup
    };
  });

  return (
    <View style={{minHeight: '40%'}}>
      <List>
        {cart.map(
          (item, index) =>
            item.currQty && (
              <_ListItem
                item={item}
                key={index}
                cart={cart}
                dispatch={dispatch}
              />
            ),
        )}
      </List>
    </View>
  );
};

const _ListItem = (props) => {
  const Add = async () => {
    let r = AddToCart({
      Product: props.item,
      Cart: props.cart,
      Qty: 1,
    });
    props.dispatch(cartListAction({cartList: r.cartList}));
  };

  const Remove = async () => {
    let r = RemoveFromCart({
      Cart: props.cart,
      Qty: 1,
      ProductName: props.item.ProductName,
    });
    props.dispatch(cartListAction({cartList: r.cartList}));
  };
  return (
    <ListItem thumbnail>
      <View>
        <Left>
          <Thumbnail
            square
            style={{width: 30, height: 30}}
            source={{
              uri:
                'https://lh3.googleusercontent.com/coMv1dl31PCfEs6essJoEUwVryaqKHKQvENdZ_WYpN-PXa8Qfitkg3grQxIVN22W5A',
            }}
          />
        </Left>
      </View>
      <Body>
        <Text>{props.item.ProductName}</Text>
        <Text note numberOfLines={1}>
          Rich Source of Vitamin C...
        </Text>
      </Body>
      <Right>
        <QuantityView1 qty={props.item.currQty} Add={Add} Remove={Remove} />
      </Right>
    </ListItem>
  );
};

/* export default CartItems = connect(
  (state) => ({
    cart: state.cartReducer.cartList,
  }),
  {cartListAction},
)(Cartitems); */
