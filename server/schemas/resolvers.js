const plantApiService = require("../services/plantApiService");
const { AuthenticationError } = require("apollo-server-express");
const { Post, Comment, User, Plant } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      return await User.findOne({ _id: context.user._id })
        .populate("plants")
        .populate({
          path: "posts",
          populate: ["author", "comments"],
        });
    },
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
        if (!post) throw new Error("Post not found");
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
        if (!user) throw new Error("User not found");
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
    searchPlants: async (_, { searchTerm }) => {
      try {
        const plants = await plantApiService.searchPlants(searchTerm);
        const formattedPlants = plants.map((plant) => ({
          ...plant,
          species: Array.isArray(plant.species)
            ? plant.species.join(", ")
            : plant.species,
        }));
        return formattedPlants;
      } catch (error) {
        throw new Error(`Failed to fetch plant data: ${error.message}`);
      }
    },
  },
  Mutation: {
    createUser: async (
      parent,
      { username, email, password, firstName, lastName }
    ) => {
      try {
        const user = await User.create({
          username,
          email,
          password,
          firstName,
          lastName,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        throw new Error("Error creating user: " + error.message);
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    updateUserAvatar: async (_, { avatarUrl }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { avatar: avatarUrl },
          { new: true }
        )
          .populate("plants")
          .populate({
            path: "posts",
            populate: ["author", "comments"],
          });

        return updatedUser;
      } catch (error) {
        throw new Error("Error updating avatar: " + error.message);
      }
    },
    addPlant: async (parent, { plantData }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const plant = await Plant.create({
          ...plantData,
          user: context.user._id,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          {
            $push: { plants: plant._id },
          },
          { new: true }
        );
        return plant;
      } catch (error) {
        throw new Error("Error adding plant: " + error.message);
      }
    },
    deletePlant: async (parent, { plantId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const plant = await Plant.findOneAndDelete({
          _id: plantId,
          user: context.user._id,
        });
        if (!plant) {
          throw new Error("Plant not found or you're not the owner.");
        }
        await User.findByIdAndUpdate(context.user._id, {
          $pull: { plants: plantId },
        });
        return plant;
      } catch (error) {
        throw new Error("Error deleting plant: " + error.message);
      }
    },
    createPost: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      try {
        const post = await Post.create({
          ...input,
          author: context.user._id,
        });
        return await Post.findById(post._id).populate("author");
      } catch (error) {
        throw new Error("Error creating post. Please try again later.");
      }
    },
    createComment: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      console.log("Creating comment with input:", input);
      try {
        const comment = await Comment.create({
          content: input.content,
          post: input.postId,
          author: context.user._id,
        });
        await Post.findByIdAndUpdate(input.postId, {
          $push: { comments: comment._id },
        });
        return await Comment.findById(comment._id).populate("author");
      } catch (error) {
        console.error("Error creating comment:", error);
        throw new Error("Error creating comment. Please try again later.");
      }
    },
    likePost: async (_, { id }, context) => {
      if (!context.user) {
        throw new AuthenticationError("You need to be logged in!");
      }
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
    subscribeUser: async (_, { input }) => {
      const { endpoint, keys } = input;

      try {
        console.log("Subscription data:", input);
        return {
        success: true,
        message: 'Server received subscription successfully',
      };
      } catch (error) {
        console.error('Failed to subscribe the user:', error);
        return {
          success: false,
          message: 'Failed to subscribe the user',
        };
      }
    // Subscription logic
    },

    updateNotifications: async (_, { input }, { user }) => {
    console.log("Notification Input Received:", input);
    console.log("Time:", input.time);
    console.log("Day of Week:", input.dayOfWeek);
      try {
        const updateUser = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              'notifications.time': input.time,
              'notifications.dayOfWeek': input.dayOfWeek,
            },
          },
          { new: true }
        );
        return {
          success: true,
          message: 'User notifications updated successfully',
          user: updateUser,
        };
      } catch (error) {
        console.error('Error updating user notifications:', error);
        return {
          success: false,
          message: 'Error updating user notifications',
        };
      }
    },
  },
  // Type Resolvers

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
