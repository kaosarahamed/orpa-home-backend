const express = require("express");
const router = express.Router();
const {getUser, registerUser, loginUser, getSingleUser, deleteUser, updateUser} = require("../controller/userController");

router.get("/", getUser);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;