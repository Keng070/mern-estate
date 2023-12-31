import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="shadow-md p-3 bg-white">
      <div className="flex justify-between items-center mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="font-bold text-sm sm:xl flex flex-wrap">
            <span className="text-slate-500">Keng</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form
          action=""
          className="bg-slate-100 rounded-lg p-3 flex items-center"
        >
          <input
            type="text"
            placeholder="Search ..."
            className="bg-transparent outline-none"
          />
          <FaSearch className="text-slate-600 cursor-pointer" />
        </form>
        <ul className="flex gap-4 font-bold">
          <Link to="/">
            {" "}
            <li className="hidden sm:inline hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="about">
            {" "}
            <li className="hidden sm:inline hover:underline cursor-pointer">
              About
            </li>
          </Link>

          {currentUser ? (
            <Link to="/profile">
              <img
                className="rounded-full h-8 w-8 object-cover"
                src={currentUser.avatar}
                alt=""
              />
            </Link>
          ) : (
            <Link to="/sign-in">
              <li className=" sm:inline hover:underline cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
