import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form action="" className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          required
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          required
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          required
          className="border p-3 rounded-lg"
        />
        <button
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
