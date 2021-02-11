const express = require("express");
const router = express.Router();
const validationController = require("../controllers/validationController");

router.post("/", validationController.insert);
router.get("/:fileId", validationController.getValidationsByFileId);
// router.put("/:id", userController.update);
// router.delete("/:id", userController.deleteById);

module.exports = router;