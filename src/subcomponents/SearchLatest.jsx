import React, { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { searchTweets } from "../services/tweetService";
import searchReducer, {
  initialState,
  FETCHING_TWEETS_STARTED,
  FETCHING_TWEETS_SUCCESS,
  FETCHING_TWEETS_FAILED,
} from "../store/search/searchSlice";
import cogoToast from "cogo-toast";
import Tweet from "../components/Tweet/Tweet";
import SimpleSpinner from "../components/Loader/SimpleSpinner";

export default function SearchLatest() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [{ tweets, fetching, fetchingTweetError }, dispatch] = useReducer(
    searchReducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(FETCHING_TWEETS_STARTED());
        let tweets = await searchTweets(query);
        console.log("tweets")
        tweets = tweets.results
        dispatch(FETCHING_TWEETS_SUCCESS(tweets));
      } catch (error) {
        cogoToast.error(error.message);
        dispatch(FETCHING_TWEETS_FAILED(error.message));
      }
    };
    fetchData();
  }, [query, dispatch]);
  return (
    <div className="top-tweets">
      {fetching && <SimpleSpinner topCenter/>}
      {!fetching &&
        !fetchingTweetError &&
        tweets.map((tweet) => <Tweet tweet={tweet} key={tweet.id} />)}
    </div>
  );
}
