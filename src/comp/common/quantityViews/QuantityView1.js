import React from 'react';
import {Row, Col, View, Text, Button} from 'native-base';
import {FontAwesome5} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {primaryColor} from '../../../../assets/theme/global_colors';

export const QuantityView1 = (props) => {
  return (
    <View style={{borderWidth: 0, flex: 1, paddingHorizontal: 8}}>
      <Row style={{borderWidth: 0, alignItems: 'center'}}>
        <View>
          <TouchableOpacity onPress={props.Remove}>
            <View
              style={{
                backgroundColor: primaryColor,
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 5,
              }}>
              <FontAwesome5
                style={{color: '#fff', fontSize: 14}}
                name="minus"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#aaa'}}>
            {props.qty ? props.qty : 0}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={props.Add}>
            <View
              style={{
                backgroundColor: primaryColor,
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 5,
              }}>
              <FontAwesome5 style={{color: '#fff', fontSize: 14}} name="plus" />
            </View>
          </TouchableOpacity>
        </View>
      </Row>
    </View>
  );
};
