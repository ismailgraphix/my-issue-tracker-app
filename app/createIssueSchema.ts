import { z } from "zod";
export const createIssueSchema = z.object({
    title: z.string().min(1).max(225),
    description: z.string().min(1)
});