import {
    DEFAULT_CONFIG_GIST_ID,
    HERMIONE_CONFIG_GIST_ID,
    PLAYWRIGHT_CONFIG_GIST_ID,
} from 'src/constants/gists';
import { fsExists } from 'src/helpers/fs-exists';
import { writeFile } from 'src/helpers/write-file';
import { fetchGist } from 'src/helpers/fetch-gist';
import { generateModuleNames } from 'src/helpers/generate-module-names';

import type { TInitArgs, TTemplateTypes } from 'src/types/args';

const GIST_MAP: Record<TTemplateTypes, string> = {
    hermione: HERMIONE_CONFIG_GIST_ID,
    playwright: PLAYWRIGHT_CONFIG_GIST_ID,
};

const init = async ({ template }: TInitArgs): Promise<void> => {
    const moduleNames = generateModuleNames('storytests');

    const exists = (await Promise.all(moduleNames.map(fsExists))).some(Boolean);

    if (exists) {
        throw new Error('Configuration already exists');
    }

    const gistId = template ? GIST_MAP[template] : DEFAULT_CONFIG_GIST_ID;

    const gist = await fetchGist(gistId);

    await Promise.all(
        Object.keys(gist.files).map((filename) => {
            return writeFile(filename, gist.files[filename].content);
        }),
    );
};

export { init };
