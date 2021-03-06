import React, { useState, Component } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Utility from "./utility";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    //   marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 60,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 1,
    overflow: "hidden",
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    color: "#000",
    height: 40,
    backgroundColor: "#fff",
    position: "absolute",
    width: "90%",
    marginLeft: "5%",
  },
});
class Search extends Component {
  state = {
    searchKey: "",
  };
  utility;
  constructor(props) {
    super(props);
    this.utility = new Utility();
  }
  render() {
    return (
      <View style={styles.view}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            if (!this.state.searchKey.length) return false;
            this.props.changeText("search=" + this.state.searchKey);
          }}
        >
          <Icon name="magnifying-glass" color="#5694ca" size={24} />
        </TouchableOpacity>
        <TextInput
          placeholder="WHERE ARE YOU GOING?"
          placeholderTextColor="#5694ca"
          style={{
            paddingHorizontal: 10,
            width: "90%",
            height: 40,
            marginLeft: "5%",
            fontWeight: "bold",
            zIndex: 9999,
          }}
          onChangeText={(search) => this.setState({ searchKey: search })}
        />
      </View>
    );
  }
}

export default Search;
