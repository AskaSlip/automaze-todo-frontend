"use client"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {FC} from "react";
import {SortEnum} from "@/enums/sort.enum";
import {StatusEnum} from "@/enums/status.enum";

interface IProps {
    setSortOption: (SortEnum: SortEnum | null) => void;
    setStatusFilter: (StatusEnum: StatusEnum | null) => void;
}

const FilterMenu: FC<IProps> = ({setSortOption, setStatusFilter}) => {

    return (
        <div className="flex gap-[2vw]">
            <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-secondary/70 hover:bg-secondary w-[12vw]"><h2>By priority</h2>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-secondary">
                        <NavigationMenuList className="flex flex-col w-[12vw] outline-0 border-0">
                            <NavigationMenuItem className="w-full text-center hover:bg-secondary">
                                <NavigationMenuLink
                                    className="cursor-pointer"
                                    onClick={() => setSortOption(SortEnum.ASC)}
                                >
                                    High to low
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="w-full text-center hover:bg-secondary">
                                <NavigationMenuLink
                                    className="cursor-pointer"
                                    onClick={() => setSortOption(SortEnum.DESC)}
                                >
                                    Low to high
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
                <NavigationMenuList>
                <NavigationMenuItem className="relative">
                    <NavigationMenuTrigger className="bg-secondary/70 hover:bg-secondary w-[12vw]"><h2>By
                        status</h2></NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-secondary">
                        <NavigationMenuList className="flex flex-col w-[12vw]">
                            <NavigationMenuItem className="w-full text-center hover:bg-secondary">
                                <NavigationMenuLink
                                    className="cursor-pointer"
                                    onClick={() => setStatusFilter(null)}
                                >
                                    All tasks
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="w-full text-center hover:bg-secondary">
                                <NavigationMenuLink
                                    className="cursor-pointer"
                                    onClick={() => setStatusFilter(StatusEnum.DONE)}
                                >
                                    Done
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="w-full text-center hover:bg-secondary">
                                <NavigationMenuLink
                                    className="cursor-pointer"
                                    onClick={() => setStatusFilter(StatusEnum.UNDONE)}
                                >
                                    Undone
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        </div>
    )
}

export default FilterMenu
