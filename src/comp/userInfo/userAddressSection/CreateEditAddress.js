import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {
  primaryColor,
  secondaryColor,
} from '../../../../assets/theme/global_colors';
import {useMutation} from '@apollo/client';
import {
  gql_getAllAddress,
  gql_updateAddress,
  gql_deleteAddress,
  gql_addAddress,
} from '../../../services/gqls';

export const CreateEditAddress = (props) => {
  const {height, User, toggleSelectorView} = props;
  let {selectedItem} = props;
  const [addLine1, setAddLine1] = useState('');
  const [addLine2, setAddLine2] = useState('');
  const [addRef, setAddRef] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const createNewAdd = selectedItem ? false : true;
  const [
    updateAddress,
    {loading: updateAddressLoading, error: updateAddressError},
  ] = useMutation(gql_updateAddress, {
    onCompleted(data) {
      console.log('Address update Success>> ' + JSON.stringify(data));
      toggleSelectorView({view: 1});
    },
    onError(error) {
      console.log('Address update Error>> ' + JSON.stringify(error));
      alert('Cannot Update Address, Please try later');
    },
  });

  const [
    addNewAddress,
    {loading: addAddressLoading, error: addAddressError},
  ] = useMutation(gql_addAddress, {
    onCompleted(data) {
      console.log('Address Added Successfully>> ' + JSON.stringify(data));
      toggleSelectorView({view: 1});
    },
    onError(error) {
      console.log('Address cannot be added, error>> ' + JSON.stringify(error));
      alert('Cannot Add Address, Please try later');
    },
  });

  const [
    deleteAddress,
    {loading: deleteAddressLoading, error: deleteAddressError},
  ] = useMutation(gql_deleteAddress, {
    onCompleted(data) {
      console.log('Address Deleted>> ' + JSON.stringify(data));
      toggleSelectorView({view: 1});
    },
    onError(error) {
      console.log('Address not deleted>> ' + JSON.stringify(error));
      alert('Cannot delete Address, Please try later');
    },
    /* update(cache, {data: {deleteAddress}}) {
        const {User} = cache.readQuery({
          query: gql_getAllAddress,
          variables: {id: User.id},
        });
        cache.writeQuery({
          query: gql_getAllAddress,
          variables: {id: User.id},
          data: {Address: User.concat([deleteAddress])},
        });
      }, */
  });
  if (!selectedItem) {
    selectedItem = {
      addLine1: '',
      addLine2: '',
      addRef: '',
      city: '',
      state: '',
      isDefault: false,
    };
  }

  const validate = () => {
    if (!createNewAdd) return true;
    if (
      addLine1.length < 2 ||
      addLine2.length < 4 ||
      city.length < 2 ||
      state.length < 2
    )
      return false;
    return true;
  };

  return (
    <View style={{width: '100%', minHeight: height, paddingBottom: 10}}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={ComStyles.primaryText}>Add 1 :</Text>
        <TextInput
          label="Add1"
          value={addLine1}
          placeholder={selectedItem.addLine1}
          multiline={true}
          onChangeText={(text) => {
            setAddLine1(text);
          }}
          style={{
            flex: 0.8,
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: secondaryColor,
            marginRight: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={ComStyles.primaryText}>Add 2 :</Text>
        <TextInput
          label="Add1"
          value={addLine2}
          placeholder={selectedItem.addLine2}
          multiline={true}
          onChangeText={(text) => {
            setAddLine2(text);
          }}
          style={{
            flex: 0.8,
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: secondaryColor,
            marginRight: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={ComStyles.primaryText}>Near by :</Text>
        <TextInput
          label="Add1"
          value={addRef}
          placeholder={selectedItem.addRef}
          multiline={true}
          onChangeText={(text) => {
            setAddRef(text);
          }}
          style={{
            flex: 0.8,
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: secondaryColor,
            marginRight: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={ComStyles.primaryText}>City :</Text>
        <TextInput
          label="Add1"
          value={city}
          placeholder={selectedItem.city}
          multiline={true}
          onChangeText={(text) => {
            setCity(text);
          }}
          style={{
            flex: 0.8,
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: secondaryColor,
            marginRight: 10,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          alignItems: 'center',
          marginTop: 10,
        }}>
        <Text style={ComStyles.primaryText}>State :</Text>
        <TextInput
          label="Add1"
          value={state}
          placeholder={selectedItem.state}
          multiline={true}
          onChangeText={(text) => {
            setState(text);
          }}
          style={{
            flex: 0.8,
            fontSize: 20,
            borderBottomWidth: 1,
            borderBottomColor: secondaryColor,
            marginRight: 10,
          }}
        />
      </View>
      {/*//Sec1: <isDefault> */}
      <View>
        {/*  <TouchableOpacity
          onPress={() => {
            setIsDefault(!isDefault);
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Text
              style={{
                fontSize: 15,
                color: primaryColor,
                textAlign: 'center',
                paddingHorizontal: 10,
              }}>
              Set Default
            </Text>
            <MaterialCommunityIcons
              name={
                isDefault ? 'checkbox-marked-outline' : 'checkbox-blank-outline'
              }
              style={{
                color: primaryColor,
                paddingHorizontal: 10,
                paddingVertical: 6,
              }}
            />
          </View> 
        </TouchableOpacity>*/}
      </View>
      {/*//Sec1: <UPDATE/DELETE> */}
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0,
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 15,
        }}>
        {/*//Sec2: <CREATE/UPDATE SECTION> */}
        <TouchableOpacity
          onPress={() => {
            if (validate()) {
              let _variables = {
                id: createNewAdd ? User.id : selectedItem.id,
                addLine1:
                  addLine1.length > 0 ? addLine1 : selectedItem.addLine1,
                addLine2:
                  addLine2.length > 0 ? addLine2 : selectedItem.addLine2,
                addRef: addRef.length > 0 ? addRef : selectedItem.addRef,
                city: city.length > 0 ? city : selectedItem.city,
                state: state.length > 0 ? state : selectedItem.state,
                isDefault: false,
              };
              if (!createNewAdd) {
                console.log('update');
                updateAddress({
                  variables: _variables,
                  refetchQueries: [
                    {query: gql_getAllAddress, variables: {id: User.id}},
                  ],
                });
              } else {
                console.log('adding New Address');
                addNewAddress({
                  variables: _variables,
                  refetchQueries: [
                    {query: gql_getAllAddress, variables: {id: User.id}},
                  ],
                });
              }
            } else {
              alert('Please Add a Valid Address');
            }
          }}
          style={{
            flex: 0.5,
          }}>
          <View style={[ComStyles.button, {backgroundColor: '#0a0'}]}>
            <Text style={ComStyles.buttonText}>
              {createNewAdd ? 'Add' : 'Save'}
            </Text>
          </View>
        </TouchableOpacity>
        {/*//Sec3: <CANCEL/DELTETE SEVTION> */}
        <TouchableOpacity
          onPress={() => {
            if (!createNewAdd)
              deleteAddress({
                variables: {
                  id: selectedItem.id,
                  //id: '65987508705875675968',
                },
                refetchQueries: [
                  {query: gql_getAllAddress, variables: {id: User.id}},
                ],
              });
            else {
              toggleSelectorView({view: 1});
            }
          }}
          style={{
            flex: 0.5,
          }}>
          <View style={ComStyles.button}>
            <Text style={ComStyles.buttonText}>
              {createNewAdd ? 'Cancel' : 'Delete'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  primaryText: {
    flex: 0.3,
    fontSize: 18,
    color: primaryColor,
    textAlign: 'left',
    marginHorizontal: 15,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#a44',
    height: 35,
    width: 100,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

const MobStyles = StyleSheet.create({
  container: {},
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {},
});
