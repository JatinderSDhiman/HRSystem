const express = require("express");
const user = require("../controllers/user-api-controller");

const router = express.Router();

router.post("/add", user.add);
router.get("/users", user.list);
router.get("/employees", user.listEmployees);
router.get("/:id", user.getById);
router.put("/:id", user.update);
router.delete("/:id", user.delete);

module.exports = router;
