import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

import MapView from "react-native-maps";

import { Input, Icon, SearchBar } from "react-native-elements";

export default class SearchAddress extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.mainWrapper}>
        <View>
          <Text style={styles.titleText}> Select Location </Text>
        </View>
        <View style={styles.searchAddressWrapper}>
          <Input
            inputContainerStyle={styles.searchInputStyle}
            placeholder="  지역을 선택하세요"
            onPress={() => this.openSearchModal()}
            leftIcon={
              <Icon
                name="search"
                type="font-awesome"
                color="black"
                onPress={() => this.openSearchModal()}
                style={styles.AddressIcon}
              />
            }
          />
          {/* <Input
            inputContainerStyle={styles.searchInputStyle}
            placeholder=" 상세 주소를 입력해주세요"
            
          /> */}
        </View>
        <View style={styles.searchAddressWrapper}>
          <MapView style={{width:"100%", height:"80%"}}></MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    marginTop: "7%",
    marginLeft: "7%",
    marginRight: "7%"
  },
  titleText: {
    fontFamily: 'NotoSansCJKkr',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#000000',
  },
  searchInputStyle: {
    width: "100%",
    height: 50,
    borderRadius: 22,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(191, 191, 191)',
    justifyContent: "center",
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor:"transparent"
  },
  searchAddressWrapper: {
    marginTop: '10%'
  },
  map: {
    flex: 1,
    height: 400,
    marginTop: 80,
  },
});
