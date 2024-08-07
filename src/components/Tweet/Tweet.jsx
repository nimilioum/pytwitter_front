import React, { useEffect, useReducer } from "react";
import ThreeDotsIcon from "../../icons/ThreeDotsIcon";
import CommentIcon from "./../../icons/CommentIcon";
import RetweetIcon from "./../../icons/RetweetIcon";
import ShareIcon from "./../../icons/ShareIcon";
import TextButton from "./../Button/TextButton/TextButton";
import useComponentVisible from "./../../CustomHooks/useComponentVisible";
import classNames from "classnames";
import Linkify from "linkify-react";
import "linkify-plugin-hashtag";
import "linkify-plugin-mention";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { SET_TWEET_TYPE } from "../../store/model/modelSlice";
import {
  deleteTheRetweet,
  likeTheTweet,
  unlikeTheTweet,
  postTheRetweet,
  bookmarkTweet,
  removeBookmarkTweet,
} from "../../services/tweetService";
import TweetOptions from "../Options/TweetOptions";
import tweetReducer, {
  initialState,
  FETCHING_TWEET_SUCCESS,
  TWEET_LIKED_SUCCESS,
  TWEET_LIKED_FAILED,
  TWEET_RETWEETED_SUCCESS,
  TWEET_RETWEETED_FAILED,
  TWEET_BOOKMARK_SUCCESS,
  TWEET_BOOKMARK_FAILED,
  TWEET_REMOVEBOOKMARK_SUCCESS,
  TWEET_REMOVEBOOKMARK_FAILED,
} from "../../store/Tweet/tweetSlice";
import cogoToast from "cogo-toast";
import Video from "../../subcomponents/Video";
import { AnimatePresence, motion } from "framer-motion";
const linkProps = {
  onClick: (event) => {
    console.log(1);
    event.stopPropagation();
  },
};
const options = {
  className: () => "default-link",
  formatHref: {
    hashtag: (href) => "/search?c=trend&q=" + encodeURIComponent(href),
    mention: (href) => "/" + href.substr(1),
  },
  format: {
    url: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
    hashtag: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
    mention: (value) => (value.length > 20 ? value.slice(0, 20) + "…" : value),
  },
  target: {
    url: "__blank",
    email: null,
  },
  attributes: linkProps,
};

