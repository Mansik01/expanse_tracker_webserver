const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/expenseMiddleWare");
const expenseController = require("../controller/expense.controller");

// Routes mapping to the respective controller methods

router.delete(
  "/DELETE_EXPENSE/:userId/:id",
  authMiddleware,
  expenseController.deleteExpense
);

router.get(
  "/GET_SINGLE_EXPENSE/:userId/:id",
  authMiddleware,
  expenseController.getSingleExpense
);

router.patch(
  "/UPDATE_EXPENSE/:userId/:id",
  authMiddleware,
  expenseController.updateExpense
);

router.get(
  "/GET_ALL_EXPENSE/:id",
  authMiddleware,
  expenseController.getAllExpenses
);

router.post("/CREATE_EXPENSE", authMiddleware, expenseController.createExpense);

router.post("/SAVE_DATA", expenseController.saveData);

// Get saved user data route
router.get("/GET_SAVE_DATA/:id", expenseController.getSaveData);

// Get all categories route
router.get("/GET_CATEGORY/:id", expenseController.getCategory);

// Save category route
router.post("/SAVE_CATEGORY/:id", expenseController.saveCategory);

// Edit category route
router.post("/EDIT_CATEGORY/:id", expenseController.editCategory);

// Update user save data (login and expense logged)
router.post("/UPDATE_SAVE_DATA/:id", expenseController.updateSaveData);

// Update profile (username and name in userData)
router.post("/UPDATE_PROFILE/:id", expenseController.updateProfile);

// Update name and username directly
router.post("/UPDATE_NAME/:id", expenseController.updateName);

module.exports = router;
