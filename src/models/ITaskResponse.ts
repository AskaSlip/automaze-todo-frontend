import {ITask} from "@/models/ITask";
import {StatusEnum} from "@/enums/status.enum";
import {SortEnum} from "@/enums/sort.enum";

export interface ITaskResponse {
    data: ITask[];
    total: number;
    status?: StatusEnum;
    sortByPriority?: SortEnum;
    search?: string;
    limit: number;
    offset: number;
}