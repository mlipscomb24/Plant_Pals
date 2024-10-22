const plantApiService = require("../services/plantApiService");
const { AuthenticationError } = require("apollo-server-express");
const { Post, Comment, User } = require("../models");

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.find()
          .populate("author")
          .populate({
            path: "comments",
            populate: "author",
          })
          .sort({ createdAt: -1 });

        return posts;
      } catch (error) {
        throw new Error("Error fetching posts. Please try again later.");
      }
    },

    post: async (_, { id }) => {
      try {
        const post = await Post.findById(id).populate("author").populate({
          path: "comments",
          populate: "author",
        });

        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (error) {
        throw new Error("Error fetching post. Please try again later.");
      }
    },

    user: async (_, { username }) => {
      try {
        const user = await User.findOne({ username })
          .populate("plants")
          .populate({
            path: "posts",
            populate: ["author", "comments"],
          });

        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Error fetching user data. Please try again later.");
      }
    },

    userPosts: async (_, { userId }) => {
      try {
        return await Post.find({ author: userId }).populate("author").populate({
          path: "comments",
          populate: "author",
        });
      } catch (error) {
        throw new Error("Error fetching user posts. Please try again later.");
      }
    },
  },

  Mutation: {
    createPost: async (_, { input }, context) => {
      try {
        const testUser = await User.findOne(); // Replace with authenticated user later
        const post = await Post.create({ ...input, author: testUser._id });
        return await Post.findById(post._id).populate("author");
      } catch (error) {
        throw new Error("Error creating post. Please try again later.");
      }
    },

    createComment: async (_, { input }, context) => {
      try {
        const testUser = await User.findOne(); // Replace with authenticated user later
        const comment = await Comment.create({
          ...input,
          author: testUser._id,
        });
        await Post.findByIdAndUpdate(input.postId, {
          $push: { comments: comment._id },
        });
        return await Comment.findById(comment._id).populate("author");
      } catch (error) {
        throw new Error("Error creating comment. Please try again later.");
      }
    },

    likePost: async (_, { id }) => {
      try {
        return await Post.findByIdAndUpdate(
          id,
          { $inc: { likes: 1 } },
          { new: true }
        ).populate("author");
      } catch (error) {
        throw new Error("Error liking post. Please try again later.");
      }
    },
  },

  Post: {
    author: (parent) => parent.author || { username: "Anonymous" },
    comments: (parent) => parent.comments || [],
    likes: (parent) => parent.likes || 0,
    tags: (parent) => parent.tags || [],
    createdAt: (parent) =>
      parent.createdAt ? parent.createdAt.toString() : new Date().toString(),
  },
};

module.exports = resolvers;
