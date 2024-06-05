const express = require("express");
const router = express.Router();
const {getData, register, updateData, deleteData, login, getSingleData} = require("../controller/adminController");

router.get("/", getData);
router.post("/", register);
router.post("/login", login);
router.put("/:id", updateData);
router.get("/:id", getSingleData);
router.delete("/:id", deleteData);


module.exports = router;