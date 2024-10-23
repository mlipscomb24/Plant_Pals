const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    avatar: {
      type: String,
      default: `https://api.dicebear.com/7.x/avataaars/svg?seed=default`,
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

// Virtual for post count
UserSchema.virtual("postCount").get(function () {
  return this.posts.length;
});

// Forum activity methods
UserSchema.methods.canCreatePost = function () {
  if (!this.forumActivity.lastPostDate) return true;
  const timeSinceLastPost = Date.now() - this.forumActivity.lastPostDate;
  const minimumWaitTime = 1000 * 60; // 1 minute
  return timeSinceLastPost >= minimumWaitTime;
};

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

  // Badge check
  const totalActivity =
    this.forumActivity.totalPosts + this.forumActivity.totalComments;
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

// Authentication methods
// Pre-save middleware to hash password
UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to check password validity
UserSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Helper method to return user data without sensitive information
UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    gamification: this.gamification,
    plants: this.plants,
    forumActivity: this.forumActivity,
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
