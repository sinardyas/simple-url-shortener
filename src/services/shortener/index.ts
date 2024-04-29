import { eq, or } from "drizzle-orm";
import type { z } from "zod";
import type { shortenerSchema } from "../../api/v1/shortener/shortener.schema";
import { generateRandomId } from "../../commons/utils/generator";
import { db, dbSchema } from "../../db";

export const shortener = {
  create: async (target: z.infer<typeof shortenerSchema>) => {
    if (target?.slug) {
      const isSlugDuplicate = await db.query.urls.findFirst({
        where: eq(dbSchema.urls.slug, target.slug),
      });

      if (isSlugDuplicate) {
        throw new Error("Duplicate slug");
      }
    }

    const result = await db
      .insert(dbSchema.urls)
      .values({
        id: generateRandomId(),
        target: target.target,
        slug: target?.slug,
      })
      .returning();

    return result;
  },

  get: async (shortCode: string) => {
    const result = await db.query.urls.findFirst({
      where: or(eq(dbSchema.urls.id, shortCode), eq(dbSchema.urls.slug, shortCode)),
    });

    return result;
  },
};
