import RepoFile from "./RepoFile.js";

class RepoFolder {
    constructor(folderName) {
        this.folderName = folderName;
        this.parent = null;
        this.folders = [];
        this.files = [];
    }

    addFolder(folderName) {
        if (this.folders.find((folder) => folder.folderName === folderName)) {
            throw new Error(`Folder ${folderName} already exists`);
        }

        const folder = new RepoFolder(folderName);
        folder.parent = this;
        this.folders.push(folder);
        return folder;
    }

    addFile(file) {
        if (this.files.find((f) => f.path === file.path)) {
            return;
        }

        // console.log(file.path);

        const newFile = new RepoFile(file);
        this.files.push(newFile);
        return newFile;
    }
}

export default RepoFolder;
