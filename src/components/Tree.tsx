import RepoFolder from "@/lib/RepoFolder";

const Tree = ({repoFolder}: { repoFolder: RepoFolder }) => {
    return (
        <div>
            {repoFolder.folders.map((folder) => (
                <p
                    onClick={() => {
                        console.log(folder);
                    }}
                    key={folder.folderName}
                >
                    {folder.folderName}
                </p>
            ))}
            {repoFolder.files.map((file) => (
                <p
                    onClick={() => {
                        console.log(file);
                    }}
                    key={file.name}
                >
                    {file.name}
                </p>
            ))}
        </div>
    );
};

export default Tree;
