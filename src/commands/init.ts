import { fsExists } from 'src/utils/fs-exists';
import { writeFile } from 'src/utils/write-file';
import { fetchGist } from 'src/utils/fetch-gist';
import { getGistId } from 'src/utils/get-gist-id';
import { generateModuleNames } from 'src/utils/generate-module-names';

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
