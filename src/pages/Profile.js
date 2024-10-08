import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, updateUser, signin } from "../api/users";
import { useNavigate } from "react-router-dom";
import { FollowModal } from "./FollowModal"; // Import the FollowModal component

export const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [passwordVerificationMode, setPasswordVerificationMode] =
    useState(false);
  const [password, setPassword] = useState("");
  const [editedUser, setEditedUser] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (user) {
      setEditedUser(user);
      setPreviewImage(`http://localhost:10000/${user.profileImage}`);
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      setEditMode(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      alert(
        "Profile updated successfully. Please log in again with your new password if you changed it."
      );
      // Optionally, you can sign the user out here and redirect to the login page
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Error updating user");
    },
  });

  const verifyPasswordMutation = useMutation({
    mutationFn: (password) => signin({ username: user.username, password }),
    onSuccess: () => {
      setPasswordVerificationMode(false);
      setEditMode(true);
    },
    onError: (error) => {
      alert("Incorrect password. Please try again.");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedUser({ ...editedUser, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    const formData = new FormData();
    Object.keys(editedUser).forEach((key) => {
      formData.append(key, editedUser[key]);
    });

    if (currentPassword && newPassword) {
      formData.append("currentPassword", currentPassword);
      formData.append("newPassword", newPassword);
    }

    if (fileInputRef.current.files[0]) {
      formData.append("profileImage", fileInputRef.current.files[0]);
    }

    updateMutation.mutate(formData);
  };

  const handlePasswordVerification = (e) => {
    e.preventDefault();
    verifyPasswordMutation.mutate(password);
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-olive min-h-screen flex flex-col p-12 text-white font-telugu">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-white hover:text-olive-light transition-colors mr-4"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">Profile</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-md text-olive">
        {passwordVerificationMode ? (
          <form onSubmit={handlePasswordVerification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your password to edit profile
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setPasswordVerificationMode(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-olive text-white rounded-md hover:bg-olive-dark transition-colors"
              >
                Verify
              </button>
            </div>
          </form>
        ) : editMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div
                className="relative w-24 h-24 cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  src={previewImage}
                  alt={editedUser.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm">Change Image</span>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editedUser.username || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={editedUser.email || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={editedUser.bio || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={editedUser.gender || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password (required to change password)
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-olive focus:ring focus:ring-olive focus:ring-opacity-50"
              />
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-olive text-white rounded-md hover:bg-olive-dark transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <img
                src={`http://localhost:10000/${user.profileImage}`}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover"
              />
              <button
                onClick={() => setPasswordVerificationMode(true)}
                className="px-4 py-2 bg-olive text-white rounded-md hover:bg-olive-dark transition-colors"
              >
                Edit Profile
              </button>
            </div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-800">{user.bio || "No bio provided"}</p>
            <p className="text-gray-600">
              Gender: {user.gender || "Not specified"}
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                  onClick={() => navigate("/recipes")}
                >
                  <p className="font-bold">{user.recipes?.length || 0}</p>
                  <p className="text-gray-600">Recipes</p>
                </div>
                <div
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                  onClick={() => setShowFollowersModal(true)}
                >
                  <p className="font-bold">{user.followers?.length || 0}</p>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
                  onClick={() => setShowFollowingModal(true)}
                >
                  <p className="font-bold">{user.following?.length || 0}</p>
                  <p className="text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={user?.followers || []}
        currentUserId={user?._id}
      />

      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={user?.following || []}
        currentUserId={user?._id}
      />
    </div>
  );
};
