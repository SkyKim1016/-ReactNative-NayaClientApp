import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  YellowBox,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { Input, Text, Icon, Button } from "react-native-elements"; //ReactNative Element UI Framework

import TextEditor from './TextEditor';
import ElementButton from '../../Components/Button';
import axios from 'axios';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      businessType: "INDIVIDUAL",
      intro: "",
      tags: "MerryHoliday"
    };
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View style={styles.Container}>
          <View>
            <Text h4> Naya Partner Sign Up </Text>
          </View>

          <View style={styles.TextContainer}>
            <View>
              <Text style={styles.TitleText}> 주소 </Text>
            </View>
            <View>
              <Input
                textAlign={"center"}
                placeholder=" Please search to your address"
                style={styles.AddressInput}
                onChangeText={address => this.setState({ address })}
                rightIcon={
                  <Icon
                    name="search"
                    type="font-awesome"
                    color="black"
                    onPress={() =>
                      this.props.navigation.navigate('SearchAddress')
                    }
                    style={styles.AddressIcon}
                  />
                }
              />
            </View>
          </View>

          <View style={styles.TextContainer}>
            <View>
              <Text style={styles.TitleText}>파트너</Text>
            </View>
            <View style={styles.PartnerContainer}>
              <Button
                title="개인파트너"
                buttonStyle={
                  this.state.businessType === 'INDIVIDUAL'
                    ? styles.individualPartnerButton
                    : styles.companyPartnerButton
                }
                titleStyle={
                  this.state.businessType === 'INDIVIDUAL'
                    ? styles.individualPartnerText
                    : styles.companyPartnerText
                }
                onPress={() => this.setState({ businessType: 'INDIVIDUAL' })}
              />
              <Button
                title="사업자파트너"
                type="clear"
                buttonStyle={
                  this.state.businessType === 'INDIVIDUAL'
                    ? styles.companyPartnerButton
                    : styles.individualPartnerButton
                }
                titleStyle={
                  this.state.businessType === 'INDIVIDUAL'
                    ? styles.companyPartnerText
                    : styles.individualPartnerText
                }
                onPress={() => this.setState({ businessType: 'COMPANY' })}
              />
            </View>
            <View style={{ marginTop: "6%" }}>
              <Text style={styles.RedExplainText}>
                일반 파트너로 가입되며 인증파트너 등록시 더 많은 혜택이
                주어집니다.
              </Text>
            </View>
          </View>

          <View style={{ marginTop: "10%", flex: 1 }}>
            <View>
              <Text style={styles.TitleText}> 파트너 소개 </Text>
            </View>
            <View style={{ marginTop: "5%" }}>
              <TextInput
                style={styles.TextInput}
                onChangeText={intro => this.setState({ intro })}
              >
                파트너 소개글을 작성해 주세요
              </TextInput>
              <View style={{ marginTop: "5%" }}>
                <Text style={styles.BottomAgreeText}>
                  가입완료 시 위치기반 서비스에 자동적으로 동의하는 것으로
                  간주합니다.
                </Text>
              </View>

              <View style={styles.BottomButtonContainer}>
                <ElementButton
                  title="Continue"
                  width={300}
                  color="#AB8F68"
                  screenMoveto="SearchAddress"
                  // navigation={this.props.navigation}
                />
                {/* <Button
                  title="Test data to Srver"
                  onPress={this.axiosToServer}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  } // End of Render();

  axiosToServer = () => {
    // alert(this.state.username);
    const ServerURL = 'http://13.125.177.75:3000/api/user/partner';

    var body = {
      address: this.state.address,
      businessType: this.state.businessType,
      intro: this.state.intro,
      tags: this.state.tags
    };

    const Config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "x-access-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNDI3ODM0ODVhYzhiYmQ4NmRmNDhmMSIsImlhdCI6MTU2NDg5MjM0NywiZXhwIjoxNTY3NDg0MzQ3fQ.TetuuAiMs36f8ybkVuipgdhdufYeBgvZR2j9tYg7n0c"
      }
    };

    const encodeForm = data => {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        )
        .join('&');
    };
    axios
      .post(ServerURL, encodeForm(body), Config)
      .then(json => {
        // alert('body: ' + JSON.stringify(body));
        // alert('json: ' + JSON.stringify(json.data));
        //alert('phone : ' + JSON.stringify(json.data.phone)  );
        if (JSON.stringify(json.data.success) === 'true') {
          // AsyncStorage.setItem("address", JSON.stringify(json.data.address));
          this.props.navigation.navigate('Home');
        } else {
          alert(
            `Json Status :  ${JSON.stringify(
              json.data.status
            )} / Message : ${JSON.stringify(json.data.message)}`
          );
        }
      }) // End of Then
      .catch(error => {
        alert('Occured Error that reason is [ : ' + error + ' ]');
      })
      .done();
  }; //End of AxiosToServer Function
} // End of React Component

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: '7%',
    marginLeft: '7%',
    marginRight: '7%',
  },
  TextContainer: {
    marginTop: '8%',
  },
  PartnerContainer: {
    flexDirection: 'row',
  },
  individualPartnerButton: {
    borderRadius: 25,
    backgroundColor: "#AB8F68",
    marginTop: 10,
    width: "85%",
    shadowOpacity: 0.85,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    elevation: 15
  },
  companyPartnerButton: {
    marginTop: 10,
    width: "85%",
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  individualPartnerText: {
    fontWeight: '900',
    fontSize: 15,
    color: '#FFFFFF',
  },
  companyPartnerText: {
    fontWeight: '900',
    fontSize: 15,
    color: 'rgb(136,136,136)',
  },
  TitleText: {
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 16,
  },
  RedExplainText: {
    fontWeight: '900',
    fontSize: 12,
    color: '#d60a0c',
  },
  TextInput: {
    height: '60%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "#bfb393",
    fontFamily: 'NotoSansCJKkr',
    fontSize: 13,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#bfb393',
    textAlignVertical: "top"
  },
  BottomAgreeText: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 12,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: '#727272',
  },
  BottomButtonContainer: {
    marginTop: "5%",
    marginLeft: "7%",
    marginRight: "7%",
    alignItems: "center",
    justifyContent: "center"
  }
});
