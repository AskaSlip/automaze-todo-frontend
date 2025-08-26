"use client"
import {FC, useState} from "react";
import {ICategory} from "@/models/ICategory";
import CategoryForm from "@/components/Category/CategoryForm";
import Categories from "@/components/Category/Categories";
import {DateEnum} from "@/enums/date.enum";

interface IProps {
    setSearchValue: (val: string | null) => void;
    categories: ICategory[];
    onCreated: (data: ICategory) => void;
    dateFilter: (DateEnum: DateEnum | null) => void;
    categoryFilter: (value: string | null) => void;
}

const AsideMenu: FC<IProps> = ({setSearchValue, categories, onCreated, dateFilter, categoryFilter}) => {
    const [searchInput, setSearchInput] = useState<string | null>(null)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    return (
        <nav className="w-[20%] h-full flex flex-col gap-[5vh] bg-accent/50 rounded-md p-[1vh]">
            <form className="flex w-full items-center justify-between" onSubmit={(e) => {
                e.preventDefault();
                setSearchValue(searchInput);
            }}>
                <input type="text" placeholder="Search the task"
                       className="custom-input w-[80%] bg-background rounded-md outline-0 "
                       value={searchInput ?? ""}
                       onChange={(e) => setSearchInput(e.target.value)}/>
                <button type="submit"><img src="/icons/search.png" alt="search" className="w-[2.5vw]"/></button>
            </form>
            <ul>
                <h2 className="text-2xl">Tasks</h2>
                <li onClick={() => dateFilter(null)} className="cursor-pointer">All</li>
                <li onClick={() => dateFilter(DateEnum.TODAY)} className="cursor-pointer">Today</li>
                <li onClick={() => dateFilter(DateEnum.UPCOMING)} className="cursor-pointer">Upcoming</li>
            </ul>
            <div className="flex flex-col gap-[1vh]">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl">Tags</h2>
                    <div className="flex gap-[1vw]">
                        {
                            categoryFilter &&
                            <button onClick={() => categoryFilter(null)}><img src="/icons/clear-filter.png" alt="clear"
                                                                              className="w-[2.5vw]"/></button>
                        }
                        <button onClick={() => setIsEditing(!isEditing)}><img src="/icons/settings.png" alt="set"
                                                                              className="w-[2.5vw]"/></button>
                    </div>
                </div>

                {
                    !isFormOpen ? (<button className="bg-secondary/80 hover:bg-secondary h-[4vh] rounded-md w-full"
                                           onClick={() => setIsFormOpen(true)}>
                        <h2>Add your tag</h2></button>) : (
                        <CategoryForm formState={setIsFormOpen} onCreated={onCreated}/>)
                }
                <Categories categoryFilter={categoryFilter} editMode={isEditing} categories={categories}/>
            </div>
        </nav>
    )
}
export default AsideMenu;