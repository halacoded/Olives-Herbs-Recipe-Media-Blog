import UserContext from "../context/UserContext";
import React, { useState, useContext } from "react";
export const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  return <div>Profile</div>;
};
