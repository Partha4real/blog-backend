import mongoose from "mongoose";
import Blogs from "../model/Blogs.js";

export const getBlogs = async (req, res) => {
  try {
    const data = await Blogs.find().populate("creator");

    if (data) {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const addBlog = async (req, res) => {
  const data = req.body;
  const newBlog = new Blogs(data);

  try {
    await newBlog.save();
    res.status(201).json({
      data: newBlog,
      message: "Blog has been Created Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Blog was not created! Try again." });
  }
};

export const updateBlog = async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;
  // console.log('hhhhh', listedJob);
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ message: "No Blog With That Id" });
    }
    const updatedBlog = await Blogs.findByIdAndUpdate(
      _id,
      { ...data, _id },
      { new: true }
    );
    res.json({
      data: updatedBlog,
      message: "Blog has been updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Blog was not updated! Try again." });
  }
};
