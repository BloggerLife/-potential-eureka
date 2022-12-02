import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    userImg: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    cat: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
