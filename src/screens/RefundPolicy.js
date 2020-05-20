import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import {server2} from '../services/REST';
import {Footer} from '../comp/homescreencomp/Footer';
import {primaryColor} from '../../assets/theme/global_colors';

const window = Dimensions.get('window');

export default RefundPolicy = (props) => {
  return (
    <ScrollView>
      <View
        style={[
          ComStyles.container,
          window.width < 500 ? MobStyles.container : PcStyles.container,
        ]}>
        {/*//Sec1: 'ContentSection' */}
        <View
          style={[
            ComStyles.contentView,
            window.width < 500 ? MobStyles.contentView : PcStyles.contentView,
          ]}>
          <Text style={ComStyles.HeadingText}>Refund Policy</Text>
          <Text style={ComStyles.subHeadingText}>Returns</Text>
          <Text style={ComStyles.contentText}>
            Our policy lasts 24hrs. If 24hrs have gone by since your purchase,
            unfortunately we can’t offer you a refund or exchange.
          </Text>
          <Text style={ComStyles.contentText}>
            To be eligible for a return, your item must be unused and in the
            same condition that you received it. It must also be in the original
            packaging.
          </Text>
          <Text style={ComStyles.contentText}>
            Several types of goods are exempt from being returned. Perishable
            goods such as food, milk, vegetables, fruits, groceries, Personal
            care, flowers, newspapers or magazines cannot be returned. We also
            do not accept products that are intimate or sanitary goods,
            hazardous materials, or flammable liquids or gases.
          </Text>
          <Text style={ComStyles.contentText}>
            Additional non-returnable items:
          </Text>
          <Text style={ComStyles.contentText}>- Gift cards and Vouchers</Text>
          <Text style={ComStyles.contentText}>
            - Downloadable products (Vegitables Fruits, etc) - if received bad
            quality product, you can ask the delivery boy to exchange the
            product or to take it out of your cart/order billing, which requires
            you to return that item at the same time
          </Text>
          <Text style={ComStyles.contentText}>
            - Some health and personal care items, you can check the details in
            the product section prior ordering
          </Text>
          <Text style={ComStyles.contentText}>
            To complete your return, we require a receipt or proof of purchase.
          </Text>
          <Text style={ComStyles.contentText}>
            Please do not send your purchase back to the manufacturer.
          </Text>
          <Text style={[ComStyles.contentText, {fontWeight: 'bold'}]}>
            There are certain situations where only partial refunds are granted
            (if applicable)
          </Text>
          <Text style={ComStyles.contentText}>
            - Book with obvious signs of use
          </Text>
          <Text style={ComStyles.contentText}>
            - Any item not in its original condition, is damaged or missing
            parts for reasons not due to our error
          </Text>
          <Text style={ComStyles.contentText}>
            - Any item that is returned more than 24hrs after delivery
          </Text>
          <Text style={ComStyles.subHeadingText}>Refunds</Text>
          <Text style={ComStyles.contentText}>
            Once your return is received and inspected, we will send you an
            email to notify you that we have received your returned item. We
            will also notify you of the approval or rejection of your refund.
          </Text>
          <Text style={ComStyles.contentText}>
            If you are approved, then your refund will be processed, and a
            credit will automatically be applied to your credit card or original
            method of payment, within a certain amount of days.
          </Text>
          <Text style={ComStyles.contentText}>Late or missing refunds</Text>
          <Text style={ComStyles.contentText}>
            If you haven’t received a refund yet, first check your bank account
            again.
          </Text>
          <Text style={ComStyles.contentText}>
            Then contact your credit card company, it may take some time before
            your refund is officially posted. Next contact your bank. There is
            often some processing time before a refund is posted. If you’ve done
            all of this and you still have not received your refund yet, please
            contact us at care@freshkick.in.
          </Text>
          <Text style={ComStyles.subHeadingText}>Sale items</Text>
          <Text style={ComStyles.contentText}>
            Only regular priced items may be refunded, unfortunately sale items
            cannot be refunded.
          </Text>
          <Text style={ComStyles.subHeadingText}>Exchanges</Text>
          <Text style={ComStyles.contentText}>
            We only replace items if they are defective or damaged. If you need
            to exchange it for the same item, send us an email at
            care@freshkick.in.
          </Text>
          <Text style={ComStyles.contentText}>Shipping</Text>
          <Text style={ComStyles.contentText}>
            To return your product, you should mail us at care@freshkick.in, or
            contact FreshKick support
          </Text>
          <Text style={ComStyles.contentText}>
            Depending on where you live, the time it may take for your exchanged
            product to reach you, may vary.
          </Text>
          <Text style={ComStyles.subHeadingText}></Text>
          <Text style={ComStyles.HeadingText}>FreshKick</Text>
          <Text style={ComStyles.subHeadingText}>
            Sternet Industries India Pvt. Ltd.
          </Text>
          <Text style={ComStyles.contentText}>
            1908, T-27, Paras Tierea, Sector-137
          </Text>
          <Text style={ComStyles.contentText}>Noida -201305</Text>
        </View>
        {/*//Sec2: 'FooterSection' */}
        <View
          style={[
            ComStyles.footer,
            window.width < 500 ? MobStyles.footer : PcStyles.footer,
          ]}>
          <Footer navigation={props.navigation} />
        </View>
      </View>
    </ScrollView>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
    width: '100%',
    minHeight: window.height - 60,
    display: 'flex',
    flexDirection: 'column',
  },
  contentView: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 30,
  },
  footer: {
    width: '100%',
    backgroundColor: primaryColor,
  },
  HeadingText: {color: '#444', fontSize: 25, fontWeight: 'bold'},
  subHeadingText: {
    color: '#777',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contentText: {color: '#777', fontSize: 15, marginTop: 10},
});

const MobStyles = StyleSheet.create({
  container: {},
  contentView: {paddingHorizontal: 20},
});

const TabStyles = StyleSheet.create({
  container: {},
  contentView: {paddingHorizontal: '15%'},
});

const PcStyles = StyleSheet.create({
  container: {},
  contentView: {paddingHorizontal: '20%'},
});
