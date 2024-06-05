const express = require("express");
const router = express.Router();
const {RedirectURL, seasionResponse} = require("../controller/rentPaymentController");

router.get("/connect", RedirectURL);
router.post("/create-checkout-session", seasionResponse);


module.exports = router;