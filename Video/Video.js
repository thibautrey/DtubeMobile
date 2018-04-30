import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Hyperlink from "react-native-hyperlink";
import VideoPlayer from "react-native-af-video-player";
import Comments from "./Comments";

export default class Video extends Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  render() {
    const { video, navigator, toggleNavigationBar } = this.props;

    return (
      <ScrollView
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={true}
      >
        <View style={styles.VideoContainer}>
          <VideoPlayer
            autoPlay
            rotateToFullScreen
            playInBackground
            playWhenInactive
            scrollBounce={false}
            onFullScreen={() => {
              toggleNavigationBar();
            }}
            url={"https://ipfs.io/ipfs/" + video.content.videohash}
          />
        </View>
        <View style={styles.DetailsContainer}>
          <Text>{video.info.title}</Text>
          <Text>{video.info.author}</Text>
          <Hyperlink linkDefault={true}>
            <Text style={styles.description}>{video.content.description}</Text>
          </Hyperlink>
          <Comments />
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
  VideoContainer: {},
  DetailsContainer: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  description: {
    height: 200,
    overflow: "hidden"
  }
});
