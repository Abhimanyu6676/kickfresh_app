import { CartList } from "../comp/cartComp/CartList";
import Cookies from "js-cookie";

/**
 * @param {, Product, Cart, Qty}
 *    - props
 *        -- Product : Product to add
 *        -- Cart    : Current cartList
 *        -- Qty     : Quantity to add(default : 1)-
 */
export const AddToCart = (props) => {
  let cartList = [];
  let cartUpdated = false;
  let P, rtrQty;
  props.Cart.map((item, index) => {
    if (item.ProductName == props.Product.ProductName) {
      item.currQty++;
      P = item;
      cartUpdated = true;
      cartList.push(item);
    } else {
      cartList.push(item);
    }
  });
  if (!cartUpdated) {
    P = Object.assign({}, props.Product);
    if (P.currQty >= 0) P.currQty++;
    else P["currQty"] = 1;
    cartList.push(P);
    cartUpdated = true;
  }
  rtrQty = P.currQty;
  Cookies.set("cart", cartList);
  return { cartList: cartList, updated: cartUpdated, rtrQty: rtrQty };
};

/**
 * @param {, Cart, Qty, ProductName} props
 *  - Props
 *    -- ProductName : ProductName for the Product to be removed
 *    -- Cart        : Current cartList
 *    -- Qty         : Quantity to remove(default : 1)
 *
 * @returns {, CartList:Array, updated:Boolean}
 */
export const RemoveFromCart = (props) => {
  let cartList = props.Cart;
  let cartUpdated = false;
  let P, rtrQty;
  let newCart = [];
  cartList.map((item, index) => {
    if (item.ProductName == props.ProductName) {
      P = item;
      if (item.currQty > 1) {
        item.currQty--;
        P = item;
        if (item.currQty > 0) {
          newCart.push(item);
          rtrQty = item.currQty;
        }
        cartUpdated = true;
      } else {
        cartUpdated = true;
      }
    } else {
      newCart.push(item);
    }
  });
  if (!cartUpdated) {
    cartUpdated = false;
  }
  Cookies.set("cart", newCart);
  return { cartList: newCart, updated: cartUpdated, rtrQty: rtrQty };
};
