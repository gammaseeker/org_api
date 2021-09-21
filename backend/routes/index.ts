import express from "express";
import {
  getOrganizations,
  createOrganization,
} from "../controllers/organization";

const router = express.Router();

router.get("/", function (req, res) {
  res.send(
    "Run GET /organizations to retrieve organizations based on a criteria. Run POST /organizations to create an organization."
  );
});
router.get("/organizations", getOrganizations);

router.post("/organizations", createOrganization);

export default router;
