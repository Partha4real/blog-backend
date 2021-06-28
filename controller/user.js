import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../model/User.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User dosen't exist." });
    }
    if (user.deleteUser === true) {
      return res.status(403).json({ message: "Admin has denied your access!" });
    }

    if (password !== user.password) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ message: "Logged in successfully.", result: user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const data = req.body;

  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).json({ message: "User already exist." });
    } else {
      // const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create(data);
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "User added successfully.", result: newUser, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    // .populate({
    //   path: "applicants",
    //   populate: {
    //     path: "position",
    //   },
    // });

    if (users) {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = req.body;
  // console.log('hhhhh', listedJob);
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send({ messsage: "No User with that Id" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { ...user, _id },
      { new: true }
    );
    res.json({
      data: updatedUser,
      message: "User has been disabled successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};
