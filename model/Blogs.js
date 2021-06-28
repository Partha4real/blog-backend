import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    status: {
      type: Boolean,
      default: false,
    },
    deleteBlog: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Blogs = mongoose.model("Blogs", blogSchema);
export default Blogs;
