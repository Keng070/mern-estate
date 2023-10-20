import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col">
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 self-center cursor-pointer mb-5 mt-2"
        />
        <input
          type="text"
          className="border p-3 rounded-lg mb-3"
          placeholder="username"
          id="username"
          required
        />
        <input
          type="email"
          className="border p-3 rounded-lg mb-3"
          placeholder="email"
          id="email"
          required
        />
        <input
          type="text"
          className="border p-3 rounded-lg mb-3"
          placeholder="password"
          id="password"
          required
        />
        <button className="p-3 rounded-lg bg-cyan-900 text-white border-none uppercase hover:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between">
        <span className="p2 text-red-500 mt-5 cursor-pointer">
          Delete Account
        </span>
        <span className="p2 text-red-500 mt-5 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
