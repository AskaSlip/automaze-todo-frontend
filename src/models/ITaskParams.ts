import {StatusEnum} from "@/enums/status.enum";
import {SortEnum} from "@/enums/sort.enum";

export interface ITaskParams {
    [key: string]: string | number | boolean | undefined;
    sortByPriority?: SortEnum;
    status?: StatusEnum;
    search?: string;
    sortByCategory?: string;
    dateFilter?: string;
}