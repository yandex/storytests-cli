import fetch from 'node-fetch';

import { GITHUB_GISTS_API } from 'src/constants/github';
import type { TGitHubGist } from 'src/types/github';

const fetchGist = async (id: string): Promise<TGitHubGist> => {
    const result = await fetch(GITHUB_GISTS_API + '/' + id, {
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    });

    if (!result.ok) {
        throw new Error('[GIST] Unable to download gist ' + id);
    }

    try {
        const gist = (await result.json()) as TGitHubGist;

        return gist;
    } catch (_) {
        throw new Error('[GIST] Unable to parse gist ' + id);
    }
};

export { fetchGist };
