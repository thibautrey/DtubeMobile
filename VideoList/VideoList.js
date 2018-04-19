import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem } from "react-native-material-ui";
import { Feed } from "../api";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <FlatList>
          <ListItem divider onPress={() => {}}>
            <Text>Test</Text>
          </ListItem>
        </FlatList>
      </View>
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
