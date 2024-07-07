import React from "react";
import classNames from "classnames";
import TextButton from "./../Button/TextButton/TextButton";
import { selectCurrentUser } from "../../store/user/userSelector";
import { useSelector } from "react-redux";
import {
  TWEET_DELETED_SUCCESS,
  TWEET_USER_FOLLOW_FAILED,
  TWEET_USER_FOLLOW_SUCCESS,
  TWEET_USER_UNFOLLOW_FAILED,
  TWEET_USER_UNFOLLOW_SUCCESS,
} from "../../store/Tweet/tweetSlice";
import { unfollowUser, followUser } from "../../services/userServices";
import cogoToast from "cogo-toast";
import { motion, AnimatePresence } from "framer-motion";
import {deleteTheTweet} from "../../services/tweetService";
import {useNavigate} from "react-router-dom";

export default function TweetOptions({ istweetOptions, tweet, dispatch }) {
  const tweetOptionsClassnames = classNames("tweet-options-model", {
    show: istweetOptions,
  });
  const state = useSelector((state) => state);
  let currentUser = selectCurrentUser(state);
  const navigate = useNavigate();

  const handelTweetDelete = async () => {
    await deleteTheTweet(tweet.id)
    dispatch(TWEET_DELETED_SUCCESS)
    navigate("/home")
  };
  const handelUnfollow = async (e) => {
    e.stopPropagation();
    try {
      dispatch(TWEET_USER_UNFOLLOW_SUCCESS());
      await unfollowUser(tweet.user.username);
    } catch (error) {
      dispatch(TWEET_USER_UNFOLLOW_FAILED());
      cogoToast.error(error.message);
    }
  };
  console.log(tweet)
  const handelFollow = async (e) => {
    e.stopPropagation();
    try {
      dispatch(TWEET_USER_FOLLOW_SUCCESS());
      await followUser(tweet.user.username);
    } catch (error) {
      dispatch(TWEET_USER_FOLLOW_FAILED());
      cogoToast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
      {istweetOptions && (
        <motion.ul
          className={tweetOptionsClassnames}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ y: 50, opacity: 0 }}
        >
          <li className="tweet-options-model-item">
            {tweet.user.username === currentUser.username && (
              <>
                <span className="tweet-options-model-icon danger-icon">
                  <i className="far fa-trash-can"></i>
                </span>
                <TextButton
                  className="tweet-options-model-btn"
                  onClick={handelTweetDelete}
                >
                  Delete
                </TextButton>
              </>
            )}
          </li>
          <li className="tweet-options-model-item">
            {tweet.user.username !== currentUser.username && (
              <>
                {/* <span className="tweet-options-model-icon">
                  <i className="far fa-user-plus"></i>
                </span> */}
                {tweet.user.is_followed && (
                  <TextButton
                    className="tweet-options-model-btn"
                    onClick={handelFollow}
                  >
                    Follow @{tweet.user.username}
                  </TextButton>
                )}
                {!tweet.user.is_followed && (
                  <TextButton
                    className="tweet-options-model-btn"
                    onClick={handelUnfollow}
                  >
                    Unfollow @{tweet.user.username}
                  </TextButton>
                )}
              </>
            )}
          </li>
          <li className="tweet-options-model-item">
            <span className="tweet-options-model-icon icon-4">
              <i className="far fa-flag"></i>
            </span>
            <TextButton className="tweet-options-model-btn" disabled>
              Report Tweet
            </TextButton>
          </li>
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
