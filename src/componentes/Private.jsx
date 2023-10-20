import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export default function Private() {
  const {currentUser} = useSelector((state) => state.user);
  console.log(currentUser)
  return currentUser ? <Outlet /> : <Navigate to="/sign-in"/>;
}
