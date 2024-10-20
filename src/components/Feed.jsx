import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {

  const feed= useSelector((store)=> store.feed)
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
       if(feed) return
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials:true
      });
      console.log(res);
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  },[]);
  return (
   feed && <div className="flex justify-center my-16">
  < UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;
