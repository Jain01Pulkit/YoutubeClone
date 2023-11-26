import React from "react";
import { useSelector } from "react-redux";

const ProfileModal = ({ userData }) => {
  const isOpen = useSelector((state) => state.user.isClicked);
  if (!isOpen) return null;
  return (
    <div className="font-bold">
      <ul>
        <img className="h-8" src={userData.picture} />
        <li>{userData.given_name}</li>
        <li>{userData.email}</li>
        <li>Manage Your Google Account</li>
      </ul>
    </div>
  );
};

export default ProfileModal;
