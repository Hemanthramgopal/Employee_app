const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getStats,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/auth");

// All employee routes are protected
router.use(protect);

router.get("/stats", getStats);
router.get("/", getAllEmployees);
router.get("/:id", getEmployee);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
