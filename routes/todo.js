const express = require("express");
const { gettodo, posttodo, updatetodo, deletetodo } = require("../controllers/todo");
const router = express.Router();

router.route("/")
  .get(gettodo)
  .post(posttodo)
  

  router.route("/:id").patch(updatetodo).delete(deletetodo);

module.exports = router;
