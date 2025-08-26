import {ITask, ITaskUpdate} from "@/models/ITask";
import axios from "axios";
import {ITaskResponse} from "@/models/ITaskResponse";
import {ICategory} from "@/models/ICategory";

const apiUrl = 'http://localhost:5000';

const TaskService = {
    createTask: async (data: ITask): Promise<ITask> => {
        try {
            const response = await axios.post(`${apiUrl}/tasks/task`, data);
            return response.data;
        } catch (err) {
            console.error("Error creating task:", err);
            throw new Error("Failed to create task");
        }
    },
    updateTask: async (data: ITaskUpdate, task_id: string): Promise<ITask> => {
        try {
            const response = await axios.patch(`${apiUrl}/tasks/${task_id}`, data);
            return response.data;
        } catch (err) {
            console.error("Error updating task:", err);
            throw new Error("Failed to update task");
        }
    },
    deleteTask: async (task_id: string): Promise<void> => {
        try {
            await axios.delete(`${apiUrl}/tasks/${task_id}`);
        } catch (err) {
            console.error("Error deleting task:", err);
            throw new Error("Failed to delete task");
        }
    },
    getTasks: async (params?: Partial<Record<string, string | number | boolean>>): Promise<ITaskResponse> => {
        try {
            const response = await axios.get(`${apiUrl}/tasks`, {params});
            return response.data;
        } catch (err) {
            console.error("Error fetching tasks:", err);
            throw new Error("Failed to fetch tasks");
        }
    },
    getById: async (id: string): Promise<ITask> => {
        try {
            const response = await axios.get(`${apiUrl}/tasks/${id}`);
            return response.data;
        }catch(err) {
            console.error("Error getting task:", err);
            throw new Error("Failed to get task");
        }
    },
    updateStatus: async (task_id: string): Promise<ITask> => {
        try {
            const response = await axios.post(`${apiUrl}/tasks/update-status/${task_id}`);
            return response.data;
        } catch (err) {
            console.error("Error updating status:", err);
            throw new Error("Failed to update status");
        }
    },
    assignCategory: async  (task_id: string, category_id: string):Promise<ITask> => {
        try{
            const response =  await axios.post(`${apiUrl}/tasks/assign-category/${task_id}`, {category_id})
            return response.data;
        }catch(err){
            console.error("Error creating task:", err);
            throw new Error("Failed to create task");
        }
    },
    deleteCategory: async  (task_id: string): Promise<ITask> => {
        try {
            const response = await axios.post(`${apiUrl}/tasks/delete-category/${task_id}`);
            return response.data;
        }catch(err){
            console.error("Error deleting task:", err);
            throw new Error("Failed to delete task");
        }
    }
};

const CategoryService = {
    addCategory: async (data: ICategory):Promise<ICategory> => {
        try{
            const response = await axios.post(`${apiUrl}/categories/category`, data)
            return response.data;
        }catch (err){
            console.error("Error creating category:", err);
            throw new Error("Failed to create category");
        }
    },
    deleteCategory: async (category_id: string):Promise<void> => {
        try {
            await axios.delete(`${apiUrl}/categories/${category_id}`);
        }catch(err){
            console.error("Error deleting category:", err);
            throw new Error("Failed to delete category");
        }
    },
    getCategories: async (): Promise<ICategory[]> => {
        try {
            const response = await axios.get(`${apiUrl}/categories`)
            return response.data;
        }catch(err){
            console.error("Error getting categories:", err);
            throw new Error("Failed to get categories");
        }
    },
    getById: async (id: string): Promise<ICategory> => {
        try {
            const response = await axios.get(`${apiUrl}/categories/${id}`);
            return response.data;
        }catch(err){
            console.error("Error deleting category:", err);
            throw new Error("Failed to get category");
        }
    }
}

export {TaskService, CategoryService}