export default function Tweet({
  tweet: propTweet,
  isParentTweet,
  className,
  newlook,
}) {
  const tweetClasses = classNames("tweet-link", className);
  const navigate = useNavigate();
  const [{ tweet, fetching }, dispatch] = useReducer(
    tweetReducer,
    initialState
  );
  useEffect(() => {
    if (propTweet) {
      dispatch(FETCHING_TWEET_SUCCESS(propTweet));
    }
  }, [propTweet]);
  const {
    ref: tweetOptionsRef,
    isVisible: istweetOptions,
    setIsVisible: settweetOptions,
  } = useComponentVisible(false);
  const { ref: retweetRef, isVisible: reweetOptonsVisible } =
    useComponentVisible(false);
  const {
    ref: saveOptionsRef,
    isVisible: saveOptonsVisible,
    setIsVisible: setsaveOptionsComponentVisible,
  } = useComponentVisible(false);
  const showTweetOptions = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    settweetOptions(true);
  };
  const showSaveTweetOptions = (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    setsaveOptionsComponentVisible(true);
  };
  const retweetOptionsClassnames = classNames("retweet-options", {
    show: reweetOptonsVisible,
  });
  const savetweetOptionsClassnames = classNames(
    "tweet-options-model",
    "save-options",
    {
      show: saveOptonsVisible,
    }
  );

  const handelTweetLike = async (e) => {
    e.stopPropagation();
    // OR
    e.preventDefault();
    if (!tweet.is_liked) {
      await likeTheTweet(tweet.id);
      dispatch(TWEET_LIKED_SUCCESS());
      console.log(tweet.is_liked)
    } else {
      await unlikeTheTweet(tweet.id);
      dispatch(TWEET_LIKED_FAILED());
    }
  };
  const handelTweetReply = (e) => {
    e.stopPropagation();

    dispatch(
      SET_TWEET_TYPE({ type: "tweetReply", retweet: null, tweet: tweet })
    );
    navigate("/compose/tweet");
  };
  const handelRetweet = async (e) => {
    // this time uing diffrent method
    e.stopPropagation();
    // OR
    e.preventDefault();

    if (!tweet.is_retweeted) {
      try {
        dispatch(TWEET_RETWEETED_SUCCESS());
        await postTheRetweet(tweet.id);
      } catch (error) {
        dispatch(TWEET_RETWEETED_FAILED());
      }
    } else {
      try {
        dispatch(TWEET_RETWEETED_FAILED());
        await deleteTheRetweet(tweet.id);
      } catch (error) {
        dispatch(TWEET_RETWEETED_SUCCESS());
      }
    }

    // dispatch(postRetweet(tweet))
  };
  // const handelLinkCopy = (e) => {
  //   e.stopPropagation();
  //   const link =
  //     window.location.origin +
  //     "/" +
  //     tweet.user.username +
  //     "/status/" +
  //     tweet.id;
  //   navigator.clipboard.writeText(link);
  //   cogoToast.success("copied successfully!");
  // };

  const handelTweetBookmark = async (e) => {
    e.stopPropagation();
    try {
      dispatch(TWEET_BOOKMARK_SUCCESS());
      await bookmarkTweet(tweet.id);
      cogoToast.success("Bookmarked successfully!");
    } catch (error) {
      cogoToast.error(error.message);
      dispatch(TWEET_BOOKMARK_FAILED());
    }
  };
  const handelTweetRemoveBookmark = async (e) => {
    e.stopPropagation();
    try {
      dispatch(TWEET_REMOVEBOOKMARK_SUCCESS());
      await removeBookmarkTweet(tweet.id);
      cogoToast.success("Bookmark removed successfully!");
    } catch (error) {
      cogoToast.error(error.message);
      dispatch(TWEET_REMOVEBOOKMARK_FAILED());
    }
  };
  // const handelShareTweet = async (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (!navigator.canShare) {
  //     return cogoToast.error("Sharing not supported!");
  //   }

  //   const blob = await fetch(tweet.pic).then((r) => r.blob());
  //   const data = {
  //     title: "Tweet",
  //     files: [
  //       new File([blob], "file.png", {
  //         type: blob.type,
  //       }),
  //     ],
  //     text: tweet.caption,
  //     url: `https://zwitter.netlify.app/${tweet.user.username}/status/${tweet._id}`,
  //   };
  //   navigator.share(data);
  // };
  return !fetching ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() =>
        navigate("/" + tweet.user.username + "/status/" + tweet.id)
      }
      className={tweetClasses}
    >
      <div className="tweet tweet-container">
        <div className="profile-pic-container">
          {/* <img src={tweet.user.avatar} alt="user-pic" className="profile-pic" /> */}
        </div>
        {isParentTweet && <span className="hr-line"></span>}
        <div className="tweet-content">
          <div className="tweet-content-header">
            <div className="tweet-header-child">
              <span className="tweet-content-child user-full-name">
                <Link
                  to={"/" + tweet.user.username}
                  onClick={(e) => e.stopPropagation()}
                >
                  {tweet.user.fullName}
                  {tweet.user.isVerified && (
                    <span className="verfied-icon">
                      <i className="fas fa-badge-check"></i>
                    </span>
                  )}
                </Link>
              </span>
              <span className="tweet-content-child user-username">
                @{tweet.user.username}
              </span>
              <span className="tweet-content-child useless-dot"></span>
              <span className="tweet-content-child timestamp">
                {moment(tweet.created_at).fromNow()}
              </span>
            </div>

            <div className="tweet-options-container" ref={tweetOptionsRef}>
              <TextButton
                onClick={showTweetOptions}
                className="tweet-options-btn"
              >
                <span className="tweet-content-child tweet-options">
                  <ThreeDotsIcon className="tweet-options-icon" />
                </span>
              </TextButton>

              <TweetOptions
                istweetOptions={istweetOptions}
                tweet={tweet}
                dispatch={dispatch}
              />
            </div>
          </div>
          <div className="tweet-content-text">
            <p className="tweet-text">
              {<Linkify options={options}>{tweet.caption}</Linkify>}
            </p>
          </div>
          <div className="tweet-content-image-container">
            {tweet.media_type === 1 && tweet.pic && (
              <img
                src={tweet.pic}
                alt="tweet-pic"
                className="tweet-content-image"
              />
            )}
            {tweet.media_type === 2 && <Video src={tweet.video_src} />}
          </div>
          {!newlook && (
            <div className="tweet-actions">
              <div className="wrap-tweet-actions-child">
                <div className=" tweet-actions-child tweet-comment">
                  <div className="tweet-icon">
                    <TextButton
                      className="tweet-icon-wrap"
                      onClick={handelTweetReply}
                    >
                      <CommentIcon
                        fill={"#536471"}
                        height="20px"
                        width="20px"
                      />
                    </TextButton>

                    {/* <i className="far fa-comment"></i> */}
                  </div>

                  <span className="tweet-comment-count">
                    {tweet.replies_count}
                  </span>
                </div>
                <div
                  className="tweet-actions-child tweet-retweet"
                  ref={retweetRef}
                >
                  <div className="tweet-icon">
                    <TextButton
                      className="tweet-icon-wrap"
                      onClick={handelRetweet}
                    >
                      <RetweetIcon
                        fill={
                          tweet.is_retweeted
                            ? "rgba(29, 155, 240, 0.8)"
                            : "#536471"
                        }
                        height="20px"
                        width="20px"
                      />
                    </TextButton>

                    {/* <i className="far fa-arrows-retweet"></i> */}
                  </div>
                  <div className={retweetOptionsClassnames}>
                    <div className="retweet-options-child retweet-btn-container">
                      <RetweetIcon
                        fill={"#536471"}
                        height="20px"
                        width="20px"
                      />
                      <TextButton className="retweet-btn">Retweet</TextButton>
                    </div>
                    <div className="retweet-options-child quote-tweet-container">
                      <i className="fas fa-pencil-alt"></i>
                      <TextButton className="quote-btn">Quote tweet</TextButton>
                    </div>
                  </div>

                  <span className="tweet-comment-count">
                    {tweet.retweets}
                  </span>
                </div>
                <div className="tweet-actions-child like-tweet">
                  <div className="tweet-icon like-icon">
                    <TextButton
                      className="tweet-icon-wrap"
                      onClick={handelTweetLike}
                    >
                      <i
                        className={
                          tweet.is_liked
                            ? "fas fa-heart liked"
                            : "fa-regular fa-heart"
                        }
                        style={{
                          color: tweet.is_liked ? "light-red" : "light-red",
                        }}
                      ></i>
                    </TextButton>

                    {/* <LikeIcon fill={"#536471"} height="18px" width="18px"/> */}
                  </div>

                  <span className="tweet-comment-count">
                    {tweet.likes}
                  </span>
                </div>
              </div>

              <div className="tweet-actions-child save-tweet-options">
                <div
                  className="tweet-icon tweet-options-container"
                  ref={saveOptionsRef}
                >
                  <TextButton
                    onClick={showSaveTweetOptions}
                    className="tweet-options-btn"
                  >
                    <ShareIcon fill={"#536471"} height="18px" width="18px" />
                  </TextButton>
                  <AnimatePresence>
                    {saveOptonsVisible && (
                      <motion.ul
                        className={savetweetOptionsClassnames}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ y: 50, opacity: 0 }}
                      >
                        {!tweet.is_bookmarked ? (
                          <li className="tweet-options-model-item">
                            <span className="tweet-options-model-icon">
                              <i className="far fa-bookmark"></i>
                            </span>
                            <TextButton
                              className="tweet-options-model-btn"
                              onClick={handelTweetBookmark}
                            >
                              Bookmark
                            </TextButton>
                          </li>
                        ) : (
                          <li className="tweet-options-model-item">
                            <span className="tweet-options-model-icon">
                              <i className="fas fa-bookmark"></i>
                            </span>
                            <TextButton
                              className="tweet-options-model-btn"
                              onClick={handelTweetRemoveBookmark}
                            >
                              Remove Bookmark
                            </TextButton>
                          </li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {newlook && (
        <div className="tweet-actions tweet-actions-new-look">
          <div className="wrap-tweet-actions-child">
            <div className=" tweet-actions-child tweet-comment">
              <div className="tweet-icon">
                <TextButton
                  className="tweet-icon-wrap"
                  onClick={handelTweetReply}
                >
                  <CommentIcon fill={"#536471"} height="25px" width="25px" />
                </TextButton>

                {/* <i className="far fa-comment"></i> */}
              </div>

              {/* <span className="tweet-comment-count">{tweet.replyCount}</span> */}
            </div>
            <div className="tweet-actions-child tweet-retweet" ref={retweetRef}>
              <div className="tweet-icon">
                <TextButton className="tweet-icon-wrap" onClick={handelRetweet}>
                  <RetweetIcon
                    fill={
                      tweet.is_retweeted ? "rgba(29, 155, 240, 0.8)" : "#536471"
                    }
                    height="25px"
                    width="25px"
                  />
                </TextButton>

                {/* <i className="far fa-arrows-retweet"></i> */}
              </div>

              {/* <span className="tweet-comment-count">
                  {tweet.retweetCount}
                </span> */}
            </div>
            <div className="tweet-actions-child like-tweet">
              <div className="tweet-icon like-icon">
                <TextButton
                  className="tweet-icon-wrap"
                  onClick={handelTweetLike}
                >
                  <i
                    className={
                      tweet.is_liked
                        ? "fas fa-heart liked"
                        : "fa-regular fa-heart"
                    }
                    style={{ color: tweet.is_liked ? "light-red" : "light-red", }}
                  ></i>
                </TextButton>

                {/* <LikeIcon fill={"#536471"} height="18px" width="18px"/> */}
              </div>

              {/* <span className="tweet-comment-count">{tweet.likesCount}</span> */}
            </div>
            <div className="tweet-actions-child save-tweet-options">
              <div
                className="tweet-icon tweet-options-container"
                ref={saveOptionsRef}
              >
                <TextButton
                  onClick={showSaveTweetOptions}
                  className="tweet-options-btn"
                >
                  <ShareIcon fill={"#536471"} height="25px" width="25px" />
                </TextButton>
                <AnimatePresence>
                  {saveOptonsVisible && (
                    <motion.ul
                      className={savetweetOptionsClassnames}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ y: 50, opacity: 0 }}
                    >
                      {!tweet.is_bookmarked ? (
                        <li className="tweet-options-model-item">
                          <span className="tweet-options-model-icon">
                            <i className="far fa-bookmark"></i>
                          </span>
                          <TextButton
                            className="tweet-options-model-btn"
                            onClick={handelTweetBookmark}
                          >
                            Bookmark
                          </TextButton>
                        </li>
                      ) : (
                        <li className="tweet-options-model-item">
                          <span className="tweet-options-model-icon">
                            <i className="fas fa-bookmark"></i>
                          </span>
                          <TextButton
                            className="tweet-options-model-btn"
                            onClick={handelTweetRemoveBookmark}
                          >
                            Remove Bookmark
                          </TextButton>
                        </li>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  ) : null;
}
