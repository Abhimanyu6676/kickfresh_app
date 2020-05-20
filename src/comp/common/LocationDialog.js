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
} from '../../redux/actions/GlobalAction';
import {Dialog} from 'react-native-simple-dialogs';
import {Row} from '../../../assets/components/Layouts';
import GridView from 'react-native-super-grid';
import {server2} from '../../services/REST';
import {EvilIcons} from '@expo/vector-icons';

const window = Dimensions.get('window');
const cities = [
  {
    City: 'Noida',
  },
  {
    City: 'Gurgaon',
  },
  {
    City: 'Delhi',
  },
  {
    City: 'Chennai',
  },
  {
    City: 'Mumbai',
  },
];

export default LocationDialog = (props) => {
  const showLocationDialog = useSelector(
    (state) => state.globalReducer.showLocationDialog,
  );
  const dispatch = useDispatch();

  /* if (!showLocationDialog)
                dispatch(showLocationDialogAction({showLocationDialog: true})); */

  if (Platform.OS == 'ios' || Platform.OS == 'android')
    return (
      <Dialog
        visible={showLocationDialog}
        title=""
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
      <View style={{borderWidth: 0, width: '100%', flexDirection: 'row'}}>
        <Text
          style={{color: '#aaa', fontSize: 18, fontWeight: 'bold', flex: 1}}>
          We currently deliver in
        </Text>
        <TouchableOpacity
          onPress={() => {
            props.dispatch(
              showLocationDialogAction({
                showLocationDialog: false,
              }),
            );
          }}>
          <EvilIcons
            name="close"
            style={{
              color: '#aaa',
              fontWeight: 'bold',
              fontSize: 40,
            }}
          />
        </TouchableOpacity>
      </View>
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
                  props.dispatch(
                    showLocationDialogAction({
                      showLocationDialog: false,
                    }),
                  );
                }}>
                <View
                  style={{
                    borderWidth: 0,
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <Image
                    style={{width: 100, height: 100, alignSelf: 'center'}}
                    source={{
                      uri: server2 + '/CityImages/' + item.item.City + '.png',
                    }}
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
