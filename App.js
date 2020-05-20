/**
 * FreshKick Expo App
 * https://freshkick.com/Home
 *
 * @flow
 */

import React, {useEffect} from 'react';
import Application from './src/Application';
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import useLinking from './src/navigation/useLinking';
import {View, Text, Image} from 'react-native';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const {getInitialState} = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  //console.disableYellowBox = true;
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 500,
            height: 500,
            alignSelf: 'center',
          }}
          source={require('./assets/loading.gif')}
        />
      </View>
    );
  } else {
    return <Application />;
  }
};

export default App;
