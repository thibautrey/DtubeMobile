import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight
} from "react-native";
import { Video } from "../Video";

export default class App extends Component {
  goToVideo = () => {
    const { video, navigator, toggleNavigationBar } = this.props;

    navigator.push({
      title: video.info.title,
      component: Video,
      passProps: { video: video, toggleNavigationBar: toggleNavigationBar }
    });
  };

  render() {
    const { video, image } = this.props;

    return (
      <TouchableHighlight
        underlayColor={"white"}
        onPress={() => this.goToVideo()}
      >
        <View style={styles.container}>
          {video ? (
            video.info ? (
              <View>
                <View>
                  <Image
                    style={styles.imageTitle}
                    source={{
                      uri: "https://ipfs.io/ipfs/" + video.info.snaphash
                    }}
                  />
                  <Text style={styles.durationblock}>
                    {Math.round(video.info.duration / 60) +
                      ":" +
                      Math.round(video.info.duration % 60)}
                  </Text>
                </View>
                <Text style={styles.titleVideo}>{video.info.title}</Text>
                <Text style={styles.author}>{video.info.author}</Text>
              </View>
            ) : null
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 10,
    borderWidth: 0,
    borderColor: "black"
  },
  titleVideo: {
    width: 200,
    height: 40,
    overflow: "hidden"
  },
  author: {
    color: "#707070"
  },
  imageTitle: {
    width: 200,
    height: 120,
    borderWidth: 0,
    borderColor: "black"
  },
  durationblock: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.9)",
    padding: 3,
    color: "white",
    bottom: 2,
    right: 2
  }
});
