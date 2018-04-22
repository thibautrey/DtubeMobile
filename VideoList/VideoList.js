import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import VideoListRow from "./VideoListRow";

export default class App extends Component {
  renderRow = ({ item }) => {
    const { navigator } = this.props;

    return <VideoListRow {...item} navigator={navigator} />;
  };

  render() {
    const { renderRow } = this;
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal={true}
          keyExtractor={row => {
            return (
              (row.video ? row.video.info.permlink : row.links[0]) +
              "." +
              new Date().getTime()
            );
          }}
          renderItem={renderRow}
        />
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
