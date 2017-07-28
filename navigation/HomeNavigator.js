import React, { PureComponent } from 'react'

import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'

import Home from '../containers/Home'
import Account from '../containers/Account'

export default HomeNavigator = TabNavigator(
  {
    Home: { screen: Home },
    Account: { screen: Account },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazyLoad: true,
  }
)
