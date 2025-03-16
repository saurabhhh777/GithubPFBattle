import express, { Router } from "express";
import { userAllsubmission } from "../controllers/user.controller";

const router: Router = express.Router();


router.route("/user/:username").get(userAllsubmission);


export default router;