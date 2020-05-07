import React, {useEffect, useState} from 'react';
import {View, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageLoad from 'react-native-image-placeholder';

let itemLaptop = [
  {
    title: 'Item 1',
    uri: 'http://192.168.1.90:3000/BannerImages/laptop/Banner 4.png',
  },
  {
    title: 'Item 2',
    uri: 'http://192.168.1.90:3000/BannerImages/laptop/Banner 3.png',
  },
  {
    title: 'Item 3',
    uri: 'http://192.168.1.90:3000/BannerImages/laptop/Banner 2.png',
  },
  {
    title: 'Item 4',
    uri: 'http://192.168.1.90:3000/BannerImages/laptop/Banner 1.png',
  },
];

let itemMobile = [
  {
    title: 'Item 1',
    uri: 'http://192.168.1.90:3000/BannerImages/mobile/Banner 4.png',
  },
  {
    title: 'Item 2',
    uri: 'http://192.168.1.90:3000/BannerImages/mobile/Banner 3.png',
  },
  {
    title: 'Item 3',
    uri: 'http://192.168.1.90:3000/BannerImages/mobile/Banner 2.png',
  },
  {
    title: 'Item 4',
    uri: 'http://192.168.1.90:3000/BannerImages/mobile/Banner 1.png',
  },
];

export default BannerRow = (props) => {
  const [width, setWidth] = useState(props.dimensions.window.width - 30);
  const [height, setheight] = useState(width * 0.301);

  useEffect(() => {
    let padding = props.dimensions.window.width < 500 ? 30 : 100;
    setWidth(props.dimensions.window.width - padding);
    setheight(width * 0.301);

    return () => {};
  });

  const _renderItem = ({item, index}) => {
    return (
      <View
        style={[
          ComStyles.container,
          props.dimensions.window.width < 500
            ? MobStyles.container
            : PcStyles.container,
        ]}>
        <ImageLoad
          style={[
            ComStyles.ImageView,
            props.dimensions.window.width < 500
              ? MobStyles.ImageView
              : props.dimensions.window.width < 1000
              ? TabStyles.ImageView
              : PcStyles.ImageView,
            {width: width, height: height},
          ]}
          loadingStyle={[
            ComStyles.ImageLoad,
            props.dimensions.window.width < 500
              ? MobStyles.ImageLoad
              : props.dimensions.window.width < 1000
              ? TabStyles.ImageLoad
              : PcStyles.ImageLoad,
            {width: width, height: height},
          ]}
          source={{
            uri: item.uri,
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Carousel
        layout={'default'}
        autoplay={true}
        autoplayDelay={6000}
        autoplayInterval={6000}
        loop={true}
        enableSnap={true}
        //ref={(ref) => (this.carousel = ref)}
        data={props.dimensions.window.width < 500 ? itemMobile : itemLaptop}
        sliderWidth={props.dimensions.window.width}
        itemWidth={props.dimensions.window.width}
        renderItem={_renderItem}
        //useNativeDriver={false}
        //onSnapToItem = { index => this.setState({activeIndex:index}) }
      />
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  ImageView: {borderWidth: 0},
  ImageLoad: {color: '#aaa'},
});

const MobStyles = StyleSheet.create({
  container: {},
  ImageView: {borderColor: 'red'},
  ImageLoad: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  ImageView: {borderColor: 'green'},
  ImageLoad: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  ImageView: {borderColor: 'blue'},
  ImageLoad: {},
});
