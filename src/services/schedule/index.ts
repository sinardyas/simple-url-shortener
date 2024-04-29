import type { SyncType } from "../../commons/types";
import { sync } from "../utils/sync";
import { sync as syncSchedule } from "./sync";

export const schedule = {
  sync: async (type: SyncType) => {
    const schedules = await sync(syncSchedule, {
      item: "station",
      type,
    })();

    return {
      status: 200,
      data: schedules,
    };
  },
};
