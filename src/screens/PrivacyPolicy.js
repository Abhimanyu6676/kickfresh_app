import React from 'react';
import {View, Text, Image, Dimensions, ScrollView} from 'react-native';
import {server2} from '../services/REST';
import {Footer} from '../comp/homescreencomp/Footer';
import {primaryColor} from '../../assets/theme/global_colors';

const window = Dimensions.get('window');

export default PrivacyPolicy = (props) => {
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
          <Text style={ComStyles.HeadingText}>Privacy Policy</Text>
          <Text style={ComStyles.subHeadingText}>
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            www.freshkick.in.
          </Text>
          <Text style={ComStyles.subHeadingText}>
            Personal information we collect
          </Text>
          <Text style={ComStyles.contentText}>
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as “Device Information”.
          </Text>
          <Text style={ComStyles.subHeadingText}>
            We collect Device Information using the following technologies:
          </Text>
          <Text style={ComStyles.contentText}>
            - “Cookies” are data files that are placed on your device or
            computer and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
          </Text>
          <Text style={ComStyles.contentText}>
            - “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </Text>
          <Text style={ComStyles.contentText}>
            - “Web beacons”, “tags”, and “pixels” are electronic files used to
            record information about how you browse the Site.
          </Text>
          <Text style={ComStyles.contentText}>
            Additionally when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information
            (including credit card numbers, email address, and phone number. We
            refer to this information as “Order Information”.
          </Text>
          <Text style={ComStyles.contentText}>
            When we talk about “Personal Information” in this Privacy Policy, we
            are talking both about Device Information and Order Information.
          </Text>
          <Text style={ComStyles.subHeadingText}>
            How do we use your personal information?
          </Text>
          <Text style={ComStyles.contentText}>
            We use the Order Information that we collect generally to fulfil any
            orders placed through the Site (including processing your payment
            information, arranging for shipping, and providing you with invoices
            and/or order confirmations). Additionally, we use this Order
            Information to:
          </Text>
          <Text style={ComStyles.contentText}>- Communicate with you;</Text>
          <Text style={ComStyles.contentText}>
            - Screen our orders for potential risk or fraud; and
          </Text>
          <Text style={ComStyles.contentText}>
            - When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </Text>
          <Text style={ComStyles.contentText}>
            We use the Device Information that we collect to help us screen for
            potential risk and fraud (in particular, your IP address), and more
            generally to improve and optimize our Site (for example, by
            generating analytics about how our customers browse and interact
            with the Site, and to assess the success of our marketing and
            advertising campaigns)
          </Text>
          <Text style={ComStyles.subHeadingText}>
            Sharing you personal Information
          </Text>
          <Text style={ComStyles.contentText}>
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we use
            XYZ to power our online store--you can read more about how XYZ uses
            your Personal Information here:
          </Text>
          <Text style={ComStyles.contentText}>
            https://www.freshkick.in/pages/privacy-policy. We also use Google
            Analytics to help us understand how our customers use the Site --
            you can read more about how Google uses your Personal Information
            here: https://www.google.com/intl/en/policies/privacy/. You can also
            opt-out of Google Analytics here:
            https://tools.google.com/dlpage/gaoptout.
          </Text>
          <Text style={ComStyles.contentText}>
            Finally, we may also share your Personal Information to comply with
            applicable laws and regulations, to respond to a subpoena, search
            warrant or other lawful request for information we receive, or to
            otherwise protect our rights.
          </Text>
          <Text style={ComStyles.subHeadingText}>Behavioural advertising</Text>
          <Text style={ComStyles.contentText}>
            As described above, we use your Personal Information to provide you
            with targeted advertisements or marketing communications we believe
            may be of interest to you. For more information about how targeted
            advertising works, you can visit the Network Advertising
            Initiative’s (“NAI”) educational page at
            http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
          </Text>
          <Text style={ComStyles.contentText}>
            You can opt out of targeted advertising by using the links below:
          </Text>
          <Text style={ComStyles.contentText}>
            - Facebook: https://www.facebook.com/settings/?tab=ads
          </Text>
          <Text style={ComStyles.contentText}>
            - Google: https://www.google.com/settings/ads/anonymous
          </Text>
          <Text style={ComStyles.contentText}>
            - Bing:
            https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
          </Text>
          <Text style={ComStyles.contentText}>
            Additionally, you can opt out of some of these services by visiting
            the Digital Advertising Alliance’s opt-out portal at:
            http://optout.aboutads.info/.
          </Text>
          <Text style={ComStyles.subHeadingText}>Do not track</Text>
          <Text style={ComStyles.contentText}>
            Please note that we do not alter our Site’s data collection and use
            practices when we see a Do Not Track signal from your browser.
          </Text>
          <Text style={ComStyles.subHeadingText}>Your rights</Text>
          <Text style={ComStyles.contentText}>
            If you are an Indian resident, you have the right to access personal
            information we hold about you and to ask that your personal
            information be corrected, updated, or deleted. If you would like to
            exercise this right, please contact us at care@freshkick.in
          </Text>
          <Text style={ComStyles.subHeadingText}>Data retention</Text>
          <Text style={ComStyles.contentText}>
            When you place an order through the Site, we will maintain your
            Order Information for our records unless and until you ask us to
            delete this information.
          </Text>
          <Text style={ComStyles.subHeadingText}>Changes</Text>
          <Text style={ComStyles.contentText}>
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal or regulatory reasons.
          </Text>
          <Text style={ComStyles.subHeadingText}>Minors</Text>
          <Text style={ComStyles.contentText}>
            The Site is not intended for individuals under the age of 18 without
            Gaurdian Permission
          </Text>
          <Text style={ComStyles.subHeadingText}>Contact us</Text>
          <Text style={ComStyles.contentText}>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at care@freshkick.in or by mail using the details
            provided below:
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
    paddingBottom: 20,
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
