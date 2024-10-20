import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const Connections= useSelector((store)=> store.connection)
    const disPatch= useDispatch()


  const fetchConections = async () => {
    try {
      const res =await  axios.get(BASE_URL + "/user/getConnections", {
        withCredentials:true
      });
      disPatch(addConnections(res.data))
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConections();
  }, []);


  if(!Connections) return

  if(Connections.length===0){
    return <h1> No cooections Found</h1>
  }

  return <div className="text-center my-10">
    <h1 className="font-bold text-2xl ">Connections</h1>

    {
        Connections.map((connection)=>{
            return <div key={connection._id} className=" m-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto">
                <h2>{connection.firstName} {connection.lastName}</h2>
                {
                   connection.age && connection.gender &&   <p>{connection.age+ "," +connection.gender}</p>
                }
               <p>{connection.about}</p> 
                
            </div>
        })
    }
  </div>;
};

export default Connections;
