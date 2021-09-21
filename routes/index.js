var express = require("express");
var router = express.Router();
const orgController = require("../controllers/organization");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/organizations", orgController.getOrganizations);

router.post("/organizations", orgController.createOrganization);
module.exports = router;
