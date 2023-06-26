import RepoFolder from "./RepoFolder.js";

class RepoTree {
    constructor(folderName) {
        this._root = new RepoFolder(folderName);
    }

    addFolder(path) {
        const pathArray = path.split("/");
        let currentFolder = this._root;
        for (let i = 0; i < pathArray.length; i++) {
            const folderName = pathArray[i];
            const folder = currentFolder.folders.find(
                (folder) => folder.folderName === folderName
            );
            if (folder) {
                currentFolder = folder;
            } else {
                currentFolder = currentFolder.addFolder(folderName);
            }
        }
        return currentFolder;
    }

    addFile(file) {
        if (!file.path) {
            throw new Error(`File ${file.name} does not have a path`);
        }

        if (!file.path.includes("/")) {
            this._root.addFile(file);
            return;
        }

        const folder = this.findFolderByPath(
            file.path.split("/").slice(0, -1).join("/")
        );
        if (!folder) {
            throw new Error(
                `Folder ${file.path.split("/").slice(0, -1).join("/")} not found`
            );
        }

        folder.addFile(file);
    }

    findFileByPath(path) {
        const folder = this.findFolderByPath(
            path.split("/").slice(0, -1).join("/")
        );
        const fileName = path.split("/").pop();
        const file = folder.files.find((file) => file.name === fileName);
        if (!file) {
            throw new Error(`File ${fileName} not found`);
        }
        return file;
    }

    findFolderByPath(path) {
        const pathArray = path.split("/");
        let currentFolder = this._root;
        for (let i = 0; i < pathArray.length; i++) {
            const folderName = pathArray[i];
            const folder = currentFolder.folders.find(
                (folder) => folder.folderName === folderName
            );
            if (!folder) {
                throw new Error(`Folder ${folderName} not found`);
            }
            currentFolder = folder;
        }
        return currentFolder;
    }
}

export default RepoTree;
