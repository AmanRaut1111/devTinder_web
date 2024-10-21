import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return; // Avoid calling the API if the user data is already in store
    try {
      const res = await axios.get("http://localhost:3000/profile",{},{
        withCredentials: true,
      });
      dispatch(addUser(res.data)); // Store user data in Redux
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 401) {
        navigate("/login"); // Redirect to login if user is not authenticated
      } else {
        console.log("An unexpected error occurred", error);
      }
    }
  };

  useEffect(() => {
     if (!userData){
       return navigate('/login')
 
     }else{
      fetchUser(); // Fetch user data on mount if not available
     }
  
  }, []); // Ensure the effect runs only on mount

  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Footer /> Uncomment if you want to include the Footer */}
    </div>
  );
};

export default Body;
