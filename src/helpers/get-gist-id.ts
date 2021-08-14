import {
    DEFAULT_CONFIG_GIST_ID,
    HERMIONE_CONFIG_GIST_ID,
    PLAYWRIGHT_CONFIG_GIST_ID,
    PUPPETEER_CONFIG_GIST_ID,
} from 'src/constants/gists';
import type { TTemplateTypes } from 'src/types/args';

const GIST_MAP: Record<TTemplateTypes, string> = {
    hermione: HERMIONE_CONFIG_GIST_ID,
    playwright: PLAYWRIGHT_CONFIG_GIST_ID,
    puppeteer: PUPPETEER_CONFIG_GIST_ID,
};

const getGistId = (template?: TTemplateTypes): string => {
    if (template && template in GIST_MAP) {
        return GIST_MAP[template as keyof typeof GIST_MAP];
    }

    return DEFAULT_CONFIG_GIST_ID;
};

export { getGistId };
