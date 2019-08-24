import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'; //ReactNative Element UI Framework
import { withNavigation } from 'react-navigation';

class ElementButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //   const { navigation } = this.props.navigation.navigate("SignUp");
    return (
      <Button
        title={this.props.title}
        onPress={
          this.props.screenMoveto
            ? () => this.props.navigation.navigate(this.props.screenMoveto)
            : ""
        }
        buttonStyle={{
          borderRadius: 25,
          backgroundColor: this.props.color,
          marginTop: 10,
          width: this.props.width,
          shadowOpacity: 0.85,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
          shadowColor: '#000',
          elevation: 15,
          alignItems: 'center',
          alignContent: 'center',
        }}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   Button: {
//   },
// });

export default withNavigation(ElementButton);
