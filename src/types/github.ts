type TGitHubFile = {
    filename: string;
    type: string;
    size: string;
    truncated: boolean;
    content: string;
};

type TGitHubGist = {
    id: string;
    url: string;
    files: Record<string, TGitHubFile>;
};

export type { TGitHubFile, TGitHubGist };
