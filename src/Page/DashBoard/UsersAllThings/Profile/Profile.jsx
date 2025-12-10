import { useEffect, useState } from "react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Noman",
    email: "noman@gmail.com",
    photo: "https://i.ibb.co/CKwP1V5/user.png",
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <img
          src={user.photo}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-primary shadow-md"
        />

        {/* Name */}
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>

        {/* Email */}
        <p className="text-gray-500 text-lg">{user.email}</p>
      </div>

      {/* Profile Details Card */}
      <div className="mt-6 p-4 bg-gray-100 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
        <div className="space-y-2">
          <p className="text-gray-700"><span className="font-bold">Name:</span> {user.name}</p>
          <p className="text-gray-700"><span className="font-bold">Email:</span> {user.email}</p>
        </div>
      </div>

      {/* Edit Button */}
      <button className="btn btn-primary w-full mt-5">Edit Profile</button>
    </div>
  );
}