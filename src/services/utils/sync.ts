import { sql } from "drizzle-orm";
import { onError } from "../../commons/errors/error";
import type { SyncItem, SyncType } from "../../commons/types";
import { db, dbSchema } from "../../db";
import type { NewSync } from "../../db/schema";

export const sync =
  (
    fn: () => Promise<void>,
    {
      item,
      type,
    }: {
      item: SyncItem;
      type: SyncType;
    },
  ) =>
  async () => {
    const start = await db
      .insert(dbSchema.sync)
      .values({
        item,
        type,
      })
      .returning({ id: dbSchema.sync.id, n: dbSchema.sync.n });

    const initialPayload = start[0];
    const startTime = performance.now();

    fn()
      .then(async () => {
        const payload: Partial<NewSync> = {
          ...initialPayload,
          status: "SUCCESS",
        };
        await db
          .insert(dbSchema.sync)
          .values(payload)
          .onConflictDoUpdate({
            target: dbSchema.sync.id,
            set: {
              status: sql`excluded.status`,
            },
          });
      })
      .catch(async (e) => {
        const error = onError(e);

        const payload: Partial<NewSync> = {
          ...initialPayload,
          status: "FAILED",
          message: error,
        };

        await db
          .insert(dbSchema.sync)
          .values(payload)
          .onConflictDoUpdate({
            target: dbSchema.sync.id,
            set: {
              status: sql`excluded.status`,
              message: sql`excluded.message`,
            },
          });
      })
      .finally(async () => {
        const endTime = performance.now();
        const duration = Math.ceil(endTime - startTime);

        const payload: Partial<NewSync> = {
          ...initialPayload,
          endedAt: new Date().toISOString(),
          duration,
        };

        await db
          .insert(dbSchema.sync)
          .values(payload)
          .onConflictDoUpdate({
            target: dbSchema.sync.id,
            set: {
              endedAt: sql`excluded.ended_at`,
              duration: sql`excluded.duration`,
            },
          });
      });

    return {
      id: initialPayload.id,
      type,
      item,
      status: "PENDING",
    };
  };
