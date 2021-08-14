import { fsExists } from 'src/helpers/fs-exists';
import { writeFile } from 'src/helpers/write-file';
import { fetchGist } from 'src/helpers/fetch-gist';
import { getGistId } from 'src/helpers/get-gist-id';
import { generateModuleNames } from 'src/helpers/generate-module-names';

import type { TInitArgs } from 'src/types/args';

const init = async ({ template }: TInitArgs): Promise<void> => {
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
