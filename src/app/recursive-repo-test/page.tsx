"use client";

export default function Home() {

    return (
        <>
            {/* {currentFolder !== repo._root && (
                <p onClick={() => {
                    setCurrentFolder(currentFolder.parent)
                    setCurrentPath(currentPath.slice(0, currentPath.length - 1))
                }} className={"p-4 bg-green-900/50 cursor-pointer"}>{"<--"} Go back</p>
            )}*/}
            {/*<Breadcrumb>
                {currentPath.length !== 0 && (
                    <BreadcrumbItem>
                        <BreadcrumbLink onClick={() => {
                            setCurrentFolder(repo._root)
                            setCurrentPath([])
                        }}>
                            <HomeSolidIcon
                                className={"w-4 h-4 cursor-pointer hover:stroke-current hover:dark:fill-black hover:fill-white"}/>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                )}
                {currentPath.map((path) => (
                    <BreadcrumbItem key={path}
                                    isCurrentPage={currentPath.join("/") == currentPath.slice(0, currentPath.length - 1).join("/") + (currentPath.length > 1 ? "/" : "") + path}>
                        <BreadcrumbLink onClick={() => {
                            setCurrentFolder(repo.findFolderByPath(currentPath.slice(0, currentPath.indexOf(path) + 1).join("/"))!)
                            setCurrentPath(currentPath.slice(0, currentPath.indexOf(path) + 1))
                        }}>
                            {path}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                ))}
            </Breadcrumb>*/}
        </>
    );
}
