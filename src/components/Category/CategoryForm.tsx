"use client"

import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddCategoryFormData, AddCategorySchema} from "@/validator/validation";
import {CategoryService} from "@/services/api.service";
import {ICategory} from "@/models/ICategory";
import {FC} from "react";

interface IProps {
    onCreated: (data: ICategory) => void;
    formState: (state:boolean) => void;
}

const CategoryForm:FC<IProps> = ({onCreated,formState}) => {
    const {
        handleSubmit,
        register,
        reset,
        formState: {errors}
    } = useForm<AddCategoryFormData>({
        resolver: zodResolver(AddCategorySchema)
    })

    const handleAddCategory: SubmitHandler<AddCategoryFormData> = async (data) => {
        try {
            await CategoryService.addCategory(data)
            onCreated(data)
            formState(false)
            reset()
        }catch(err){
            console.error("Error adding Category: ", err)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleAddCategory)} className="flex items-center gap-[0.5vw]">
            <input type="text" {...register('category')} placeholder="Enter your category" className="custom-input bg-background rounded-md outline-0 "/>
            {errors?.category && <p>{errors.category.message}</p>}
            <button type="submit"><img src="/icons/add.png" alt="add" className="w-[2.5vw]"/></button>
        </form>
    )
}
export default CategoryForm;