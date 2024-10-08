import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOneRecipe,
  toggleLikeRecipe,
  toggleDislikeRecipe,
} from "../api/recipes";
import {
  getCommentsForRecipe,
  createComment,
  deleteComment,
  replyToComment,
} from "../api/comment";
import { getMe } from "../api/users";

export const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const { data: recipe, isLoading: recipeLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getOneRecipe(id),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => getCommentsForRecipe(id),
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (recipe && currentUser) {
      setIsLiked(recipe.likes.some((like) => like._id === currentUser._id));
      setIsDisliked(
        recipe.dislikes.some((dislike) => dislike._id === currentUser._id)
      );
    }
  }, [recipe, currentUser]);

  const likeMutation = useMutation({
    mutationFn: toggleLikeRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", id] });
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: toggleDislikeRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", id] });
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: ({ recipeId, content }) => createComment(recipeId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setNewComment("");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comments", id] }),
  });

  const replyCommentMutation = useMutation({
    mutationFn: ({ commentId, content }) => replyToComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setReplyContent("");
      setReplyingTo(null);
    },
  });

  const handleLike = () => {
    likeMutation.mutate(id);
  };

  const handleDislike = () => {
    dislikeMutation.mutate(id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createCommentMutation.mutate({ recipeId: id, content: newComment });
    }
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation.mutate(commentId);
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim() && replyingTo) {
      replyCommentMutation.mutate({
        commentId: replyingTo,
        content: replyContent,
      });
    }
  };

  const navigateToUserProfile = (userId) => {
    navigate(`/account/${userId}`);
  };

  if (recipeLoading || commentsLoading)
    return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-olive min-h-screen flex flex-col p-12 text-white font-telugu">
      <div className="bg-white rounded-lg p-8 shadow-md text-olive">
        <h1 className="text-4xl font-bold mb-4">{recipe.name}</h1>
        {recipe.recipeImage && (
          <img
            src={`http://localhost:10000/${recipe.recipeImage}`}
            alt={recipe.name}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        <p className="text-gray-600 mb-4">
          Created by:
          <span
            className="text-blue-500 cursor-pointer hover:underline ml-1"
            onClick={() => navigateToUserProfile(recipe.user._id)}
          >
            {recipe.user.username}
          </span>
        </p>

        {/* Categories */}
        <div className="mb-4">
          <strong>Categories:</strong>
          {recipe.category && recipe.category.length > 0 ? (
            <ul className="list-disc list-inside">
              {recipe.category.map((cat, index) => (
                <li key={index}>{cat.name}</li>
              ))}
            </ul>
          ) : (
            <p>No categories specified</p>
          )}
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <strong>Ingredients:</strong>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.name}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients specified</p>
          )}
        </div>

        <div className="mb-4">
          <strong>Instructions:</strong>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <p className="text-gray-600">
          Time to cook: {recipe.timeToCook} minutes
        </p>
        <p className="text-gray-600">Calories: {recipe.calories}</p>
        <div className="mt-4 flex items-center">
          <button
            onClick={handleLike}
            className={`mr-4 px-4 py-2 rounded-md transition-colors ${
              isLiked ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            disabled={likeMutation.isPending || dislikeMutation.isPending}
          >
            {isLiked ? "Unlike" : "Like"} ({recipe.likes.length})
          </button>
          <button
            onClick={handleDislike}
            className={`px-4 py-2 rounded-md transition-colors ${
              isDisliked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
            disabled={likeMutation.isPending || dislikeMutation.isPending}
          >
            {isDisliked ? "Undislike" : "Dislike"} ({recipe.dislikes.length})
          </button>
        </div>

        {/* Comments section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>

          {/* New comment form */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border rounded"
              rows="3"
            />
            <button
              type="submit"
              className="mt-2 bg-olive text-white px-4 py-2 rounded"
              disabled={createCommentMutation.isPending}
            >
              {createCommentMutation.isPending ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {/* Comments list */}
          {comments &&
            comments.map((comment) => (
              <div key={comment._id} className="border-b py-4">
                <p className="font-bold">
                  <span
                    className="text-blue-500 cursor-pointer hover:underline"
                    onClick={() => navigateToUserProfile(comment.user._id)}
                  >
                    {comment.user.username}
                  </span>
                </p>
                <p>{comment.content}</p>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                  {currentUser && currentUser._id === comment.user._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="ml-2 text-red-500"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={() => setReplyingTo(comment._id)}
                    className="ml-2 text-blue-500"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply form */}
                {replyingTo === comment._id && (
                  <form onSubmit={handleReplySubmit} className="mt-2">
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full p-2 border rounded"
                      rows="2"
                    />
                    <button
                      type="submit"
                      className="mt-1 bg-olive text-white px-3 py-1 rounded text-sm"
                      disabled={replyCommentMutation.isPending}
                    >
                      {replyCommentMutation.isPending
                        ? "Replying..."
                        : "Post Reply"}
                    </button>
                  </form>
                )}

                {/* Replies */}
                {comment.replies &&
                  comment.replies.map((reply) => (
                    <div key={reply._id} className="ml-8 mt-2 border-l pl-4">
                      <p className="font-bold">
                        <span
                          className="text-blue-500 cursor-pointer hover:underline"
                          onClick={() => navigateToUserProfile(reply.user._id)}
                        >
                          {reply.user.username}
                        </span>
                      </p>
                      <p>{reply.content}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(reply.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
