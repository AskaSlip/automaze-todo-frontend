"use client"
import * as React from "react"
import {CalendarIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Input} from "@/components/ui/input"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {FC, useEffect, useState} from "react";
import {cn} from "@/lib/utils";

function formatDate(date: Date | undefined) {
    if (!date) {
        return ""
    }

    return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}

function isValidDate(date: Date | undefined) {
    if (!date) {
        return false
    }
    return !isNaN(date.getTime())
}

function formatForBackend(date: Date | undefined) {
    if (!date) return undefined
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

interface IProps {
    setDateValue: (date: string | undefined) => void
}


const CalendarComponent: FC<IProps> = ({setDateValue}) => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(
        new Date()
    )
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(formatDate(date))
    const [activeDate, setActiveDate] = useState(formatForBackend(date))
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        setDateValue(activeDate)
    }, [date]);

    return (
        <div className="relative flex w-[20vw] gap-2">
            <Input
                value={value}
                placeholder="June 01, 2025"
                className="bg-background focus:border-accent focus:border-2 h-[4vh]"
                onChange={(e: any) => {
                    const date = new Date(e.target.value)
                    setValue(e.target.value)
                    if (isValidDate(date)) {
                        setDate(date)
                        setMonth(date)
                        setActiveDate(formatForBackend(date))
                    }
                }}
                onKeyDown={(e: any) => {
                    if (e.key === "ArrowDown") {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                        <CalendarIcon className="size-3.5"/>
                        <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                    alignOffset={-8}
                    sideOffset={10}
                >
                    <Calendar
                        className={cn("w-[20vw]")}
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        month={month}
                        fromYear={currentYear}
                        toYear={currentYear+20}
                        onMonthChange={setMonth}
                        onSelect={(date) => {
                            setDate(date)
                            setValue(formatDate(date))
                            setActiveDate(formatForBackend(date))
                            setOpen(false)
                        }}
                        disabled={(date) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return date < today
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default CalendarComponent;
