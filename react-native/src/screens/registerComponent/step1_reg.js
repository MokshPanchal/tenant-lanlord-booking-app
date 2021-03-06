import React, { useState, Component, Fragment } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 23,
    paddingVertical: 2,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 3 },
    height: 40,
    shadowRadius: 1,
    overflow: "hidden",
    elevation: 4,
    color: "#000",
    backgroundColor: "#fff",
  },

  radioText: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "left",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 40,
    color: "#5694ca",
  },
  radio: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "center",
    justifyContent: "center",
    color: "#5694ca",
    marginHorizontal: 20,
  },
});
// =====================STYLE_SHEET===========================

class RegisterStep1 extends Component {
  state = {};
  errorLine(field) {
    return (
      <Text style={{ color: "#DC143C", textAlign: "center" }}>
        {this.props.formErrors[field] ? this.props.formErrors[field] : null}
      </Text>
    );
  }
  render() {
    return (
      <ScrollView style={{ paddingBottom: 10 }}>
        <Fragment>
          {this.props.children}
          <View style={styles.view}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(name) =>
                this.props.changeText("user_name", name, "formOneData")
              }
            />
          </View>
          {this.errorLine("user_name_error")}
          <View style={styles.view}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(email) =>
                this.props.changeText("user_email", email, "formOneData")
              }
            />
          </View>
          {this.errorLine("email_error")}
          <View style={styles.view}>
            <TextInput
              placeholder="Phone"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(phone) =>
                this.props.changeText("user_phone", phone, "formOneData")
              }
            />
          </View>
          {this.errorLine("user_phone_error")}
          <View style={{ display: "flex", flexDirection: "row", margin: 20 }}>
            <Text style={styles.radioText}>Are you?</Text>
            {this.props.formdata.userTypes.map((data, key) => {
              return (
                <View key={key} style={styles.radio}>
                  {this.props.formdata.currentUserRole == data?.id ? (
                    <TouchableOpacity accessible={true}>
                      <Image
                        style={{ height: 20, width: 20 }}
                        source={require("../../../assets/selected-radio.png")}
                      />
                      <Text
                        style={{
                          fontFamily: "SemiBold",
                          fontSize: 15,
                          color: "#5694ca",
                        }}
                      >
                        {data?.name}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      accessible={true}
                      onPress={() =>
                        this.props.pressEvent("currentUserRole", data?.id)
                      }
                    >
                      <Image
                        style={{ height: 20, width: 20 }}
                        source={require("../../../assets/unselected-radio.png")}
                      />
                      <Text
                        style={{
                          fontFamily: "SemiBold",
                          fontSize: 15,
                          color: "#5694ca",
                        }}
                      >
                        {data?.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
          <View style={styles.view}>
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(password) =>
                this.props.changeText("user_password", password, "formOneData")
              }
            />
          </View>
          {this.errorLine("password_error")}
          <View style={styles.view}>
            <TextInput
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(cpassword) =>
                this.props.changeText(
                  "user_cpassword",
                  cpassword,
                  "formOneData"
                )
              }
            />
          </View>
          {this.errorLine("cpassword_error")}
        </Fragment>
      </ScrollView>
    );
  }
}

export default RegisterStep1;
