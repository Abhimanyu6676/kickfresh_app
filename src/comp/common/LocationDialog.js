import React, {useState} from 'react';
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
  regionAction,
} from '../../redux/actions/GlobalAction';
import {Dialog} from 'react-native-simple-dialogs';
import {Row} from '../../../assets/components/Layouts';
import GridView from 'react-native-super-grid';
import {server2} from '../../services/REST';
import {EvilIcons} from '@expo/vector-icons';
import {useQuery, useMutation} from '@apollo/react-hooks';

const window = Dimensions.get('window');

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
  const [showRegions, setShowRegions] = useState(false);
  const {loading, error, data} = useQuery(gql_getLocations);
  const [currLoc, setCurrLoc] = useState(null);
  return (
    <View
      style={[
        ComStyles._Dialog,
        window.width < 500 ? MobStyles._Dialog : PcStyles._Dialog,
      ]}>
      <View style={{borderWidth: 0, width: '100%', flexDirection: 'row'}}>
        <Text
          style={{color: '#aaa', fontSize: 18, fontWeight: 'bold', flex: 1}}>
          {data && data.allLocations.length > 0
            ? showRegions
              ? 'Select Your Region'
              : 'We currently deliver in'
            : loading
            ? 'Loading...'
            : error
            ? 'Error While fetching data'
            : '...'}
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
        {!showRegions &&
          data &&
          !loading &&
          !error &&
          data.allLocations.length > 0 && (
            <View style={{borderWidth: 0, width: '100%', alignItems: 'center'}}>
              <GridView
                itemDimension={120}
                spacing={20}
                items={data.allLocations}
                renderItem={(item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item.item.Location);
                      props.dispatch(
                        cityAction({currentLocation: item.item.Location}),
                      );
                      setCurrLoc(item.item);
                      console.log(
                        'regions in area = ' + item.item.Region.length,
                      );
                      if (item.item.Region.length > 0) {
                        setShowRegions(true);
                      } else {
                        props.dispatch(
                          showLocationDialogAction({
                            showLocationDialog: false,
                          }),
                        );
                      }
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
                          uri:
                            server2 +
                            '/CityImages/' +
                            item.item.Location +
                            '.png',
                        }}
                      />
                      <Text
                        style={{
                          color: '#aaa',
                          marginTop: 10,
                          fontSize: 18,
                          alignSelf: 'center',
                        }}>
                        {item.item.Location}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        {error && (
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#25c165'}}>
              Error While fetching Data
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#25c165'}}>
              This might be because of network error, plaese try later
            </Text>
          </View>
        )}
        {showRegions &&
          data &&
          data.allLocations.length > 0 &&
          currLoc != null && <Region loc={currLoc} dispatch={props.dispatch} />}
      </Row>
    </View>
  );
};

const Region = (props) => {
  console.log('location = ');
  console.log(props.loc);
  return (
    <View style={{borderWidth: 0, width: '100%', alignItems: 'center'}}>
      <GridView
        itemDimension={120}
        spacing={20}
        items={props.loc.Region}
        renderItem={(item, index) => (
          <TouchableOpacity
            onPress={() => {
              console.log(item.item.Region);
              props.dispatch(regionAction({currentRegion: item.item.Region}));
              //setShowRegions(false);
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
                  uri: server2 + '/CityImages/' + props.loc.Location + '.png',
                }}
              />
              <Text
                style={{
                  color: '#aaa',
                  marginTop: 10,
                  fontSize: 18,
                  alignSelf: 'center',
                }}>
                {item.item.Region}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

import {StyleSheet} from 'react-native';
import {gql_getLocations} from '../../services/gqls';

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
