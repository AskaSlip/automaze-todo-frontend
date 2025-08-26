import { z } from "zod";
import {StatusEnum} from "@/enums/status.enum";

export const CreateTaskSchema = z.object({
    task: z.string().min(1, "Task is required"),
    priority: z.number().min(1).max(10).optional(),
    dueDate: z.string().optional(),
    status: z.enum(StatusEnum).optional()
})

export const AddCategorySchema = z.object({
    category: z.string(),
})

export type CreateTaskFormData = z.infer<typeof CreateTaskSchema>;
export type AddCategoryFormData = z.infer<typeof AddCategorySchema>;