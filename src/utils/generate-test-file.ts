import { promises as fs } from 'fs';
import path from 'path';
import { Config } from 'types/config';

import { fsExists } from './fs-exists';

const generateTestFile = async (
    testDirectoryPath: string,
    filename: string,
    componentName: string,
    componentStoryNames: string | string[],
    postfix: string,
    generateTest: Config['generateTest'],
    rewrite = false,
): Promise<void> => {
    const testPath = path.resolve(testDirectoryPath, filename);

    if (!rewrite && (await fsExists(testPath))) {
        return;
    }

    const content = generateTest(componentName, componentStoryNames, postfix);

    if (content === false) {
        return;
    }

    if (!(await fsExists(testDirectoryPath))) {
        await fs.mkdir(testDirectoryPath, { recursive: true });
    }

    await fs.writeFile(testPath, content, 'utf8');
};

export { generateTestFile };
