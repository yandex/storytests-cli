import { fsExists } from '../utils/fs-exists';
import { writeFile } from '../utils/write-file';
import { fetchGist } from '../utils/fetch-gist';
import { getGistId } from '../utils/get-gist-id';
import { generateModuleNames } from '../utils/generate-module-names';

import type { InitArgs } from '../types/args';

const init = async ({ template }: InitArgs): Promise<void> => {
    const moduleNames = generateModuleNames('storytests');

    const exists = (await Promise.all(moduleNames.map(fsExists))).some(Boolean);

    if (exists) {
        throw new Error('Configuration already exists');
    }

    const gistId = getGistId(template);

    const gist = await fetchGist(gistId);

    await Promise.all(
        Object.keys(gist.files).map((filename) => {
            return writeFile(filename, gist.files[filename].content);
        }),
    );
};

export { init };
