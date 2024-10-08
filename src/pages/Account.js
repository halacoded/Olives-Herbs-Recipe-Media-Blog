import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile, followUser, unfollowUser, getMe } from "../api/users";
import { FollowModal } from "./FollowModal";

export const Account = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [isOwnAccount, setIsOwnAccount] = useState(false);

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", id],
    queryFn: () => getProfile(id),
    onSuccess: (data) => {
      setIsFollowing(data.isFollowing);
    },
  });

  const followMutation = useMutation({
    mutationFn: followUser,
    onSuccess: () => {
      setIsFollowing(true);
      queryClient.invalidateQueries(["userProfile", id]);
    },
    onError: (error) => {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "You are already following this user"
      ) {
        setIsFollowing(true);
      } else {
        console.error("Follow error:", error);
      }
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => {
      setIsFollowing(false);
      queryClient.invalidateQueries(["userProfile", id]);
    },
    onError: (error) => {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "You are not following this user"
      ) {
        setIsFollowing(false);
      } else {
        console.error("Unfollow error:", error);
      }
    },
  });

  const handleFollowUnfollow = () => {
    if (isFollowing) {
      unfollowMutation.mutate(id);
    } else {
      followMutation.mutate(id);
    }
  };

  useEffect(() => {
    if (currentUser && user && currentUser._id === user._id) {
      setIsOwnAccount(true);
      navigate("/profile");
    } else {
      setIsOwnAccount(false);
    }
  }, [currentUser, user, navigate]);

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
          <h1 className="text-4xl font-bold">{user.username}'s Profile</h1>
        </div>
        <button
          onClick={handleFollowUnfollow}
          className={`px-4 py-2 rounded-md transition-colors ${
            isFollowing
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={followMutation.isLoading || unfollowMutation.isLoading}
        >
          {followMutation.isLoading || unfollowMutation.isLoading
            ? "Loading..."
            : isFollowing
            ? "Unfollow"
            : "Follow"}
        </button>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-md text-olive">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <img
              src={`http://localhost:10000/${user.profileImage}`}
              alt={user.username}
              className="w-24 h-24 rounded-full object-cover"
            />
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
              <div>
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
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
        {user.recipes && user.recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-lg p-4 shadow-md text-olive cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/recipe/${recipe._id}`)}
              >
                <img
                  src={`http://localhost:10000/${recipe.recipeImage}`}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="text-xl font-bold mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-2">{recipe.description}</p>
                <p className="text-gray-600">
                  Time to cook: {recipe.timeToCook} minutes
                </p>
                <p className="text-gray-600">Calories: {recipe.calories}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6 shadow-md text-olive text-center">
            <p className="text-xl font-semibold mb-2">No recipes yet</p>
            <p className="text-gray-600">
              {isOwnAccount
                ? "You haven't created any recipes. Start cooking and share your culinary creations!"
                : `${user.username} hasn't created any recipes yet.`}
            </p>
          </div>
        )}
      </div>

      <FollowModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        title="Followers"
        users={user?.followers || []}
        currentUserId={currentUser?._id}
      />

      <FollowModal
        isOpen={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        title="Following"
        users={user?.following || []}
        currentUserId={currentUser?._id}
      />
    </div>
  );
};
