"use client"

import {FC} from "react";
import {ITask} from "@/models/ITask";
import {TaskService} from "@/services/api.service";
import {Checkbox} from "@/components/ui/checkbox";
import {StatusEnum} from "@/enums/status.enum";

interface IProps {
    tasks: ITask[];
    onUpdated: (task: ITask) => void;
    activeTask: (task: ITask) => void;
}
const TasksList: FC<IProps> = ({tasks, onUpdated, activeTask}) => {
    const handleChangeStatus = async (id: string) => {
        try {
            const updatedTask = await TaskService.updateStatus(id)
            onUpdated?.(updatedTask)
        } catch (err) {
            console.error("Failed to update status", err)
        }
    }

    return (
        <div className="w-full h-[60vh] flex flex-col gap-[3vh] overflow-y-auto overflow-x-hidden custom-scrollbar">
            {tasks.map((task: ITask) => (
                <div key={task.id}
                     onClick={() => activeTask(task)}
                     className={`w-full min-h-[5vh] cursor-pointer rounded-md bg-accent/50 flex items-center p-[1vw] gap-[1vw] ${task.status === StatusEnum.DONE && "bg-primary/50 opacity-50"}`}>
                    <Checkbox
                        className="w-6 h-6"
                        onCheckedChange={(checked) => handleChangeStatus(task.id!)}
                        checked={task.status === StatusEnum.DONE}
                    />
                    <h2>{task.task}</h2>
                </div>
            ))}
        </div>
    )
}
export default TasksList;