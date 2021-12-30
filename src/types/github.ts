type GitHubFile = {
    filename: string;
    type: string;
    size: string;
    truncated: boolean;
    content: string;
};

type GitHubGist = {
    id: string;
    url: string;
    files: Record<string, GitHubFile>;
};

export type { GitHubFile, GitHubGist };
