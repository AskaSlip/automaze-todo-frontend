"use client"

import {ITask} from "@/models/ITask";
import {FC, useEffect, useState} from "react";
import Priority from "@/components/Tasks/CreateTask/Priority";
import {CategoryService, TaskService} from "@/services/api.service";
import {ICategory} from "@/models/ICategory";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {StatusEnum} from "@/enums/status.enum";

interface IProps {
    task_id: string;
    onDelete: (id: string) => void;
    categories: ICategory[];
    activeTask?: ITask | null;

}

const Task: FC<IProps> = ({task_id, onDelete, categories, activeTask}) => {
    const [task, setTask] = useState<ITask | null>(null)
    const [priorityVal, setPriorityVal] = useState<number>(1);
    const [taskCategory, setTaskCategory] = useState<ICategory | null>(null);

    useEffect(() => {
        const fetchedTask = async () => {
            try {
                const res = await TaskService.getById(task_id);
                setPriorityVal(res.priority ?? 1);
                setTask(res);
            } catch (err) {
                console.error("Failed to get task", err);
            }
        }
        fetchedTask()
    }, [task_id, activeTask]);

    useEffect(() => {
        if (!task) return;
        if (!task.category_id) {
            setTaskCategory(null);
            return;
        }
        const fetchCategory = async () => {
            try {
                const category = await CategoryService.getById(task.category_id!);
                setTaskCategory(category);
            } catch (err) {
                console.error("Failed to fetch category", err);
                setTaskCategory(null);
            }
        };

        fetchCategory();
    }, [task?.category_id, task_id]);

    if (!task) return;


    const handlePriorityChange = async (newPriority: number) => {
        setPriorityVal(newPriority);
        try {
            const updatedTask = await TaskService.updateTask(
                {priority: newPriority},
                task.id!
            );
            setTask(updatedTask)
        } catch (err) {
            console.error("Failed to update task priority", err);
        }
    };

    const handleDeleteTask = async () => {
        try {
            await TaskService.deleteTask(task.id!);
            onDelete(task.id!);
            setTask(null);
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    }

    const handleAssignCategory = async (task_id: string, category_id: string) => {
        try {
            await TaskService.assignCategory(task_id, category_id)
            const newCategory = categories.find(cat => cat.id === category_id) || null;
            setTaskCategory(newCategory);
            const updated = {...task, category_id} as ITask;
            setTask(updated);
        } catch (err) {
            console.error("Failed to assign category", err)
        }
    }

    const handleDeleteCategory = async () => {
        if (!task.id) return;
        try {
            await TaskService.deleteCategory(task.id);
            setTaskCategory(null)
        } catch (err) {
            console.error('Failed to delete category', err)
        }
    }


    return (
        <div
            className="w-full h-[47vh] p-[1.5vw] rounded-md bg-accent/50 border-primary flex flex-col items-end justify-between"
        >
            <button className="w-[2.5vw]" onClick={()=> setTask(null)}><img
                src="/icons/cancel.png" alt="close"/></button>
            <div className="w-full flex flex-col gap-[2vh]">
                <h1 className="text-4xl">Task:</h1>
                    <p className="text-lg">{task.task}</p>
                <h2 className={`border-2 flex items-center justify-center w-[7vw] h-[4vh] rounded-md ${task.status === StatusEnum.DONE ? "bg-primary/80 border-primary" : "bg-secondary/80 border-secondary"}`}>{task.status}</h2>
                    <p>Due date: <i>{task.dueDate}</i></p>
                    {
                        taskCategory?.category ?
                            (<div className="flex items-center gap-2">
                                <h2 className="h-[2vw] flex items-center bg-background rounded-full pl-[1vw] pr-[1vw] border-foreground border-[1.5px]">#{taskCategory.category}</h2>
                                <button onClick={handleDeleteCategory} className="w-[2vw]"><img src="/icons/cancel.png" alt="cancel"/></button>
                            </div>)
                            : (
                                <Select
                                    onValueChange={(categoryId) => handleAssignCategory(task.id!, categoryId)}
                                >
                                    <SelectTrigger className="w-[15vw] bg-secondary/70 outline-0 border-none">
                                        <SelectValue placeholder="Select a category"/>
                                    </SelectTrigger>
                                    <SelectContent className="bg-background outline-0 border-none">
                                        <SelectGroup>
                                            {
                                                categories.map(cat => (
                                                    <SelectItem key={cat.id}
                                                                className="focus:bg-secondary/70"
                                                                value={cat.id!}>{cat.category.toLowerCase()}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                    }
                <div className="flex gap-[1vw] ">
                    <h2 className="text-lg">Priority:</h2>
                    <Priority priorityValue={handlePriorityChange} currentPriority={priorityVal}/>
                </div>
            </div>
            <button className="w-[2.5vw]" onClick={handleDeleteTask}><img
                src="/icons/delete.png" alt="delete"/></button>
        </div>
    )
}

export default Task;