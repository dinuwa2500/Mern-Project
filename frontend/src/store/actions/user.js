import { userActions } from "../reducers/userReducer";
  import { toast } from "react-hot-toast";


export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
  toast.success("Logged out successfully");
};


