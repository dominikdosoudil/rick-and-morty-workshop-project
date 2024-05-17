import { z } from "zod";

export const apiResponse = <T extends z.ZodTypeAny>(resultsParser: T) =>
  z.object({
    info: z.object({
      count: z.number().int(),
      pages: z.number().int(),
      next: z.string().url().nullable(),
      prev: z.string().url().nullable(),
    }),
    results: resultsParser,
  });
