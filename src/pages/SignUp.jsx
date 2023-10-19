import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const onHandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };
  console.log(formData)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          onChange={onHandleChange}
          type="text"
          placeholder="username"
          required
          className="border p-3 rounded-lg"
          id="username"
        />
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
          onSubmit={handleSubmit}
          className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95
        disabled:opacity-70 uppercase"
        >
          Sign up
        </button>
      </form>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          {" "}
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
