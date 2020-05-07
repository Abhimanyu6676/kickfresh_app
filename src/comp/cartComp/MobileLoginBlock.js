import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const MobileLoginBlock = (props) => {
  return (
    <View
      style={[
        props.dimensions.window.width < 500
          ? MobStyles.container
          : PcStyles.container,
        ComStyles.container,
      ]}>
      <View>
        <Text>SignUP</Text>
      </View>
    </View>
  );
};

const ComStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
  },
});

const MobStyles = StyleSheet.create({
  container: {
    width: '90%',
    height: 150,
    marginVertical: 20,
  },
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {width: '80%', height: 150, marginVertical: 20},
});
