import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { COLOR, ThemeProvider, Subheader } from "react-native-material-ui";
import { VideoList } from "./VideoList";
import { Feed } from "./api";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trending: [],
      loadingData: true,
      sections: [
        { id: "subscribed", title: "Subscribed Feed" },
        { id: "hot", title: "Hot Videos" },
        { id: "trending", title: "Trending Videos" },
        { id: "new", title: "New Videos" },
        { id: "watchAgain", title: "Watch Again" }
      ]
    };

    this.loadTrending();
  }

  loadTrending = () => {
    const { trending } = this.state;

    Feed.getTrending(5)
      .then(
        discussions => {
          this.setState({ trending: discussions });
        },
        error => {
          console.log("Error: " + error);
        }
      )
      .then(() => {
        this.setState({ loadingData: false });
      });
  };

  renderRow = row => {
    const { trending } = this.state;
    const { navigator } = this.props;

    return (
      <View style={styles.section}>
        <Subheader text={row.item.title} />
        <VideoList data={trending} navigator={navigator} />
      </View>
    );
  };

  render() {
    const { sections, loadingData } = this.state;
    const { renderRow } = this;

    return (
      <View style={styles.container}>
        <Text />
        <FlatList
          refreshing={loadingData}
          data={sections}
          horizontal={false}
          keyExtractor={row => {
            return row.id;
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
    paddingTop: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: "#FAFAFA"
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    paddingBottom: 10
  }
});
