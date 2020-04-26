/**
 * FreshKick Expo App
 * https://freshkick.com/Home
 *
 * @flow
 */

import React, { useEffect } from "react";
import Application from "./src/Application";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import useLinking from "./src/navigation/useLinking";

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          /* ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf") */
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
    return null;
  } else {
    return <Application />;
  }
};

export default App;
