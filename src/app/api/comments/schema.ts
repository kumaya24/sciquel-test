import { z } from "zod";

export const commentGetSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    comment: z.string().min(1, {message: "Comment is required"})
});

export const commentPostSchema = z.object({
    test: z.literal("success"),
    posts: z.array(z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        createdAt: z.string()
    }))
});