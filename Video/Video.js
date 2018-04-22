import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default class Video extends Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  render() {
    const { video } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={true}
      >
        <View style={styles.VideoContainer} />
        <View style={styles.DetailsContainer}>
          <Text>{video.info.title}</Text>
          <Text>{video.info.author}</Text>
          <Text style={styles.description}>{video.content.description}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 64
  },
  VideoContainer: {
    width: "100%",
    height: 200
  },
  DetailsContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  description: {
    height: 200,
    overflow: "hidden"
  }
});
