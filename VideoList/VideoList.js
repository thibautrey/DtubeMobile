import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, FlatList } from "react-native";
import VideoListRow from "./VideoListRow";

export default class App extends Component {
  renderRow = ({ item }) => {
    const { navigator, ...rest } = this.props;

    return <VideoListRow {...item} {...rest} navigator={navigator} />;
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
            return row.video ? row.video.info.permlink : null;
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
