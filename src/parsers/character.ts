import { z } from "zod";

export const characterParser = z.object({
  id: z.number().int(),
  name: z.string(),
});
