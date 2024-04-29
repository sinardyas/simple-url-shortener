import type { Request, Response } from "express";
import type { SyncType } from "../../../commons/types";
import { station } from "../../../services/station";

const sync = async (req: Request, res: Response) => {
  const type: SyncType = req.query.from_cron ? "cron" : "manual";

  const resp = await station.sync(type);

  return res.json(resp);
};

const get = async (_req: Request, res: Response) => {
  const resp = await station.getAll();

  return res.json(resp);
};

export { sync, get };
