import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  // Check if the user is undefined or null
  if (!user) {
    return (
      <h1 className=" font-bold text-center m-10">
        {" "}
        OPPS...!! No New Users are Found..!!
      </h1>
    );
  }

  const { _id, firstName, lastName, age, gender, about } = user;

  const connectionData = useSelector((store) => store.feed);
  console.log(connectionData);

  const dispatch = useDispatch();

  console.log(user);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        {about && <p>{about}</p>}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-success"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleSendRequest("ignore", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
