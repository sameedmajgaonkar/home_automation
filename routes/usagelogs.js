import UsageLog from "../models/usagelogs.js";
import express from "express";
import { differenceInHours, differenceInSeconds } from "date-fns";

const router = express.Router();
const BULB_WATTAGE = 60;
const COST_kWh = 12;

router.get("/", async (req, res) => {
  const logs = await UsageLog.find();
  let TOTAL_ON_TIME = 0;

  logs.forEach((log) => {
    TOTAL_ON_TIME += differenceInHours(log.last_seen, log.time_on);
  });
  let energykWh = (BULB_WATTAGE * TOTAL_ON_TIME) / 1000;
  let totalCost = energykWh * COST_kWh;

  return res.send({ totalCost });
});

router.post("/", async (req, res) => {
  const log = new UsageLog();

  await log.save();
  return res.status(201).send(log._id);
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const log = await UsageLog.findById(id);
  log.last_seen = Date.now();
  await log.save();
  res.send(log);
});

export default router;
