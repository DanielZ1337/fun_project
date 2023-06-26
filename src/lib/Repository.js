import axios from 'axios';

class RepositoryFile {
    constructor({path, mode, type, sha, size, url}) {
        this.name = path.split('/').pop();
        this.path = path;
        this.mode = mode;
        this.type = type;
        this.sha = sha;
        this.size = size;
        this.url = url;
    }
}

class RepositoryFolder {
    constructor({path, mode, type, sha, url}) {
        this.name = path.contains('/') ? path.split('/').pop() : path;
        this.path = path;
        this.mode = mode;
        this.type = type;
        this.sha = sha;
        this.url = url;
        this.parent = null;
        this.folders = [];
        this.files = [];
    }

    addFolder(RepositoryFolder) {
        if (this.folders.find((folder) => folder.name === RepositoryFolder.name)) {
            throw new Error(`Folder ${RepositoryFolder.name} already exists`);
        }

        RepositoryFolder.parent = this;
        this.folders.push(RepositoryFolder);

        return RepositoryFolder;
    }

    addFile(RepositoryFile) {
        if (this.files.find((file) => file.path === RepositoryFile.path)) {
            throw new Error(`File ${RepositoryFile.name} already exists`);
        }

        this.files.push(RepositoryFile);

        return RepositoryFile;
    }

    findFolderByName(folderName) {
        const folder = this.folders.find((folder) => folder.name === folderName);
        if (!folder) {
            throw new Error(`Folder ${folderName} not found`);
        }
        return folder;
    }

    findFileByName(fileName) {
        const file = this.files.find((file) => file.name === fileName);
        if (!file) {
            throw new Error(`File ${fileName} not found`);
        }
        return file;
    }
}

class RepositoryTree {
    constructor(repositoryName, {sha, url}) {
        this.sha = sha;
        this.url = url;
        this.root = new RepositoryFolder({path: repositoryName});
    }

    addFolder(RepositoryFolder) {
        const pathArray = RepositoryFolder.path.split('/');
        let currentFolder = this.root;
        for (let i = 0; i < pathArray.length; i++) {
            const folderName = pathArray[i];
            const folder = currentFolder.folders.find(
                (folder) => folder.name === folderName
            );
            if (folder) {
                currentFolder = folder;
            } else {
                currentFolder = currentFolder.addFolder(
                    new RepositoryFolder({path: folderName})
                );
            }
        }
        return currentFolder;
    }

    addFile(RepositoryFile) {
        if (!RepositoryFile.path) {
            throw new Error(`File ${RepositoryFile.name} does not have a path`);
        }

        if (!RepositoryFile.path.includes('/')) {
            this.root.addFile(RepositoryFile);
            return;
        }

        const folder = this.findFolderByPath(
            RepositoryFile.path.split('/').slice(0, -1).join('/')
        );
        if (!folder) {
            throw new Error(
                `Folder ${RepositoryFile.path
                    .split('/')
                    .slice(0, -1)
                    .join('/')} not found`
            );
        }

        folder.addFile(RepositoryFile);
    }

    findFileByPath(path) {
        const folder = this.findFolderByPath(
            path.split('/').slice(0, -1).join('/')
        );
        const fileName = path.split('/').pop();
        const file = folder.files.find((file) => file.name === fileName);
        if (!file) {
            throw new Error(`File ${fileName} not found`);
        }
        return file;
    }

    findFolderByPath(path) {
        const pathArray = path.split('/');
        let currentFolder = this.root;
        for (let i = 0; i < pathArray.length; i++) {
            const folderName = pathArray[i];
            const folder = currentFolder.folders.find(
                (folder) => folder.name === folderName
            );
            if (!folder) {
                throw new Error(`Folder ${folderName} not found`);
            }
            currentFolder = folder;
        }
        return currentFolder;
    }
}

class Repository {
    constructor(repositoryName, repositoryContent) {
        this.name = repositoryName;
        this.tree = new RepositoryTree(
            repositoryName,
            repositoryContent.find((content) => content.name === 'master')
        );
        this.files = this.tree.root.files;
        this.folders = this.tree.root.folders;
    }
}

class RepositoryService {
    constructor() {
        this.repositories = {};
    }

    async getRepository(repositoryName) {
        if (this.repositories[repositoryName]) {
            return this.repositories[repositoryName];
        }

        const repository = new Repository(
            repositoryName,
            await this.getRepositoryContent(repositoryName)
        );
        this.repositories[repositoryName] = repository;
        return repository;
    }

    async getRepositoryContent(repositoryName) {
        const response = await axios.get(
            `https://api.github.com/repos/DanielZ1337/${repositoryName}/contents/`
        );
        if (response.status !== 200) {
            throw new Error(`Error getting repository ${repositoryName} content`);
        }
        return await response.data;
    }

    async getFileContent(repositoryName, path) {
        const response = await axios.get(
            `https://api.github.com/repos/DanielZ1337/${repositoryName}/contents/${path}`
        );
        if (response.status !== 200) {
            throw new Error(`Error getting file ${path} content`);
        }

        return await response.data;
    }

    async getFolderContent(repositoryName, path) {
        const response = await axios.get(
            `https://api.github.com/repos/DanielZ1337/${repositoryName}/contents/${path}`
        );
        if (response.status !== 200) {
            throw new Error(`Error getting folder ${path} content`);
        }
        return await response.data;
    }

    async getRepositoryFile(repositoryName, path) {
        const response = await axios.get(
            `https://api.github.com/repos/DanielZ1337/${repositoryName}/contents/${path}`
        );
        if (response.status !== 200) {
            throw new Error(`Error getting file ${path} content`);
        }
        return new RepositoryFile(await response.data);
    }

    async getRepositoryFolder(repositoryName, path) {
        const response = await axios.get(
            `https://api.github.com/repos/DanielZ1337/${repositoryName}/contents/${path}`
        );
        if (response.status !== 200) {
            throw new Error(`Error getting folder ${path} content`);
        }
        return new RepositoryFolder(await response.data);
    }
}

export default RepositoryService;
