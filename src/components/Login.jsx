import axios from "axios"; // Default import for axios
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState(""); // lowercase 'password' to keep consistent naming
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password, 
      }, {
        withCredentials:true
      });
      console.log(res.data.data);
      dispatch(addUser(res.data.data)) 
     return navigate('/')
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
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
