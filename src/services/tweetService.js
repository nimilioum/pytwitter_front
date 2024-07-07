import axios from "./axios";

export const postTheTweet = async (caption, pic) => {
    try {
        const response = await axios.post(`/api/posts/`, {
            caption
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const deleteTheTweet = async (tweetid) => {
    try {
        const response = await axios.delete(`/api/posts/${tweetid}/`, {

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const likeTheTweet = async (tweetid) => {
    try {
        const response = await axios.post(`/api/posts/${tweetid}/like/`, null, {

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
export const unlikeTheTweet = async (tweetid) => {
    try {
        const response = await axios.post(`/api/posts/${tweetid}/like/`, null, {

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const fetchTheTweet = async(tweetid)=>{
    console.log("jcswiiwi")
    try {
        const response = await axios.get(`/api/posts/${tweetid}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  postTheTweetReply = async(tweetText, tweetPic,tweetid)=>{
    try {
        console.log(tweetid, "fwfw")
        const response = await axios.post(`/api/posts/`, {
            caption: tweetText,
            reply_to: tweetid
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  postTheRetweet = async(tweetid)=>{
    try {
        const response = await axios.post(`/api/posts/${tweetid}/retweet/`, null, {

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  deleteTheRetweet = async(tweetid)=>{
    try {
        const response = await axios.post(`/api/posts/${tweetid}/retweet/`,  {

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  searchTweets = async(query)=>{
    try {
        const response = await axios.get(`/api/posts/?search=${query}`,);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  fetchReplies = async(offset=0, tweetid)=>{
    try {
        const response = await axios.post(`/api/tweet/${tweetid}/replies`,{
            offset
        } , {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  bookmarkTweet = async(tweetid)=>{
    try {
        const response = await axios.post(`/api/posts/${tweetid}/save/`,null , );
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  removeBookmarkTweet = async(tweetid)=>{
    try {
        const response = await axios.post(`/api/posts/${tweetid}/save` , null);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
// random/tweets
export const  getRandomTweets = async()=>{
    // try {
    //     const response = await axios.post(`/api/tweet/random/tweets`,{offset:0} , {
    //         headers: {
    //             authorization: localStorage.getItem('token'),
    //         },
    //     });
    //     return response.data;
    // } catch (error) {
    //     throw new Error(error.response.data.error);
    // }
    return []
}