import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
const SignUp = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState(""); // lowercase 'password' to keep consistent naming
  const [errMessage, setErrMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
        dispatch(addUser(res.data.data));
      return navigate('/profile')
      
  

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center m-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">firstName</span>
              </div>
              <input
                type="text" // 'email' as the input type
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text" // 'email' as the input type
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id</span>
              </div>
              <input
                type="email" // 'email' as the input type
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <p className="text-red-700">{errMessage}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={()=>handleSignUp()} >
              SignUp
            </button>
          </div>
               <p className="font-bold text-center cursor-pointer" onClick={()=>{
            navigate('/login')
            
          }}> Alredy User ? Login Here</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
