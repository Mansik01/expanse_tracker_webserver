// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/expenseMiddleWare");
const userController = require("../controller/user.controller");

router.post("/SIGN_UP", userController.signUp);

router.post("/LOGIN", userController.login);

// Delete account route
router.delete(
  "/DELETE_ACCOUNT/:id",
  authMiddleware,
  userController.deleteAccount
);

// App version route
router.get("/APP_VERSION", userController.getAppVersion);

module.exports = router;
