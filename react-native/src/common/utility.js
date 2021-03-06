import React, { Component } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const amountRegex = /^\d+(\.\d{1,2})?$/;
const passLength = 5;
const zipcodeLength = 6;
const invalidResponseRegex = /^[4-5][0-9][0-9]$/;
const stateList = ["Ahmedabad", "Surat", "Baroda"];
class Utility extends Component {
  state = { apiUrl: null };
  constructor() {
    super();
    if (!this.state.apiUrl) {
      this.getValue("api_url").then((url) => {
        this.state = { apiUrl: JSON.parse(url) + "/" };
      });
    }
  }
  getApiUrl() {
    return this.state.apiUrl;
  }
  async setValue(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error("Storage set error ", e);
    }
  }
  getValue(key) {
    try {
      const value = AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.error("Storage get error ", e);
    }
  }
  async removeValue(key) {
    try {
      const value = await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Storage remove item error ", e);
    }
  }
  async clearAllValues() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Storage clear error ", e);
    }
  }
  validate(fieldType, fieldValue = "") {
    let isValid = false;
    switch (fieldType) {
      case "email": {
        isValid = emailRegex.test(fieldValue);
        break;
      }
      case "password": {
        isValid = fieldValue.length >= passLength;
        break;
      }
      case "amount": {
        isValid = amountRegex.test(fieldValue);
        break;
      }
      case "zipcode": {
        isValid = fieldValue.length == zipcodeLength;
        break;
      }
    }
    return isValid;
  }
  async makePostRequest(path, data) {
    // creates entity
    try {
      const apiResponse = await fetch(this.getApiUrl() + path, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await apiResponse.json();

      if (invalidResponseRegex.test(apiResponse.status)) {
        let errors = Object.values(response.errors).join();
        this.showAlert("Error Occured!", errors);
        return false;
      }
      return response;
    } catch (error) {
      this.showAlert();
    }
  }
  async makePutRequest(path, data) {
    // creates entity
    try {
      const apiResponse = await fetch(this.getApiUrl() + path, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await apiResponse.json();

      if (invalidResponseRegex.test(apiResponse.status)) {
        let errors = Object.values(response.errors).join();
        this.showAlert("Error Occured!", errors);
        return false;
      }
      return response;
    } catch (error) {
      this.showAlert();
    }
  }
  async makeGetRequest(path) {
    // get entity
    try {
      const response = await fetch(this.getApiUrl() + path, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      });
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      this.showAlert();
    }
  }
  showAlert(
    title = "Error Occured!",
    message = "Error occured while api request, please try again later!",
    options = [{ text: "OK" }]
  ) {
    Alert.alert(title, message, options);
  }
}
export default Utility;
