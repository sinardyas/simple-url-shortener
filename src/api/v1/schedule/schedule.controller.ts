import type { Request, Response } from "express";
import type { SyncType } from "../../../commons/types";
import { schedule } from "../../../services/schedule";

const sync = async (req: Request, res: Response) => {
  const type: SyncType = req.query.from_cron ? "cron" : "manual";

  const resp = await schedule.sync(type);

  return res.json(resp);
};

const get = (_req: Request, res: Response) => {
  return res.json({ status: 200, message: "Success" });
};

export { sync, get };
