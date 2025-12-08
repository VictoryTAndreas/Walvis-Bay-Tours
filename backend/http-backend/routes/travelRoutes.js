import express from "express";
import { getTravelPlans } from "../routeHandlers/travelHandler.js";
import { middleware } from "../utils/middleware.js";
import {
  createPlan,
  getMemebers,
  joinPlan,
  LeavePlan,
} from "../routeHandlers/roomHandler.js";

function parseData(req, res, next) {
  if (req.body.data) {
   try {
    const parsed = JSON.parse(req.body.data);
    // merge parsed JSON into req.body but KEEP existing fields
    req.body = {
      ...req.body,
      ...parsed,
    };

    // convert numeric fields
    ["minAge", "maxAge", "grpSize"].forEach((key) => {
      // convert only if exists AND is a number-like string
      if (req.body[key] !== undefined && !isNaN(req.body[key])) {
        req.body[key] = Number(req.body[key]);
      }
    });

    delete req.body.data; // remove original string
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Invalid JSON in projectData field" });
    }
  }
  next();
}

export default function travelRouter(upload, supabase) {
  const router = express.Router();

  router.get("/:planId/members", getMemebers);

  router.use(middleware);

  router.get("/", getTravelPlans);

  router.post("/", upload.single("image"), parseData, createPlan);

  router.post("/:planId", joinPlan);

  router.delete("/:planId", LeavePlan);

  return router;
}
