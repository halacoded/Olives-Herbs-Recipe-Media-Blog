import React from "react";
import { useNavigate } from "react-router-dom";

export const FollowModal = ({
  isOpen,
  onClose,
  title,
  users,
  currentUserId,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                className="mb-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => {
                  if (user._id === currentUserId) {
                    navigate("/profile");
                  } else {
                    navigate(`/account/${user._id}`);
                  }
                  onClose();
                }}
              >
                <div className="flex items-center">
                  <img
                    src={`http://localhost:10000/${user.profileImage}`}
                    alt={user.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span>{user.username}</span>
                  {user._id === currentUserId && (
                    <span className="ml-2 text-sm text-gray-500">
                      (This is your account)
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center py-4">
            {title === "Followers"
              ? "No followers yet."
              : "Not following anyone yet."}
          </p>
        )}
        <button
          onClick={onClose}
          className="mt-4 bg-olive text-white px-4 py-2 rounded hover:bg-olive-dark transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};
