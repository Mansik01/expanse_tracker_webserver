const CreateExpense = require("../models/createExpense");
const UserModel = require("../models/userModel");
const SaveData = require("../models/saveData");

// Controller logic for deleting expense
exports.deleteExpense = (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.userId },
    { $pull: { expenses: { _id: req.params.id } } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: "Deleted Successfully",
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to delete",
        status: false,
        error: err.message,
      });
    });
};

// Controller logic for fetching single expense
exports.getSingleExpense = (req, res, next) => {
  UserModel.findOne(
    { _id: req.params.userId, "expenses._id": req.params.id },
    { "expenses.$": 1 }
  )
    .then((user) => {
      res.status(200).json({
        message: "Fetch one",
        data: user.expenses[0],
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for updating expense
exports.updateExpense = (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.userId, "expenses._id": req.params.id },
    { $set: { "expenses.$": req.body } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: "SuccessFully Updated",
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update",
        status: false,
        error: err.message,
      });
    });
};

// Controller logic for fetching all expenses
exports.getAllExpenses = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .then((documents) => {
      res.status(200).json({
        message: "SuccessFully Fetched",
        data: documents.expenses,
        status: true,
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for creating a new expense
exports.createExpense = (req, res, next) => {
  const newExpense = new CreateExpense({
    name: req.body.name,
    amount: req.body.amount,
    expense_date: req.body.expense_date,
    expense_category: req.body.expense_category,
    payment: req.body.payment,
    comment: req.body.comment,
    creater: req.body.creater,
  });

  UserModel.updateOne(
    { _id: req.body.creater },
    {
      $push: { expenses: newExpense },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Expense Added",
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Additional controller methods can be similarly defined...
exports.saveData = (req, res, next) => {
  const allData = new SaveData({
    username: req.body.username,
    name: req.body.name,
    firstLoginDate: req.body.firstLoginDate,
    lastLoginDate: req.body.lastLoginDate,
    userId: req.body.userId,
    expenseLogged: req.body.expenseLogged,
  });

  UserModel.updateOne(
    { _id: req.body.userId },
    {
      $push: { userData: allData },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Save",
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for fetching saved data
exports.getSaveData = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(200).json({
        message: "Fetch one",
        data: user.userData[0],
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for fetching all categories
exports.getCategory = (req, res, next) => {
  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      res.status(200).json({
        message: "Fetch All Category",
        data: user.category,
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for saving categories
exports.saveCategory = (req, res, next) => {
  UserModel.updateOne(
    { _id: req.params.id },
    {
      $push: { category: { $each: req.body } },
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "Category Added",
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for editing categories
exports.editCategory = (req, res, next) => {
  UserModel.updateOne({ _id: req.params.id }, { $set: { category: req.body } })
    .then((result) => {
      res.status(200).json({
        message: "Category Updated",
        status: true,
      });
    })
    .catch((err) => {
      res.status(501).json({
        message: err,
        status: false,
      });
    });
};

// Controller logic for updating user save data (login info and expenses)
exports.updateSaveData = (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.id, "userData.userId": req.params.id },
    {
      $set: {
        "userData.$.lastLoginDate": req.body.lastLoginDate,
        "userData.$.expenseLogged": req.body.expenseLogged,
      },
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: "Successfully Updated LoginDate",
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update data",
        status: false,
        error: err.message,
      });
    });
};

// Controller logic for updating user profile
exports.updateProfile = (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.id, "userData.userId": req.params.id },
    {
      $set: {
        "userData.$.username": req.body.username,
        "userData.$.name": req.body.name,
      },
    },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({
        message: "Successfully Updated Profile Info",
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update profile",
        status: false,
        error: err.message,
      });
    });
};

// Controller logic for updating username and name directly
exports.updateName = (req, res, next) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, username: req.body.username }
  )
    .then((result) => {
      res.status(200).json({
        message: "Successfully Updated Info",
        status: true,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to update name",
        status: false,
        error: err.message,
      });
    });
};
