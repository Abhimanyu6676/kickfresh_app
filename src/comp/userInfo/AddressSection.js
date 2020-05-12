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

export default AddressSection = (props) => {
  const [height, setHeight] = useState(100);
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('change height');
        if (height <= 100) setHeight(200);
        else setHeight(100);
      }}>
      <View style={{width: '100%', height: height}}>
        <Row
          _style={{
            alignItems: 'center',
            borderWidth: 0,
            justifyContent: 'center',
          }}>
          <Text style={{color: primaryColor, paddingVertical: 5}}>
            Touch and Hold to change Delivery address
          </Text>
        </Row>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{fontWeight: 'bold', color: primaryColor, fontSize: 18}}>
            {props.User.address[0].add1}
          </Text>
          <Text style={{fontWeight: 'bold', color: primaryColor, fontSize: 18}}>
            {props.User.address[0].add2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
