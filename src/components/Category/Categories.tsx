"use client"

import {FC, useEffect, useState} from "react";
import {ICategory} from "@/models/ICategory";
import Category from "@/components/Category/Category";

interface IProps {
    categories: ICategory[]
    editMode: boolean;
    categoryFilter: (value: string | null) => void;
}

const Categories: FC<IProps> = ({categories, editMode,categoryFilter}) => {
    const [currentCategories, setCurrentCategories] = useState<ICategory[] | []>([])

    useEffect(() => {
        setCurrentCategories(categories)
    }, [categories]);


    const handleCategoryDeleted = (id: string) => {
        setCurrentCategories(prev => prev.filter(cat => cat.id !== id));
    };

    return (
            <div className="w-full flex flex-wrap gap-3">
                {
                    currentCategories.map((category) => (
                        <Category categoryFilter={categoryFilter} key={category.id} category={category} editMode={editMode} onDeleted={handleCategoryDeleted}/>
                    ))
                }
            </div>
    )
}

export default Categories;