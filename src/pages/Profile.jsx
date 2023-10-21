import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
} from "../redux/user/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      setUpdateSuccess(true);

      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateSuccess(false);
    }
  };
  const onHandleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserError(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserError(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full object-cover h-24 w-24 self-center cursor-pointer mb-5 mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Cannot upload the image</span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">
              Click {" 'UPDATE' "} button to complete
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={onHandleChange}
          defaultValue={currentUser.username}
          type="text"
          className="border p-3 rounded-lg mb-3"
          placeholder="username"
          id="username"
        />
        <input
          onChange={onHandleChange}
          defaultValue={currentUser.email}
          type="email"
          className="border p-3 rounded-lg mb-3"
          placeholder="email"
          id="email"
        />
        <input
          onChange={onHandleChange}
          type="password"
          className="border p-3 rounded-lg mb-3"
          placeholder="password"
          id="password"
        />
        <button
          disabled={loading}
          className="p-3 rounded-lg bg-cyan-900 text-white border-none uppercase hover:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between">
        <span
          onClick={onHandleDelete}
          className="p2 text-red-500 mt-5 cursor-pointer"
        >
          Delete Account
        </span>
        <span className="p2 text-red-500 mt-5 cursor-pointer">Sign Out</span>
      </div>
      <p className="p2 text-red-500t text-lg mt-5 cursor-pointer">
        {error ? error : ""}
      </p>
      <p className="p2 text-red-500t text-lg mt-5 cursor-pointer">
        {updateSuccess ? "Update Succesfully" : ""}
      </p>
    </div>
  );
}
