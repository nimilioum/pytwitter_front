import React, {useState, useEffect} from "react";
import Tweet from "./Tweet";
import {  useDispatch, useSelector } from "react-redux";
import { selectGuestUser } from "../../store/guest/guestSelector";
import SimpleSpinner from "../Loader/SimpleSpinner";
import { fetchTheUserTweets } from "../../services/userServices";

export default function Tweets() {
  const [data, setData] = useState([]);
  const state = useSelector((state) => state);
  let guestUser = selectGuestUser(state);
  useEffect(() => {
    fetchTheUserTweets(guestUser.username, 0).then(setData).catch(console.error);
  }, []);

  return (
    <>
      <div className="tweets-wrap" style={{ position: "relative" }}>
        {data && <SimpleSpinner topCenter/>}
        {data && data.map(tweet=><Tweet tweet={tweet} key={tweet.id} />)}

        {data.length === 0 && (
          <h2>@{guestUser.username} dont have any tweets :(</h2>
        )}
        {/* {error && <h3 className="error-text">{error}</h3>} */}
      </div>
    </>
  );
}
