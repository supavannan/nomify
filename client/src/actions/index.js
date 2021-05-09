import axios from "axios";
import { FETCH_USER } from "./types";

////without redux thunk (fetchUser returns action)
// const fetchUser = () => {
//   const res = axios.get("/api/current_user");
//   return {
//     type: FETCH_USER,
//     payload: res,
//   };
// };

//action creator
//return a function that, when executed, returns an action
export const fetchUser = () => {
  //dispath is a function that redux-thunk will pass in
  //dispatch will dispatch the action to the reducer
  return async (dispatch) => {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res });
  };
};
