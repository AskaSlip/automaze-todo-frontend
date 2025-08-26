"use client"

import CreateTask from "@/components/Tasks/CreateTask/CreateTask";
import {useEffect, useState} from "react";
import TasksList from "@/components/Tasks/TasksList";
import {ITask} from "@/models/ITask";
import {CategoryService, TaskService} from "@/services/api.service";
import {SortEnum} from "@/enums/sort.enum";
import {StatusEnum} from "@/enums/status.enum";
import {ICategory} from "@/models/ICategory";
import AsideMenu from "@/components/AsideMenu";
import Task from "@/components/Tasks/Task";
import FilterMenu from "@/components/FilterMenu";
import {DateEnum} from "@/enums/date.enum";

export default function Home() {

    const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [categories, setCategories] = useState<ICategory[] | []>([])
    const [sortOption, setSortOption] = useState<SortEnum | null>(null)
    const [statusFilter, setStatusFilter] = useState<StatusEnum | null>(null)
    const [searchValue, setSearchValue] = useState<string | null>(null)
    const [activeTask, setActiveTask] = useState<ITask | null>(null)
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
    const [categorySortValue, setCategorySortValue] = useState<string | null>(null)
    const [sortByDate, setSortByDate] = useState<DateEnum | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const params: any = {};

                if (sortOption) params.sortByPriority = sortOption;
                if (statusFilter) params.status = statusFilter;
                if (searchValue) params.search = searchValue;
                if (categorySortValue) params.sortByCategory = categorySortValue;
                if (sortByDate) params.dateFilter = sortByDate;

                const {data: tasks} = await TaskService.getTasks(
                    Object.keys(params).length ? params : undefined
                );

                setTasks(tasks);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };
        fetchTasks();
    }, [sortOption, statusFilter, searchValue, categorySortValue, sortByDate]);

    useEffect(() => {
        const fetchedCategories = async () => {
            try {
                const categs = await CategoryService.getCategories();
                setCategories(categs);
            } catch (err) {
                console.error("Error getting category", err)
            }
        }
        fetchedCategories()
    }, []);

    const handleTaskCreated = (newTask: ITask) => {
        setTasks(prev => [...prev, newTask]);
    };

    const handleTaskUpdated = (updated: ITask) => {
        setTasks(prev => prev.map(task => task.id === updated.id ? updated : task));
        if (activeTask?.id === updated.id) {
            setActiveTask(updated);
        }
    };

    const handleTaskDeleted = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const handleAddedCategory = (category: ICategory) => {
        setCategories(prevState => [...prevState, category]);
    }

    return (
        <div className="h-full w-full flex justify-between relative">
            <AsideMenu categoryFilter={setCategorySortValue} dateFilter={setSortByDate} setSearchValue={setSearchValue} categories={categories} onCreated={handleAddedCategory}/>
            <div className="flex flex-col gap-[2vw] w-[40%] p-[2vh] ">
                {!isFilterOpen ?
                    <button onClick={() => setIsFilterOpen(true)}
                            className="w-full flex gap-[1vw] items-center ">
                        <img src="/icons/menu.png"
                             alt="menu" className="w-[3vw]"/> <h1 className="text-2xl">Organize how you want</h1>
                    </button> :
                    <nav className="flex gap-[1vw]">
                        <button className="w-[3vw]" onClick={() => setIsFilterOpen(false)}><img src="/icons/cancel.png"
                                                                                                alt="cancel"/></button>
                        <FilterMenu setSortOption={setSortOption} setStatusFilter={setStatusFilter}/>
                    </nav>
                }
                <div className="max-h-[30vh] w-[25vw] bg-accent/50 rounded-lg flex justify-center items-center">
                    {
                        !isOpenCreate ? (
                                <button onClick={() => setIsOpenCreate(!isOpenCreate)}
                                        className="h-[5vh] flex gap-[1vw] items-center">
                                    <h2>Add new task</h2>
                                    <img src="/icons/edit.png" alt="edit" className="w-[2vw]"/>
                                </button>) :
                            (<CreateTask setIsFormOpen={setIsOpenCreate} onCreated={handleTaskCreated}/>)
                    }
                </div>
                <TasksList tasks={tasks}
                           activeTask={setActiveTask}
                           onUpdated={handleTaskUpdated}
                />
            </div>
            <div className="w-[35%] h-full">
                {
                    activeTask && <Task task_id={activeTask.id!} activeTask={activeTask}
                                        categories={categories} onDelete={handleTaskDeleted}/>
                }
            </div>
        </div>
    );
}
