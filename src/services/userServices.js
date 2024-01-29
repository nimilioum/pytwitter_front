import axios from "./axios";

export const updateUserProfile = async (
  bcPic,
  profilePic,
  fullName,
  bio,
  website,
  location
) => {
  try {
    const response = await axios.put(
      "/api/user/update/profile",
      {
        bio,
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const fetchUserProfile = async (username) => {
  console.log(username, "csnjns")
  try {
    const response = await axios.get(
      `/api/user/${username}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const followUser = async (username) => {
  try {
    const response = await axios.post(`/api/user/${username}/follow`, null, );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await axios.post(`/api/user/${userId}/unfollow`, null, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserFollowers = async (userId, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userId}/followers`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserFollowings = async (userId, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userId}/followings`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchTheUserTweets = async (username, offset = 0) => {
  try {
    const response = await axios.get(
      `/api/user-posts/${username}/posts/`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchTheUserLikedTweets = async (userid, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userid}/tweets/liked`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchTheUserMediaTweets = async (userid, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userid}/tweets/media`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchUserFeedTweets = async (username, offset = 0, signal) => {
  try {
    console.log(localStorage.getItem('token'))
    const response = await axios.get(
      `/api/posts/feed/`,
      {
        signal: signal,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchSuggstedUsers = async () => {
  // try {
  //   const response = await axios.post(`/api/user/users_suggestions`, null, {
  //     headers: {
  //       authorization: localStorage.getItem("token"),
  //     },
  //   });
  //   return response.data;
  // } catch (error) {
  //   throw new Error(error.response.data.error);
  // }
  return []
};

export const searchUsers = async (text, offset = 0) => {
  try {
    const response = await axios.get(
      `/api/user/?search=${text}&offset=${offset}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getNotifications = async (offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/notifications`,
      { offset },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getMentionsNotifications = async (offset = 0) => {
  // try {
  //   const response = await axios.post(
  //     `/api/user/notifications/mentions`,
  //     { offset },
  //     {
  //       headers: {
  //         authorization: localStorage.getItem("token"),
  //       },
  //     }
  //   );
  //   return response.data;
  // } catch (error) {
  //   throw new Error(error.response.data.error);
  // }
  return []
};

export const fetchBookmarks = async (offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/bookmarks`,
      { offset },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchNews = async () => {
  // try {
  //   const response = await axios.get(
  //     "https://newsdata.io/api/1/news?apikey=pub_8595b1f504c4cc286b5e935c16322e731698&country=us,gb"
  //   );
  //   return response.data;
  // } catch (error) {
  //   throw new Error(error);
  // }
  return {results: []}
};
