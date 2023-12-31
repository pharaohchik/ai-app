import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1, { message: "Please enter an image prompt" }),
    amount: z.string().min(1),
    resolution: z.string().min(1),
});

export const amountOptions = [
    {value: '1', label: '1 фото'},
    {value: '2', label: '2 фото'},
    {value: '3', label: '3 фото'},
    {value: '4', label: '4 фото'},
    {value: '5', label: '5 фото'},
    
];

export const resolutionOptions = [
    //{value: '256x256', label: '256x256'}, // unsoported with dalle-3
    {value: '512x512', label: '512x512'},
    {value: '1024x1024', label: '1024x1024'},
]