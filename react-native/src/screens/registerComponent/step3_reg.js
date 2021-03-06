import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  StyleSheet,
  ViewBase,
} from "react-native";

// =====================STYLE_SHEET===========================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    flex: 1,
  },
  view: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 0,
    marginTop: 15,
    paddingHorizontal: 10,
    // borderColor: "#5694ca",
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

  viewOne: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 55,
    marginTop: 15,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 23,
    paddingVertical: 2,
    zIndex: 1,
  },

  radioText: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 55,
    color: "#5694ca",
  },
  radio: {
    fontSize: 15,
    fontFamily: "SemiBold",
    textAlign: "right",
    color: "#5694ca",
    marginHorizontal: 20,
  },
});
// =====================STYLE_SHEET===========================

class RegisterStep3 extends Component {
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
      <ScrollView>
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text style={styles.radioText}>Initial Contract Length:</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                marginLeft: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.props.formdata.contractLength.map((data, key) => {
                return (
                  <View key={key} style={styles.radio}>
                    {this.props.formdata.selectedContractLength == data ? (
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
                          {data} months
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        accessible={true}
                        onPress={() =>
                          this.props.pressEvent("selectedContractLength", data)
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
                          {data} months
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="Security Deposit (e.g. 50000)"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(deposit) =>
                this.props.changeText(
                  "security_deposit",
                  deposit,
                  "formThreeData"
                )
              }
            />
          </View>
          {this.errorLine("deposit_error")}
          <View style={styles.view}>
            <TextInput
              placeholder="Per month rent (e.g. 2000)"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(monthlyRent) =>
                this.props.changeText(
                  "monthly_rent",
                  monthlyRent,
                  "formThreeData"
                )
              }
            />
          </View>
          {this.errorLine("rent_error")}
          <View style={styles.view}>
            <TextInput
              placeholder="Percentage increase (annual) (e.g. 2)"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(percentIncr) =>
                this.props.changeText(
                  "percent_increase",
                  percentIncr,
                  "formThreeData"
                )
              }
            />
          </View>
          {this.errorLine("percent_error")}
          <View style={styles.view}>
            <TextInput
              placeholder="Member Space (e.g. 4)"
              keyboardType="phone-pad"
              placeholderTextColor="#5694ca"
              style={{ paddingHorizontal: 10, width: "100%" }}
              onChangeText={(member) =>
                this.props.changeText("member_space", member, "formThreeData")
              }
            />
          </View>
          {this.errorLine("member_error")}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 20,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Text style={styles.radioText}>Current Property status</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 20,
                marginLeft: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {this.props.formdata.propertyStatus.map((data, key) => {
                return (
                  <View key={key} style={styles.radio}>
                    {this.props.formdata.currentPropertyStatus == data ? (
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
                          {data}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        accessible={true}
                        onPress={() =>
                          this.props.pressEvent("currentPropertyStatus", data)
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
                          {data}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </>
      </ScrollView>
    );
  }
}

export default RegisterStep3;
