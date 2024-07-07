import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = {
    fetching:true,
    tweet:null,
    fetchingTweetError:null,
    deleted: false,
}


export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        FETCHING_TWEET_SUCCESS: (state,action) => {
            state.tweet = action.payload
            state.fetching = false;
        },
        FETCHING_TWEET_FAILED: (state,action) => {
            state.fetchingTweetError = action.payload
            state.fetching = false;
        },
        FETCHING_TWEET_STARTED:(state)=>{
            state.fetching = true;
        },
        TWEET_LIKED_SUCCESS:(state)=>{
            state.tweet.is_liked = true;
            state.tweet.likes+=1;
            console.log(state.tweet.is_liked)
        },
        TWEET_LIKED_FAILED:(state)=>{
            state.tweet.is_liked = false;
            state.tweet.likes-=1;
        },
        TWEET_UNLIKED_SUCCESS:(state)=>{
            state.tweet.is_liked = false;
            state.tweet.likes-=1;
        },
        TWEET_UNLIKED_FAILED:(state)=>{
            state.tweet.is_liked = true;
            state.tweet.likes+=1;
        },
        TWEET_RETWEETED_SUCCESS:(state)=>{
            state.tweet.is_retweeted = true
            state.tweet.retweets+=1;
        },
        TWEET_RETWEETED_FAILED:(state)=>{
            state.tweet.is_retweeted = false;
            state.tweet.retweets-=1;
        },
        TWEET_USER_FOLLOW_SUCCESS:(state)=>{
            state.tweet.is_followed = true;
        },
        TWEET_USER_UNFOLLOW_SUCCESS:(state)=>{
            state.tweet.is_followed = false;
        },
        TWEET_USER_FOLLOW_FAILED:(state)=>{
            state.tweet.is_followed = false;
        },
        TWEET_USER_UNFOLLOW_FAILED:(state)=>{
            state.tweet.is_followed = true;
        },
        TWEET_BOOKMARK_FAILED:(state)=>{
            state.tweet.is_bookmarked = false;
        },
        TWEET_BOOKMARK_SUCCESS:(state)=>{
            state.tweet.is_bookmarked = true;
        },
        TWEET_REMOVEBOOKMARK_FAILED:(state)=>{
            state.tweet.is_bookmarked = true;
        },
        TWEET_REMOVEBOOKMARK_SUCCESS:(state)=>{
            state.tweet.is_bookmarked = false;
        },
        TWEET_DELETED_SUCCESS:(state)=>{
            state.deleted = true
        },
        TWEET_DELETED_FAILED:(state)=>{
            state.deleted = false
        },

    },
})


export const {
    FETCHING_TWEET_FAIL,
    FETCHING_TWEET_STARTED,
    FETCHING_TWEET_SUCCESS,
    TWEET_LIKED_FAILED,
    TWEET_LIKED_SUCCESS,
    TWEET_RETWEETED_FAILED,
    TWEET_RETWEETED_SUCCESS,
    TWEET_UNLIKED_FAILED,
    TWEET_UNLIKED_SUCCESS,
    TWEET_USER_FOLLOW_FAILED,
    TWEET_USER_FOLLOW_SUCCESS,
    TWEET_USER_UNFOLLOW_FAILED,
    TWEET_USER_UNFOLLOW_SUCCESS,
    TWEET_BOOKMARK_FAILED,
    TWEET_BOOKMARK_SUCCESS,
    TWEET_REMOVEBOOKMARK_FAILED,
    TWEET_REMOVEBOOKMARK_SUCCESS,
    TWEET_DELETED_FAILED,
    TWEET_DELETED_SUCCESS,
} = tweetSlice.actions;
export {initialState};
export default tweetSlice.reducer;