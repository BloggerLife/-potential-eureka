import Post from "../models/Post.js";
import { Cloudinary } from "../cloudinary/cloudinary.js";

export const createPost = async (req, res, next) => {

  const { username, title, desc, cat, userImg, image } = req.body;

  try {
    if(image){
      const uploadedImg = await Cloudinary.uploader.upload(req.body.image,  {
        upload_preset: "Post_Image" 
      })
      if (uploadedImg) {
        const newPost = new Post({
          username,
          title,
          desc,
          cat,
          image: uploadedImg.secure_url,
          userImg,
        });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPosts = async (req, res, next) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        cat: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find().sort({createdAt : -1});
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
