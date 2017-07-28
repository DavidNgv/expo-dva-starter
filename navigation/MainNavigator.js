import React, { PureComponent } from 'react'

import {
  StackNavigator,
  TabNavigator,
  TabBarBottom,
  addNavigationHelpers,
  NavigationActions,
} from 'react-navigation'

import HomeNavigator from './HomeNavigator'
import Detail from '../containers/Detail'

export default MainNavigator = StackNavigator(
  {
    HomeNavigator: { screen: HomeNavigator },
    Detail: { screen: Detail },
  },
  {
    headerMode: 'float',
  }
)
