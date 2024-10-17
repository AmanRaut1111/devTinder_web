import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData= useSelector( (store)=> store.user)

  const fetchUser = async () => {
    if(userData) return
    try {
      const res = await axios.get("http://localhost:3000/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      console.log(error);
      
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {

    if(!userData)
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />

      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
