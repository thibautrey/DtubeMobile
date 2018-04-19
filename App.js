import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, UIManager } from "react-native";
import { COLOR, ThemeProvider } from "react-native-material-ui";
import { VideoList } from "./VideoList";

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

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <VideoList />
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
