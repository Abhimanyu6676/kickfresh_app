import React from 'react';
import {Row, Col, View, Text, Button} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const QuantityView1 = (props) => {
  return (
    <View style={{borderWidth: 0, paddingVertical: 0}}>
      <Row>
        <Col>
          <TouchableOpacity onPress={props.Remove}>
            <View
              style={{
                backgroundColor: '#aaa',
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 5,
              }}>
              <FontAwesome style={{color: '#fff'}} name="minus" />
            </View>
          </TouchableOpacity>
        </Col>
        <View
          style={{
            paddingHorizontal: 15,
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#aaa'}}>
            {props.qty ? props.qty : 0}
          </Text>
        </View>
        <Col>
          <TouchableOpacity onPress={props.Add}>
            <View
              style={{
                backgroundColor: '#aaa',
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 5,
              }}>
              <FontAwesome style={{color: '#fff'}} name="plus" />
            </View>
          </TouchableOpacity>
        </Col>
      </Row>
    </View>
  );
};
