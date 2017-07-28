import React, { PureComponent } from 'react'
import { BackHandler } from 'react-native'

import {
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'

import { connect } from 'dva'

import AppNavigator from './navigation/AppNavigator'

//Expo
import { AppLoading, KeepAwake, Notifications } from 'expo';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';


function getCurrentScreen(navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentScreen(route)
  }
  return route.routeName
}

@connect(({ router }) => ({ router }))
class Router extends PureComponent {
  state = {
    appIsReady: false,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    this._initializeAsync();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
  }

  backHandle = () => {
    const currentScreen = getCurrentScreen(this.props.router)
    if (currentScreen === 'Login') {
      return true
    }
    if (currentScreen !== 'Home') {
      this.props.dispatch(NavigationActions.back())
      return true
    }
    return false
  }

  async _initializeAsync() {
    try {
      await Promise.all([
        cacheAssetsAsync({
          //images: Images.forLocalCache,
          images: [
            require('./assets/ba/bell.png'),
            require('./assets/ba/giphy.gif'),
            require('./assets/dva/house.png'),
            require('./assets/dva/person.png'),
          ],
          fonts: [
            // Ionicons.font,
            {
              'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
            },
            {
              'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
            },
            {
              'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
            },
            {
              'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
            },
            {
              'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
            },
          ],
        }),
      ]);
    } catch (e) {
      //Sentry.captureException(e);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    const { dispatch, router } = this.props
    const navigation = addNavigationHelpers({ dispatch, state: router })

    if (this.state.appIsReady) {
      return (
        <AppNavigator navigation={navigation} />
      )
    } else {
      return <AppLoading />;
    }

  }
}

export function routerReducer(state, action = {}) {
  return AppNavigator.router.getStateForAction(action, state)
}

export default Router
