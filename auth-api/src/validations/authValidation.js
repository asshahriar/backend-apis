import {z} from "zod"


export const registerSchema = z.object({
	name: z.string().trim().min(1).max(50),
	email: z.string().trim().email().toLowerCase(),
	password: z.string().min(6)
})