import { promises as fs } from 'fs';
import path from 'path';

import { fsExists } from './fs-exists';

const generateTest = async (
    testDirectoryPath: string,
    filename: string,
    componentName: string,
    componentStoryNames: string | string[],
    postfix: string,
    testTemplate: (
        component: string,
        stories: string | string[],
        postfix: string,
    ) => string | false,
    rewrite = false,
): Promise<void> => {
    const testPath = path.resolve(testDirectoryPath, filename);

    if (!rewrite && (await fsExists(testPath))) {
        return;
    }

    const content = testTemplate(componentName, componentStoryNames, postfix);

    if (content === false) {
        return;
    }

    if (!(await fsExists(testDirectoryPath))) {
        await fs.mkdir(testDirectoryPath, { recursive: true });
    }

    await fs.writeFile(testPath, content, 'utf8');
};

export { generateTest };
