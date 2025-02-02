import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

import Body from "./components/Body";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <div>
        <BrowserRouter basename="/">
          <Routes>
            {/* Parent route */}
            <Route path="/" element={<Body />}>
              {/* Child route */} <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />}></Route>
              <Route path="/requests" element={<Requests />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
