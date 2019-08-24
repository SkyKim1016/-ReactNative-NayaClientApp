import React, { Component } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { Input, Text, Button } from "react-native-elements"; //ReactNative Element UI Framework
import axios from "axios";

import ElementButton from "../../Components/Button";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.loadInitialState().done();
  }

  loadInitialState = async () => {
    var value = await AsyncStorage.getItem("user");
    if (value !== null) {
      this.props.navigation.navigate("SignUp");
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.InputContainer}>
          <View>
            <Text h2> Welcome </Text>
          </View>
          <View style={styles.MarginContainer}>
            <Input
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
            />
            <Input
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.MarginContainer}>
            <Button
              title="Login"
              onPress={this.login}
              buttonStyle={{
                borderRadius: 25,
                backgroundColor: "#AB8F68",
                marginTop: 10,
                width: "100%",
                shadowOpacity: 0.85,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
                shadowColor: "#000",
                elevation: 15,
                alignItems: "center",
                alignContent: "center"
              }}
            />
          </View>

          <View style={styles.SignUpContainer}>
            <ElementButton
              title="Sign Up"
              width="100%"
              color="#AE1303"
              screenMoveto="SignUp"
              // navigation={this.props.navigation} 
            />
          </View>
        </View>

        {/* Button Wrapper */}
        {/* Main Wrapper */}
      </KeyboardAvoidingView>
    );
  } // End of Render();

  login = () => {
    // alert(this.state.username);
    const ServerURL = "http://13.125.177.75:3000/api/user/login";

    var body = {
      email: this.state.email,
      password: this.state.password
    };

    const Config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const encodeForm = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    };
    axios
      .post(ServerURL, encodeForm(body), {
        headers: {
          Accept: "application/json"
        }
      })
      .then(json => {
        // alert('body: ' + JSON.stringify(body));
        // alert('json: ' + JSON.stringify(json.data));
        //alert('phone : ' + JSON.stringify(json.data.phone)  );
        if (JSON.stringify(json.data.success) === "true") {
          AsyncStorage.setItem("user", JSON.stringify(json.data));
          this.props.navigation.navigate("SignUp");
        } else {
          alert("Please have check Email and Password to correctly");
        }
      }) // End of Then
      .catch(error => {
        alert("Occured Error that reason is [ : " + error + " ]");
      })
      .done();
  }; //End of Login Function
} // End of React Class Component

const styles = StyleSheet.create({
  InputContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: "50%",
    marginLeft: "5%",
    marginRight: "5%"
  },
  MarginContainer: {
    marginTop: "5%"
  },
  SignUpContainer: {
    flex: 1,
    // marginLeft: "5%",
    // marginRight: "5%",
    paddingTop: "30%",
    justifyContent: "flex-end"
  }
});
