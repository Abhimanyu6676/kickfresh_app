import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Toast, Root} from 'native-base';

export default UserInfo = (props) => {
  const {navigation} = props;

  navigation.setOptions({headerShown: false});

  return (
    <Root>
      <View>
        <TouchableOpacity
          style={{margin: 20}}
          onPress={() =>
            Toast.show({
              text: 'Wrong password!',
              buttonText: 'Okay',
            })
          }>
          <Text>UserInfo</Text>
        </TouchableOpacity>
      </View>
    </Root>
  );
};
