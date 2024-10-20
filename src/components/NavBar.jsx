import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoClick = () => {
    // Check if user is authenticated before navigating
    if (user) {
      navigate('/');
    } else {
      navigate('/login');  // Redirect to login if not authenticated
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          {/* Update Link to use onClick with the handleLogoClick function */}
          <a onClick={handleLogoClick} className="btn btn-ghost text-xl">
            DevTinder🚀
          </a>
        </div>

        {user && <p className="font-bold">Welcome {user.firstName}</p>}

        <div className="flex-none gap-2">
          {user && (
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/connections'}>Connections</Link>
                </li>
                         <li>
                  <Link to={'/requests'}>Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogOut}>Logout</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
