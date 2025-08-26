export default function NotFoundPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <img src="/not-found.png" alt="not found"/>
            <div className="flex flex-col">
                <h1 className="text-5xl">Oops!</h1>
                <h2>The page is not found :(</h2>
            </div>
        </div>
    );
}