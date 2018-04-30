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
  constructor(props) {
    super(props);

    this.state = {
      navigationBarHidden: false
    };
  }

  toggleNavigationBar = () => {
    this.setState({ navigationBarHidden: !this.state.navigationBarHidden });
  };

  render() {
    const { navigationBarHidden } = this.state;
    const { toggleNavigationBar } = this;

    return (
      <ThemeProvider uiTheme={uiTheme}>
        <NavigatorIOS
          initialRoute={{
            component: Home,
            title: "DTube",
            navigationBarHidden: navigationBarHidden,
            passProps: { toggleNavigationBar: toggleNavigationBar }
          }}
          style={{ flex: 1 }}
        />
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({});
