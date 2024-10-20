import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addrequest, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState("");
  const requestData = useSelector((store) => store.request);
  const disPatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
    setShowToastMessage(res.data.message);
      
      disPatch(removeRequest(_id));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request", {
        withCredentials: true,
      });
      disPatch(addrequest(res?.data?.data));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requestData) return;

  if (requestData.length === 0) {
    return <h1> No cooections Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl ">Requests</h1>

      {requestData.map((request) => {
        const { firstName, lastName, about, age, gender } = request.fromUserId;

        return (
          <div
            key={request._id}
            className=" m-4 p-4  rounded-lg bg-base-300 w-6/12 mx-auto"
          >
            <h2 className="font-bold">
              {firstName} {lastName}
            </h2>
            {age && gender && <p>{age + "," + gender}</p>}
            <p>{about}</p>
            <div className="card-actions justify-center my-4">
              <button
                className="btn btn-success"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
            {showToast && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <span>{showToastMessage}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
