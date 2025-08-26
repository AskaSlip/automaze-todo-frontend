"use client"
import {useTheme} from "next-themes";

const Header = () => {
    const {theme, setTheme} = useTheme();
    return (
        <header className="w-full h-[10vh] flex items-center justify-between p-[1vw] sticky top-0 z-50 bg-primary">
            <h1 className="text-5xl">TO DO it!</h1>
            <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="w-[40px]"
            >
                {theme === "dark" ? (
                    <img src="/icons/moon.png" alt="moon"/>
                ):(
                    <img src="/icons/sun.png" alt="sun"/>
                )}
            </button>
        </header>
    )
}

export default Header;