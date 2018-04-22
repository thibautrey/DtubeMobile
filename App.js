import React, { Component } from "react";
import { Platform, StyleSheet, NavigatorIOS, UIManager } from "react-native";
import { COLOR, ThemeProvider, Subheader } from "react-native-material-ui";
import Home from "./Home";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500
  },
  toolbar: {
    container: {
      height: 50
    }
  }
};

export default class App extends Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <NavigatorIOS
          initialRoute={{
            component: Home,
            title: "DTube"
          }}
          style={{ flex: 1 }}
        />
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({});
