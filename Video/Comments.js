import React, { Component } from "react";
import { Platform, StyleSheet } from "react-native";
import CommentsBox from "react-native-comments";

export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = { lastCommentUpdate: null };
  }

  extractUsername(c) {
    try {
      return c.user && c.user.username && c.user.username !== ""
        ? JSON.parse(c.user.username)
        : null;
    } catch (e) {
      console.log(e);
    }
  }

  extractBody(c) {
    try {
      return c.body && c.body !== "" ? JSON.parse(c.body) : null;
    } catch (e) {
      console.log(e);
    }
  }

  extractImage(c) {
    try {
      return c.user.image_id && c.user.image_id !== ""
        ? this.config.urls.api_url + "/data/images/users/" + c.user.image_id
        : this.config.urls.api_url + "/data/images/users/no_image.png";
    } catch (e) {
      console.log(e);
    }
  }

  extractChildrenCount(c) {
    try {
      return c.childrenCount || 0;
    } catch (e) {
      console.log(e);
    }
  }

  extractEditTime(item) {
    try {
      return item.updated_at;
    } catch (e) {
      console.log(e);
    }
  }

  extractCreatedTime(item) {
    try {
      return item.created_at;
    } catch (e) {
      console.log(e);
    }
  }

  likeExtractor(item) {
    return item.hasUserLiked;
  }

  reportedExtractor(item) {
    return item.reported;
  }

  likesExtractor(item) {
    return item.likes.map(like => {
      return {
        image:
          this.config.urls.api_url +
          "/data/images/users/" +
          like.user_id +
          "/" +
          like.user.image,
        name: JSON.parse(like.user.name),
        user_id: like.user_id,
        tap: username => {
          this.props.navigator.showModal({
            screen: "M.Profile",
            passProps: { profileUsername: username },
            title: username
          });
        }
      };
    });
  }

  isCommentChild(item) {
    return item.parent !== null;
  }

  render() {
    return (
      <View>
        <CommentsBox
          data={data}
          viewingUserName={null}
          initialDisplayCount={10}
          editMinuteLimit={900}
          childrenPerPage={5}
          lastCommentUpdate={this.state.lastCommentUpdate}
          usernameTapAction={() => {}}
          childPropName={"children"}
          isChild={() => this.isCommentChild(item)}
          keyExtractor={item => item.comment_id}
          usernameExtractor={item => this.extractUsername(item)}
          editTimeExtractor={item => this.extractEditTime(item)}
          createdTimeExtractor={item => this.extractCreatedTime(item)}
          bodyExtractor={item => this.extractBody(item)}
          imageExtractor={item => this.extractImage(item)}
          likeExtractor={item => this.likeExtractor(item)}
          reportedExtractor={item => this.reportedExtractor(item)}
          likesExtractor={item => this.likesExtractor(item)}
          childrenCountExtractor={item => this.extractChildrenCount(item)}
          timestampExtractor={item => item.updated_at}
          replyAction={offset => {
            this.refs.scrollView.scrollTo({
              x: null,
              y: this.scrollIndex + offset - 300,
              animated: true
            });
          }}
          saveAction={(text, parentCommentId) => {
            this.props.actions.save(
              this.props.id,
              text,
              "review",
              parentCommentId
            );
          }}
          editAction={(text, comment) => {
            this.props.actions.edit(this.props.id, comment, text);
          }}
          reportAction={comment =>
            this.props.actions.report(this.props.id, comment)
          }
          likeAction={comment => {
            this.props.actions.like(this.props.id, comment);
          }}
          paginateAction={(from_comment_id, direction, parent_comment_id) => {
            this.props.actions.paginateComments(
              review.review_id,
              "review",
              from_comment_id,
              direction,
              parent_comment_id
            );
            let self = this;
            setTimeout(function() {
              self.refs.scrollView.scrollTo(500);
            }, 3000);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
