"use client"
import {ICategory} from "@/models/ICategory";
import {FC} from "react";
import {CategoryService} from "@/services/api.service";

interface IProps {
    category: ICategory;
    onDeleted: (id: string) => void;
    editMode: boolean;
    categoryFilter:(value:string | null) => void;
}

const Category: FC<IProps> = ({category, onDeleted,editMode, categoryFilter}) => {

    const handleDeleteCategory = async (id: string) => {
        try {
            if(category.id) await CategoryService.deleteCategory(id)
            onDeleted(id)
        }catch (err){
            console.error("Error deleting category", err)
        }
    }

    return (
        <div className="flex">
            <h2 className="h-[2vw] cursor-pointer flex items-center bg-background rounded-full pl-[1vw] pr-[1vw] border-foreground border-[1.5px]"
            onClick={() => categoryFilter(category.id!)}>
                #{category.category}
            </h2>
            {
                editMode && (<button onClick={()=> handleDeleteCategory(category.id!)}>
                    <img src="/icons/cancel.png" alt="cancel" className="w-[2vw]"/></button>)
            }
        </div>
    )
}
export default Category;