import {StatusEnum} from "@/enums/status.enum";

export interface ITask {
    id?: string;
    task: string
    status?: StatusEnum;
    priority?: number;
    dueDate?: string;

    category_id?: string;
}

export interface ITaskUpdate{
    priority?: number;
}