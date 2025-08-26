"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {TaskService} from "@/services/api.service";
import {FC, useState} from "react";
import CalendarComponent from "@/components/Tasks/CreateTask/CalendarComponent";
import {CreateTaskFormData, CreateTaskSchema} from "@/validator/validation";
import {zodResolver} from '@hookform/resolvers/zod';
import Priority from "@/components/Tasks/CreateTask/Priority";
import {StatusEnum} from "@/enums/status.enum";

interface IProps {
    setIsFormOpen: (value: boolean) => void
    onCreated: (newTask: any) => void
}

const CreateTask: FC<IProps> = ({setIsFormOpen, onCreated}) => {

    const [dateValue, setDateValue] = useState<string | undefined>()
    const [taskPriority, setTaskPriority] = useState<number>(1)

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CreateTaskFormData>({
        resolver: zodResolver(CreateTaskSchema)
    })

    const handleCreateTask: SubmitHandler<CreateTaskFormData> = async (data): Promise<void> => {
        try {
            const newTask = await TaskService.createTask({
                ...data,
                dueDate: dateValue,
                priority: taskPriority,
                status: StatusEnum.UNDONE
            })
            reset();
            onCreated(newTask);
            setIsFormOpen(false)
        } catch (err) {
            console.error("Error creating task:", err);
        }
    }

    return (
        <div className="w-full h-[27vh] flex flex-col gap-[1vh] items-end p-[1vh] rounded-lg">
            <button onClick={() => setIsFormOpen(false)} className="w-[2vw]"><img src="/icons/cancel.png"
                                                                                  alt="cancel"/></button>
            <form onSubmit={handleSubmit(handleCreateTask)}
                  className="h-full w-full flex flex-col items-center gap-[1.5vh]">
                <input type="text" {...register('task')} placeholder="Enter your task" className="w-[20vw] rounded-md custom-input outline-0 focus:border-2 focus:border-accent bg-background"/>
                {errors.task && <p className="text-secondary">{errors.task.message}</p>}
                <CalendarComponent setDateValue={setDateValue}/>
                <div className="w-[22vw]"><Priority priorityValue={setTaskPriority} currentPriority={taskPriority}/></div>
                <button type="submit" className="mt-[1vh] h-[4vh] w-[10vw] bg-primary rounded-lg"><h2>Create Task</h2></button>
            </form>
        </div>
    )
}

export default CreateTask;