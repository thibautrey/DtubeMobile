const getSimpleVideoObject = r => {
  var metadata = JSON.parse(r.json_metadata);
  var video = new Object();
  video.username = r.author;
  video.title = r.title;
  var pendingValue = parseFloat(
    r.pending_payout_value.substring(0, r.pending_payout_value.indexOf(" "))
  );
  var payoutValue = parseFloat(
    r.total_payout_value.substring(0, r.total_payout_value.indexOf(" "))
  );
  var curatorValue = parseFloat(
    r.curator_payout_value.substring(0, r.curator_payout_value.indexOf(" "))
  );
  var totalPrice = pendingValue + payoutValue + curatorValue;
  totalPrice = totalPrice.toFixed(3);
  //video.price = r.pending_payout_value;
  //video.price = video.price.substring(0,video.price.indexOf(" "));
  video.price = "$" + totalPrice;
  video.permlink = r.permlink;
  video.date = r.created;
  if (
    metadata &&
    metadata.video &&
    metadata.video.content &&
    metadata.video.info
  ) {
    video.snaphash = metadata.video.info.snaphash;
    video.hash = metadata.video.content.videohash;
  }
  return video;
};

const isVideoViewable = r => {
  //dtube permalinks are length 8
  if (r.permlink.length == 8) {
    var metadata = JSON.parse(r.json_metadata);
    if (
      metadata &&
      metadata.video &&
      metadata.video.content &&
      metadata.video.info
    ) {
      if (
        !metadata.tags.includes("nsfw") &&
        !metadata.tags.includes("dtube-NSFW") &&
        !metadata.tags.includes("NSFW")
      ) {
        //blacklisted accounts with inappropriate content
        var BLACKLIST = [
          "aroused",
          "godfather123",
          "arabebtc",
          "elibella",
          "anarchyandporn"
        ];
        if (!BLACKLIST.includes(r.author)) {
          //check if video was downvoted by cheetah.
          //cheetah detects improper content posted on steem
          for (voteIndex in r.active_votes) {
            vote = r.active_votes[voteIndex];
            if (vote.voter == "cheetah" && vote.percent < 0) {
              console.log("blocked video by cheetah");
              return false;
            }
          }
          return true;
        }
      }
    }
  }
  return false;
};

export { isVideoViewable, getSimpleVideoObject };
