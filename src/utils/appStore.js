import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";
import feddReducer from "../utils/feedSlice";
import connectionReducer from "../utils/connectionSlice";
import requestReducer from "../utils/requestsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feddReducer,
    connection: connectionReducer,
    request: requestReducer,
  },
});

export default appStore;
