import { z } from "zod";

export const shortenerSchema = z.object({
  target: z.string().max(1024),
  slug: z.string().optional(),
});
