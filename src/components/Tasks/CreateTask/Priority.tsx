"use client"

import {FC, useEffect, useState} from "react";

interface IProps {
    priorityValue: (priority: number) => void
    currentPriority?: number
}
const Priority: FC<IProps> = ({priorityValue, currentPriority}) => {

    const [priority, setPriority] = useState<number>(1);

    useEffect(() => {
        if (currentPriority) {
            setPriority(currentPriority);
        }
    }, [currentPriority]);

    const handleClick = (newPriority: number) => {
        setPriority(newPriority);
        priorityValue(newPriority);
    };

    return (
        <div className=" w-full flex justify-between">
            {[...Array(10)].map((_, i) => (
                <div key={i}
                     className={`w-[25px] bg-accent/60 flex items-center justify-center rounded-md gap-[0.2vw] cursor-pointer ${i === priority - 1 && priority !== 0 && 'scale-150 font-bold text-secondary'}`}
                     onClick={() => handleClick(i + 1)}
                >
                    <h2 className="text-[1.1rem]">{i + 1}</h2>
                </div>
            ))}
        </div>
    );
};

export default Priority;