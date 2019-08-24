/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';

export default class LoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={styles.MainContainer}>
        <ImageBackground
          source={require('../Images/LoadingScreen.png')}
          style={styles.BackGroudImage}
        />
      </View>

    );
  } // End of Render();
} // End
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  BackGroudImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  }
});
