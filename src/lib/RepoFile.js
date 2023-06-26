class RepoFile {
    constructor({path, mode, type, sha, size, url}) {
        this.name = path.split("/").pop();
        this.path = path;
        this.mode = mode;
        this.type = type;
        this.sha = sha;
        this.size = size;
        this.url = url;
    }
}

export default RepoFile;
