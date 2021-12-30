import path from 'path';

import type { Config } from '../types/config';

const getTestDirectoryPath = (
    component: string,
    pathToStory: string,
    testDirectory: Config['testDirectory'],
): string => {
    const storyDirname = path.dirname(pathToStory);

    return typeof testDirectory === 'string'
        ? path.isAbsolute(testDirectory)
            ? testDirectory
            : path.resolve(storyDirname, testDirectory)
        : testDirectory(component, pathToStory);
};

export { getTestDirectoryPath };
