import { asc, eq } from "drizzle-orm";
import { onError } from "../../commons/errors/error";
import Cache from "../../commons/utils/cache";
import { db, dbSchema } from "../../db";

export const getAll = async () => {
  try {
    const cache = new Cache("station-all", {
      ttl: 60 * new Date(Date.now()).getMinutes() * new Date(Date.now()).getHours(),
    });

    const cached = await cache.get();

    if (cached) {
      return cached;
    }

    const stations = await db.query.station.findMany({
      orderBy: [asc(dbSchema.station.id), asc(dbSchema.station.daop), asc(dbSchema.station.name)],
      where: eq(dbSchema.station.haveSchedule, true),
    });

    await cache.set(stations);

    return stations;
  } catch (error) {
    throw new Error(onError(error));
  }
};
