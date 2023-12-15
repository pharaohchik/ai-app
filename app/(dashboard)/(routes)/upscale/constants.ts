import * as z from "zod";

export const formSchema = z.object({

    fileUrl: z.string().min(1, {
      message: "smth is required"
    })
});