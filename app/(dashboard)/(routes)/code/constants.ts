import * as z from "zod";

export const formSchema = z.object({
    promt: z.string().min(1, { message: "Please enter a prompt" }),
})