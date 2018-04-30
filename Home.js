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
      hot: [],
      newTopic: [],
      loadingTrending: true,
      loadingHot: true,
      loadingNew: true,
      sections: [
        //{ id: "subscribed", title: "Subscribed Feed" },
        { id: "hot", title: "Hot Videos" },
        { id: "trending", title: "Trending Videos" },
        { id: "new", title: "New Videos" }
        //{ id: "watchAgain", title: "Watch Again" }
      ]
    };

    this.loadTrending();
    this.loadHot();
    this.loadNew();
  }

  loadTrending = () => {
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
        this.setState({ loadingTrending: false });
      });
  };

  loadHot = () => {
    Feed.getHot(5)
      .then(
        discussions => {
          this.setState({ hot: discussions });
        },
        error => {
          console.log("Error: " + error);
        }
      )
      .then(() => {
        this.setState({ loadingHot: false });
      });
  };

  loadNew = () => {
    Feed.getNew(5)
      .then(
        discussions => {
          this.setState({ newTopic: discussions });
        },
        error => {
          console.log("Error: " + error);
        }
      )
      .then(() => {
        this.setState({ loadingHot: false });
      });
  };

  renderRow = row => {
    const { trending, hot, newTopic } = this.state;
    const { navigator, ...rest } = this.props;
    var data;

    switch (row.item.id) {
      case "trending":
        data = trending;
        break;

      case "new":
        data = newTopic;
        break;

      case "hot":
        data = hot;
        break;

      default:
        data = trending;
    }

    return (
      <View style={styles.section}>
        <Subheader text={row.item.title} />
        <VideoList data={data} navigator={navigator} {...rest} />
      </View>
    );
  };

  render() {
    const { sections, loadingTrending, loadingHot, loadingNew } = this.state;
    const { renderRow } = this;

    return (
      <View style={styles.container}>
        <Text />
        <FlatList
          refreshing={loadingTrending || loadingHot}
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
