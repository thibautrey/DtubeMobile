import { getSimpleVideoObject, isVideoViewable } from "./helpers";
import { Client } from "dsteem";

const isConnected = false;
const client = new Client("https://api.steemit.com");

const numQuerries = 30;
var querry = {
  limit: numQuerries,
  tag: "dtube"
};

const getTrending = limit => {
  return !isConnected
    ? new Promise(function(resolve, reject) {
        resolve(require("../videoSample.json"));
      })
    : client.database
        .getDiscussions("trending", {
          tag: "dtube",
          limit: limit || 1
        })
        .then(
          discussions => {
            return discussions.map(row => {
              return JSON.parse(row.json_metadata);
            });
          },
          error => {
            console.log("error" + error);
          }
        );
};

export default { getTrending };
