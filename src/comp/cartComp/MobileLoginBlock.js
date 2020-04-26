import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

export const MobileLoginBlock = (props) => {
  const [dimensions, setDimensions] = useState({window, screen});

  const onChange = ({window, screen}) => {
    console.log(dimensions);
    setDimensions({window, screen});
  };

  useEffect(() => {
    //effect
    Dimensions.addEventListener('change', onChange);
    return () => {
      //cleanup
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <View
      style={[
        dimensions.window.width < 500
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
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 10,
  },
});

const MobStyles = StyleSheet.create({
  container: {
    margin: '2vw',
    width: '96vw',
    height: '20vh',
    borderRadius: 10,
  },
});

const TabStyles = StyleSheet.create({
  container: {},
});

const PcStyles = StyleSheet.create({
  container: {
    margin: '2vw',
    width: '96vw',
    height: '20vh',
    borderRadius: 10,
  },
});
