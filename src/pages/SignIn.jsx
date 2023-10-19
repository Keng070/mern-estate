import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch,  useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={onHandleChange}
          type="email"
          placeholder="email"
          required
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          onChange={onHandleChange}
          type="password"
          placeholder="password"
          required
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95
        disabled:opacity-70 uppercase"
        >
          {loading ? "Loading ..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2">
        <p>No account yet?</p>
        <Link to={"/sign-up"}>
          {" "}
          <span className="text-blue-700 ">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt">{error}</p>}
    </div>
  );
}
