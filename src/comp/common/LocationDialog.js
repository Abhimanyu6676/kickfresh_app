import React from 'react';
import {
  Modal,
  View,
  Platform,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  cityAction,
  showLocationDialogAction,
} from '../../redux/actions/LocationAction';
import {Dialog} from 'react-native-simple-dialogs';
import {Row} from '../../../assets/components/Layouts';
import GridView from 'react-native-super-grid';

const window = Dimensions.get('window');
const cities = [
  {
    City: 'Noida',
  },
  {
    City: 'Bengaluru',
  },
  {
    City: 'Mumbai',
  },
  {
    City: 'Hyderabad',
  },
  {
    City: 'Kolkata',
  },
];

export default LocationDialog = (props) => {
  const showLocationDialog = useSelector(
    (state) => state.locationReducer.showLocationDialog,
  );
  const dispatch = useDispatch();

  /* if (!showLocationDialog)
                dispatch(showLocationDialogAction({showLocationDialog: true})); */

  if (Platform.OS == 'ios' || Platform.OS == 'android')
    return (
      <Dialog
        visible={showLocationDialog}
        title="Select Location"
        dialogStyle={[
          ComStyles.Dialog,
          window.width < 500 ? MobStyles.Dialog : PcStyles.Dialog,
        ]}
        onTouchOutside={() => {
          if (showLocationDialog)
            dispatch(
              showLocationDialogAction({
                showLocationDialog: false,
              }),
            );
        }}>
        <_Dialog dispatch={dispatch} />
      </Dialog>
    );
  else
    return (
      <Modal
        animationType="slide"
        transparent={true}
        presentationStyle="overFullScreen"
        style={{margin: 50, width: '90%', alignSelf: 'center', borderWidth: 0}}
        visible={showLocationDialog}>
        <_Dialog dispatch={dispatch} />
      </Modal>
    );
};

const _Dialog = (props) => {
  return (
    <View
      style={[
        ComStyles._Dialog,
        window.width < 500 ? MobStyles._Dialog : PcStyles._Dialog,
      ]}>
      <Row>
        <Text style={{color: '#aaa', fontSize: 18, fontWeight: 'bold'}}>
          We currently deliver in
        </Text>
      </Row>
      <Row>
        <View style={{borderWidth: 0, width: '100%', alignItems: 'center'}}>
          <GridView
            itemDimension={120}
            spacing={20}
            items={cities}
            renderItem={(item, index) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(item.item.City);
                  props.dispatch(cityAction({currentLocation: item.item.City}));
                }}>
                <View
                  style={{
                    borderWidth: 0,
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Image
                    style={{width: 100, height: 100, alignSelf: 'center'}}
                    source={require('../../../assets/city.jpg')}
                  />
                  <Text
                    style={{
                      color: '#aaa',
                      marginTop: 10,
                      fontSize: 18,
                      alignSelf: 'center',
                    }}>
                    {item.item.City}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Row>
    </View>
  );
};

import {StyleSheet} from 'react-native';

const ComStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  Dialog: {backgroundColor: '#fff'},
  _Dialog: {
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
});

const MobStyles = StyleSheet.create({
  container: {},
  Dialog: {},
  _Dialog: {},
});

const TabStyles = StyleSheet.create({
  container: {},
  Dialog: {},
  _Dialog: {},
});

const PcStyles = StyleSheet.create({
  container: {},
  Dialog: {},
  _Dialog: {},
});
