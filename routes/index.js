"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var organization_1 = require("../controllers/organization");
var router = express_1.default.Router();
router.get("/", function (req, res) {
    /*
    res.send(
      "Run GET /organizations to retrieve organizations based on a criteria. Run POST /organizations to create an organization."
    );
    */
    res.render("index");
});
router.get("/organizations", organization_1.getOrganizations);
router.post("/organizations", organization_1.createOrganization);
exports.default = router;
