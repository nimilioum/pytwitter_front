import cogoToast from "cogo-toast";
import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {followUser, unfollowUser} from "../../services/userServices";
import { selectCurrentUser } from "../../store/user/userSelector";
import TextButton from "../Button/TextButton/TextButton";
import verifiedBadge from "../../static/images/icons8-verified-account-30.png";

export default function FollowUser({ user, type }) {
  const state = useSelector((state) => state);
  const currentUser = selectCurrentUser(state);
  const [followingText, setFollowingText] = useState("Following");
  const [following, setIsFollowing] = useState(user.is_followed);

  const followMutation = useMutation(followUser, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsFollowing(true);
    },
    onError: (error) => {
      cogoToast.error(error.message);
    },
  });

  const unfollowMutation = useMutation(unfollowUser, {
    onSuccess: () => {
      // Invalidate and refetch
      setIsFollowing(false);
    },
    onError: (error) => {
      cogoToast.error(error.message);
    },
  });

  return (
    <motion.div
      className="follow-user"
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
    >
      <div className="wrap-user">
        <div className="profile-pic-container">
          <img src={user.avatar} alt="profile-pic" className="profile-pic" />
        </div>
        <div className="profile-details">
          <Link to={"/" + user.username} className="user-fullname">
            <span className="warp-user-fullname">
              {user.username}
              {user.isVerified && (
                <span className="verfied-icon" title="Verified">
                  <img
                    src={verifiedBadge}
                    alt="verified"
                  />
                </span>
              )}
            </span>
          </Link>
          <span className="user-username">@{user.username}</span>
        </div>
      </div>

      <div className="follow-btn-container">
        {!following ? (
          user.username !== currentUser.username && (
            <TextButton
              disabled={followMutation.isLoading}
              className="follow-btn"
              onClick={() => followMutation.mutate(user.username)}
            >
              Follow
            </TextButton>
          )
        ) : (
          <TextButton
            className="follow-btn unfollowBtn"
            cBlue
            onMouseEnter={() => setFollowingText("Unfollow")}
            onMouseLeave={() => setFollowingText("Following")}
            onClick={() => unfollowMutation.mutate(user.username)}
          >
            {followingText}
          </TextButton>
        )}
      </div>
    </motion.div>
  );
}
