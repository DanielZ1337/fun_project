export interface Repository {
    sha: string;
    url: string;
}

export interface RepositoryFolder {
    path: string;
    mode: string;
    type: string;
    sha: string;
    url: string;
}

export interface RepositoryFile {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
}