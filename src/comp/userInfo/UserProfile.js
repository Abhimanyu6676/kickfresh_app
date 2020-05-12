import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Toast, Root} from 'native-base';
import {
  FontAwesome,
  SimpleLineIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import {
  primaryColor,
  secondaryColor,
} from '../../../assets/theme/global_colors';
import {Row, Col} from '../../../assets/components/Layouts';
import {useDispatch, useSelector} from 'react-redux';
import AddressSection from './AddressSection';

const window = Dimensions.get('window');

export default UserProfile = (props) => {
  const {navigation} = props;
  const User = useSelector((state) => state.userReducer.User);

  navigation.setOptions({headerShown: false});

  return (
    <View style={{borderWidth: 0, backgroundColor: '#fff', height: '100%'}}>
      {/*//Sec2: <User Profile Image Section> */}
      <View style={{borderWidth: 0}}>
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
            style={{alignSelf: 'center', color: primaryColor, marginLeft: 10}}>
            {User.LName ? User.LName : 'Enter L-Name'}
          </Text>
        </Row>
        <Row _style={{justifyContent: 'center', alignItems: 'center'}}>
          <SimpleLineIcons name="location-pin" style={{color: primaryColor}} />
          <Text style={{alignSelf: 'center', color: primaryColor}}>
            Noida, UP 201301
          </Text>
        </Row>
        {/*//Sec1: <UserInfo Section> */}
      </View>
      {/*//Sec3: <LastOrderStatus> */}
      <View style={{marginHorizontal: 20, marginVertical: 0, borderWidth: 0}}>
        <View
          style={{
            minHeight: 100,
            backgroundColor: '#fff',
            borderRadius: 20,
            marginHorizontal: 20,
            overflow: 'hidden',
            position: 'relative',
            top: 50,
            zIndex: 2,
            shadowColor: '#0a0',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
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
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 4,
            }}>
            <View style={{flexDirection: 'row'}}>
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
            </View>
          </View>
        </View>
        {/*//Sec3: <LastOrderStatus> */}
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {compose} from 'redux';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
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
});

const MobStyles = StyleSheet.create({
  container: {},
  infoRow: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  infoRow: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  infoRow: {},
});

{
  /* <View style={{borderWidth: 0}}>
      <Row
        style={[
          ComStyles.infoRow,
          window.width < 500 ? MobStyles.infoRow : PcStyles.infoRow,
        ]}>
        <FontAwesome
          name="user-circle-o"
          style={[
            ComStyles.userIcon,
            window.width < 500 ? MobStyles.userIcon : PcStyles.userIcon,
          ]}
        />
        <View style={{borderWidth: 0, flex: 1}}>
          <View style={ComStyles.feildContainer}>
            <Text style={ComStyles.feildTextStyle}>{User.username}</Text>
          </View>
          <View style={ComStyles.feildContainer}>
            <Text style={ComStyles.feildTextStyle}>
              {User.FName ? User.FName : 'Enter F-Name'}
            </Text>
          </View>
          <View style={ComStyles.feildContainer}>
            <Text style={ComStyles.feildTextStyle}>
              {User.LName ? User.FName : 'Enter L-Name'}
            </Text>
          </View>
        </View>
      </Row>
    </View> */
}
