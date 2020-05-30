import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  FontAwesome,
  SimpleLineIcons,
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import {
  primaryColor,
  secondaryColor,
} from '../../../assets/theme/global_colors';
import {Row, Col} from '../../../assets/components/Layouts';
import {useDispatch, useSelector} from 'react-redux';
import AddressSection from './AddressSection';
import Cookies from 'js-cookie';
import {Footer} from '../homescreencomp/Footer';

const window = Dimensions.get('window');

export default UserProfile = (props) => {
  const {navigation} = props;
  const User = useSelector((state) => state.userReducer.User);
  const dispatch = useDispatch();

  navigation.setOptions({
    headerStyle: ComStyles.headerStyle,
    headerTintColor: '#fff',
    headerTitle: () => (
      <View>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          Welcome {User.Username}
        </Text>
      </View>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          console.log('logout');
          removeFromStorage({key: '__userObj'});
          removeFromStorage({key: '__user'});
          removeFromStorage({key: '__token'});
          Cookies.remove('_user', {path: '/', domain: '192.168.1.6'});
          Cookies.remove('__user');
          Cookies.remove('__userObj');
          Cookies.remove('__token');
          //TODO: send unAuthenticate API
          dispatch(UserAction({User: ''}));
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginVertical: 2,
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            LogOut
          </Text>
          <AntDesign
            name="logout"
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              paddingHorizontal: 15,
            }}
          />
        </View>
      </TouchableOpacity>
    ),
  });

  useEffect(() => {
    if (!User.username || User.username.includes('temp')) {
      console.log('User is temprary, navigating To login Screen');
      navigation.replace('LoginSignUpHandler');
    }
    return () => {};
  });

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View
        style={[
          ComStyles.container,
          window.width < 500 ? MobStyles.container : PcStyles.container,
        ]}>
        {/*//Sec2: <User Profile Image Section> */}
        <View
          style={[
            ComStyles.profileSection,
            window.width < 500
              ? MobStyles.profileSection
              : PcStyles.profileSection,
          ]}>
          <View
            style={{
              marginHorizontal: 20,
              marginVertical: 40,
              borderRadius: 10,
              backgroundColor: primaryColor,
              height: 140,
            }}></View>
          <FontAwesome
            name="user-circle-o"
            style={[
              ComStyles.userIcon,
              window.width < 500 ? MobStyles.userIcon : PcStyles.userIcon,
            ]}
          />
          {/*//Sec2: <User Profile Image Section> */}
        </View>
        {/*//Sec1: <UserInfo Section> */}
        <View style={{borderWidth: 0, marginHorizontal: 20}}>
          <Row
            _style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={ComStyles.feildTextStyle}>{User.username}</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 0, marginHorizontal: 30}}
              onPress={() => {
                console.log('userInfo Edit form');
              }}>
              <Feather
                name="edit"
                style={{
                  color: primaryColor,
                  fontSize: 20,
                }}
              />
            </TouchableOpacity>
          </Row>
          <Row _style={{justifyContent: 'center'}}>
            <Text style={{alignSelf: 'center', color: primaryColor}}>
              {User.FName ? User.FName : 'Enter F-Name'}
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: primaryColor,
                marginLeft: 10,
              }}>
              {User.LName ? User.LName : 'Enter L-Name'}
            </Text>
          </Row>
          <Row _style={{justifyContent: 'center', alignItems: 'center'}}>
            <SimpleLineIcons
              name="location-pin"
              style={{color: primaryColor}}
            />
            <Text style={{alignSelf: 'center', color: primaryColor}}>
              Noida, UP 201301
            </Text>
          </Row>
          {/*//Sec1: <UserInfo Section> */}
        </View>
        {/*//Sec3: <Address//LastOrderStatus> */}
        <View style={{marginHorizontal: 20, marginVertical: 0, borderWidth: 0}}>
          <View
            style={[
              ComStyles.address,
              window.width < 500 ? MobStyles.address : PcStyles.address,
            ]}>
            <AddressSection User={User} />
          </View>
          <View
            style={{
              backgroundColor: secondaryColor,
              minHeight: 400,
              borderRadius: 10,
              paddingTop: 80,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                marginHorizontal: '5%',
                shadowColor: '#0a0',
                height: 40,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: primaryColor, fontSize: 15, fontWeight: 'bold'}}>
                No Order history present
              </Text>
              {/* <View style={{flexDirection: 'row'}}>
                <View style={{borderWidth: 0, flex: 1}}>
                  <Row _style={{paddingVertical: 5, paddingHorizontal: 10}}>
                    <Text style={{color: primaryColor}}>
                      Order Dated : 21/2/2020
                    </Text>
                  </Row>
                  <Row _style={{paddingHorizontal: 10}}>
                    <Text style={{color: primaryColor}}>
                      Total 12 Items in cart
                    </Text>
                  </Row>
                  <Row
                    _style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      alignItems: 'flex-end',
                    }}>
                    <Text style={{color: primaryColor, fontSize: 18}}>
                      YOU SAVED
                    </Text>
                    <Text
                      style={{
                        color: primaryColor,
                        fontSize: 20,
                        paddingLeft: 10,
                        fontWeight: 'bold',
                      }}>
                      Rs 100
                    </Text>
                  </Row>
                </View>
                <View style={{borderWidth: 0, flex: 0.4, alignItems: 'center'}}>
                  <Text style={{color: primaryColor, paddingVertical: 5}}>
                    Status
                  </Text>
                  <Text
                    style={{
                      color: primaryColor,
                      paddingVertical: 5,
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    Delivered
                  </Text>
                </View>
              </View>*/}
            </View>
          </View>
          {/*//Sec3: <LastOrderStatus> */}
        </View>
      </View>
      <View
        style={[
          ComStyles.footer,
          window.width < 500 ? MobStyles.footer : PcStyles.footer,
        ]}>
        <Footer navigation={props.navigation} />
      </View>
    </ScrollView>
  );
};

import {StyleSheet} from 'react-native';
import {compose} from 'redux';
import {UserAction} from '../../redux/actions/UserAction';
import {removeFromStorage} from '../../services/Storage';
import {useQuery} from '@apollo/react-hooks';
import {gql_getUser} from '../../services/gqls';

const ComStyles = StyleSheet.create({
  headerStyle: {
    backgroundColor: primaryColor,
    color: '#fff',
  },
  headerTitle: {paddingRight: 5, borderWidth: 0, color: '#fff'},
  container: {
    borderWidth: 0,
    backgroundColor: '#fff',
  },
  profileSection: {borderWidth: 0},
  infoRow: {},
  userIcon: {
    fontSize: 100,
    color: '#eee',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  feildContainer: {
    backgroundColor: secondaryColor,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  feildTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primaryColor,
    marginVertical: 5,
    alignSelf: 'center',
  },
  footer: {backgroundColor: primaryColor, marginTop: 20},
  address: {
    borderWidth: 0,
    minHeight: 100,
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    position: 'relative',
    top: 50,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  profileSection: {},
  infoRow: {},
  footer: {},
  address: {width: '90%'},
});

const TabStyles = StyleSheet.create({
  container: {},
  profileSection: {},
  infoRow: {},
  footer: {},
  address: {},
});

const PcStyles = StyleSheet.create({
  container: {marginHorizontal: '15%'},
  profileSection: {},
  infoRow: {},
  footer: {},
  address: {width: '70%'},
});
