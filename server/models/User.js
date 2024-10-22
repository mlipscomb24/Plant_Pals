// server/models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    gamification: {
      currentTier: {
        type: String,
        default: "Seedling",
      },
      badges: [
        {
          id: String,
          name: String,
          description: String,
        },
      ],
    },
    plants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plant",
      },
    ],
    // New forum-related fields
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    // Optional: Forum activity tracking for gamification
    forumActivity: {
      totalPosts: {
        type: Number,
        default: 0,
      },
      totalComments: {
        type: Number,
        default: 0,
      },
      helpfulResponses: {
        type: Number,
        default: 0,
      },
      lastPostDate: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Add virtual for post count
UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

// Optional: Add method to check if user can post (for rate limiting if needed)
UserSchema.methods.canCreatePost = function () {
  if (!this.forumActivity.lastPostDate) return true;

  const timeSinceLastPost = Date.now() - this.forumActivity.lastPostDate;
  const minimumWaitTime = 1000 * 60; // 1 minute

  return timeSinceLastPost >= minimumWaitTime;
};

// Optional: Add method to update forum activity
UserSchema.methods.updateForumActivity = async function (activityType) {
  const update = {};

  switch (activityType) {
    case "post":
      update["forumActivity.totalPosts"] = this.forumActivity.totalPosts + 1;
      update["forumActivity.lastPostDate"] = Date.now();
      break;
    case "comment":
      update["forumActivity.totalComments"] =
        this.forumActivity.totalComments + 1;
      break;
    case "helpful":
      update["forumActivity.helpfulResponses"] =
        this.forumActivity.helpfulResponses + 1;
      break;
  }

  // Check if user qualifies for new badges based on activity
  const totalActivity =
    this.forumActivity.totalPosts + this.forumActivity.totalComments;

  // Example badge criteria
  if (
    totalActivity >= 10 &&
    !this.gamification.badges.find((b) => b.id === "forum_contributor")
  ) {
    this.gamification.badges.push({
      id: "forum_contributor",
      name: "Forum Contributor",
      description: "Made 10 contributions to the forum",
    });
  }

  return this.save();
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
