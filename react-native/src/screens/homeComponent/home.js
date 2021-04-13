import React, { useState, Component } from "react";
import { Text, View, Image, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Entypo";
import Utility from "../../common/utility";

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    //   marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 30,
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
  property: {
    height: "70%",
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  main: {
    backgroundColor: "#fff",
    width: "70%",
    display: "flex",
    maxHeight: "20%",
    flex: 1,
    flexDirection: "row",
    marginTop: "5%",
  },

  footer: {
    minHeight: "40",
    width: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: "#000",
    shadowRadius: 2,
    overflow: "hidden",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -3 },
    elevation: 4,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
  },
});
// =====================STYLE_SHEET===========================

class home extends React.Component {
  utility;
  state = {
    user: {},
    search: "",
  };

  constructor() {
    super();
    this.utility = new Utility();
  }
  componentDidMount() {
    this.utility.getValue("user").then((user) => {
      this.setState({ user: JSON.parse(user) });
      console.log("user in home", JSON.parse(user));
    });
  }
  render() {
    const { search } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={{ backgroundColor: "#FFF" ,height: "100%", flex: 1 }}>
        <Text style={{ textAlign: "center", fontWeight: "bold", letterSpacing: 1.5, fontFamily:"Calibri"}}>Get the latest on covid-19 responses</Text>

        <Image
          source={require("../../../assets/home_back.jpg")}
          style={{ width: "100%", height: "40%", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
        />
        <View style={styles.view}>
          <Icon name="magnifying-glass" color="#5694ca" size={24} />
          <TextInput
            placeholder="WHERE ARE YOU GOING?"
            placeholderTextColor="#5694ca"
            style={{
              paddingHorizontal: 10,
              width: "90%",
              height: "40px",
              marginLeft: "5%",
              fontWeight: "bold"
            }}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/1.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Ahmedabad</Text>
          </View>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/2.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Surat</Text>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/1.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Ahmedabad</Text>
          </View>
          <View style={styles.property}>
            <Image
              source={require("../../../assets/2.jpg")}
              style={{ width: "50%", height: "100%", borderRadius: "15px" }}
            />
            <Text>Surat</Text>
          </View>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity activeOpacity = { .5 } onPress={() => navigate("Home")}>
            <Image
              source={require("../../../assets/search_active.png")}
              style={{ width: "50px", height: "50px" }}
            />
            </TouchableOpacity> 
            <TouchableOpacity activeOpacity = { .5 } onPress={() => navigate("PropertyListing")}>
            <Image
              source={require("../../../assets/book.png")}
              style={{ width: "50px", height: "50px" }}
            />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity = { .5 } onPress={() => navigate("Profile")}>
              <Image
                source={require("../../../assets/user.png")}
                style={{ width: "50px", height: "50px" }}
              />
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default home;