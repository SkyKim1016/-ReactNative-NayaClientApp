import React from 'react';
import { createStackNavigator, createAppContainer,createSwitchNavigator } from 'react-navigation';

import LoginScreen from './Screens/Login/LoginScreen';
import SignupScreen from './Screens/SignUp/SignupScreen';
import LoadingScreen from './Screens/LoadingScreen';
import SearchAddress from './Screens/SignUp/AddressMap/SearchAddress';

const AppNavigator = createStackNavigator(
  {
    Home: { screen: LoginScreen },
    SignUp: { screen: SignupScreen },
    SearchAddress: { screen: SearchAddress }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator); //Screen Nvigation Container

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  } //Loading Screen State

  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve("result");
      }, 2000)
    );
  }; //Loading Screen SetTimeOut

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({ isLoading: false }); 
      // isLoading state is false than will remove the Loading screen renders the application itself.
    }//Loading State Callback Function
  } 

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    return <AppContainer />;
  }
}
