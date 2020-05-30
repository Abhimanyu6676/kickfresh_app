import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {useMutation} from '@apollo/react-hooks';
import {gql_createSubscriber} from '../../services/gqls';

const window = Dimensions.get('window');

/**
 *
 * @param {props [navigation<routerObject>]} props
 */
export const Footer = (props) => {
  const [email, setEmail] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter email to Subscribe');
  const [success, setSuccess] = useState(false);

  const [
    createSubscriber,
    {loading: createSubscriberLoading, error: createSubscriberError},
  ] = useMutation(gql_createSubscriber, {
    onCompleted(data) {
      console.log('Subscriber Created>> ' + JSON.stringify(data));
      setSuccess(true);
    },
    onError(error) {
      console.log(
        'Create Subscriber Error>> ' +
          JSON.stringify(error.graphQLErrors[0].message),
      );
      if (error.graphQLErrors[0].message.includes('E11000 duplicate key')) {
        setPlaceholder('Email Already Subscribed');
        setEmail('');
      }
      setSuccess(false);
    },
  });

  const validate = () => {
    if (validateEmail()) {
      console.log('validation success');
      createSubscriber({
        variables: {email: email},
      });
    } else {
      setSuccess(false);
      setEmail('');
      setPlaceholder('Enter a valid email');
    }
  };

  const validateEmail = () => {
    var x = email.toString();
    var atposition = x.indexOf('@');
    var dotposition = x.lastIndexOf('.');
    if (
      x.length < 2 ||
      atposition < 1 ||
      dotposition < atposition + 2 ||
      dotposition + 2 >= x.length
    ) {
      return false;
    }
    return true;
  };

  return (
    <View
      style={[
        ComStyles.parentView,
        window.width < 500 ? MobStyles.parentView : PcStyles.parentView,
      ]}>
      <View
        style={[
          ComStyles.container,
          window.width < 500 ? MobStyles.container : PcStyles.container,
        ]}>
        <View
          style={[
            ComStyles.block1,
            window.width < 500 ? MobStyles.block1 : PcStyles.block1,
          ]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Store-Home');
            }}>
            <Text style={ComStyles.heading}>FreshKick</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('About Us');
            }}>
            <Text style={ComStyles.text}>About Us</Text>
          </TouchableOpacity>
          <Text style={ComStyles.text}>Order Tracking</Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Payment Terms');
            }}>
            <Text style={ComStyles.text}>Payment Terms</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Refund Policy');
            }}>
            <Text style={ComStyles.text}>Return N Refund Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Terms N Consitions');
            }}>
            <Text style={ComStyles.text}>Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Privacy Policy');
            }}>
            <Text style={ComStyles.text}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            ComStyles.block2,
            window.width < 500 ? MobStyles.block2 : PcStyles.block2,
          ]}>
          <Text style={ComStyles.heading}>Order From</Text>
          <Text style={ComStyles.text}>Website</Text>
          <Text style={ComStyles.text}>
            KickFresh on Play Store{' '}
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Coming Soon</Text>
          </Text>
          <Text style={ComStyles.text}>
            KickFresh on App Store{' '}
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Coming Soon</Text>
          </Text>
          <Text style={ComStyles.text}>
            WhatsApp Number{'\n\n'}
            {Platform.OS == 'web' && (
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                <a
                  href={'https://wa.me/919582453222'}
                  target="_blank"
                  style={{color: '#fff'}}>
                  9582463222
                </a>
                {'\t\t'}
                <a
                  href={'https://wa.me/919839531395'}
                  target="_blank"
                  style={{color: '#fff'}}>
                  9839531395
                </a>
              </Text>
            )}
            {Platform.OS != 'web' && (
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                9582463222{'\t\t'}9839531395
              </Text>
            )}
          </Text>
        </View>
        <View
          style={[
            ComStyles.block3,
            window.width < 500 ? MobStyles.block3 : PcStyles.block3,
          ]}>
          <Text style={ComStyles.heading}>Newsletter</Text>
          <View
            style={{
              backgroundColor: '#fff',
              height: 35,
              width: '90%',
              borderRadius: 20,
              alignItems: 'center',
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}>
            <TextInput
              style={{flex: 1}}
              value={email}
              underlineColorAndroid="transparent"
              placeholder={placeholder}
              placeholderTextColor={'#9E9E9E'}
              numberOfLines={1}
              multiline={false}
              onChangeText={(text) => {
                setEmail(text);
                setSuccess(false);
              }}
            />
            {createSubscriberLoading && (
              <Image
                style={{
                  width: 24,
                  height: 25,
                  alignSelf: 'center',
                }}
                source={require('../../../assets/loading.gif')}
              />
            )}
            {success && (
              <FontAwesome5
                name="check-circle"
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  color: primaryColor,
                }}
              />
            )}
            {!success && (
              <TouchableOpacity
                onPress={() => {
                  validate();
                }}
                style={{
                  borderWidth: 0,
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <FontAwesome5
                  name="check-circle"
                  style={{
                    fontSize: 20,
                    paddingHorizontal: 10,
                    color: '#aaa',
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={[ComStyles.text, {marginVertical: 8}]}>
            Submit to stay updated with latest Product and offers
          </Text>
        </View>
      </View>
      <Row
        _style={[
          ComStyles.socialIconRow,
          window.width < 500 ? MobStyles.socialIconRow : PcStyles.socialIconRow,
        ]}>
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="facebook"
        />

        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="instagram"
        />
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="twitter"
        />
        <FontAwesome5
          style={{color: '#fff', fontSize: 25, paddingHorizontal: 10}}
          name="linkedin"
        />
      </Row>
      <View style={{borderWidth: 0}}></View>
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {Row} from '../../../assets/components/Layouts';
import {primaryColor} from '../../../assets/theme/global_colors';

const ComStyles = StyleSheet.create({
  parentView: {marginBottom: 30},
  container: {
    borderWidth: 0,
    paddingHorizontal: 10,
    display: 'flex',
  },
  block1: {borderWidth: 0, paddingVertical: 10},
  block2: {borderWidth: 0, paddingVertical: 10},
  block3: {borderWidth: 0, paddingVertical: 10},
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {color: '#fff', fontSize: 14, marginVertical: 3},
  socialIconRow: {},
});

const MobStyles = StyleSheet.create({
  parentView: {},
  container: {marginVertical: 20, flexDirection: 'column'},
  block1: {},
  block2: {},
  block3: {},
  socialIconRow: {},
});

const TabStyles = StyleSheet.create({
  parentView: {},
  container: {},
  block1: {},
  block2: {},
  block3: {},
  socialIconRow: {},
});

const PcStyles = StyleSheet.create({
  parentView: {},
  container: {marginVertical: 25, flexDirection: 'row', paddingHorizontal: 50},
  block1: {flex: 1},
  block2: {flex: 1},
  block3: {flex: 1},
  socialIconRow: {paddingHorizontal: 40},
});
