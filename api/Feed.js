import { getSimpleVideoObject, isVideoViewable } from "./helpers";
import Promise from "promise";
const steem = require("steem");

steem.api.setOptions({
  url: "https://api.steemit.com"
});
const numQuerries = 30;
var querry = {
  limit: numQuerries,
  tag: "dtube"
};

const getTrending = () => {
  return new Promise(function(resolve, reject) {
    steem.api.getDiscussionsByTrending(querry, function(err, r) {
      var videos = [];
      for (var key in r) {
        if (isVideoViewable(r[key])) {
          videos.push(getSimpleVideoObject(r[key]));
        }
      }
      resolve(videos);
    });
  });
};

export { getTrending };
