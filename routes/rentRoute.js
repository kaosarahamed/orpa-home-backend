const express = require("express");
const router = express.Router();
const {getRent, createRent, getSingleRent, updateRent, deleteRent} = require("../controller/rentController");

router.get("/", getRent);
router.post("/", createRent);
router.get("/:id", getSingleRent);
router.put("/:id", updateRent);
router.delete("/:id", deleteRent);


module.exports = router;