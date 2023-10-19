import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const onHandleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null)
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          disabled={loading}
          className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95
        disabled:opacity-70 uppercase"
        >
          {loading ? "Loading ..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2">
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
          {" "}
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt">{error}</p>}
    </div>
  );
}
