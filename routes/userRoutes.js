import express from "express";
import { signin, signup, getUsers, deleteUser } from "../controller/user.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", auth, signup);
router.get("/getUsers", getUsers);
router.post("/deleteUser/:id", auth, deleteUser);

export default router;
