import { promises as fs } from 'fs';

import { getStoryFiles } from '../utils/get-story-files';
import { getComponentName } from '../utils/get-component-name';
import { getComponentStories } from '../utils/get-component-stories';
import { getTestDirectoryPath } from '../utils/get-test-directory-path';

import type { CleanupArgs } from '../types/args';

const cleanup = async ({ config }: CleanupArgs): Promise<void> => {
    const {
        generateFileName,
        componentNamePattern,
        testGenerationStrategy,
        storyNamePattern,
        storyFilesPath,
        relativeTestDirectoryPath,
        testFilePostfixes,
    } = config;

    const storyFiles = await getStoryFiles(storyFilesPath);

    storyFiles.forEach(async (filePath) => {
        const fileData = await fs.readFile(filePath, 'utf8');

        const componentName = getComponentName(fileData, componentNamePattern);
        const componentStories = getComponentStories(
            fileData,
            storyNamePattern,
        );

        const testDirectory = getTestDirectoryPath(
            filePath,
            relativeTestDirectoryPath,
        );

        const files = await fs.readdir(testDirectory);

        // eslint-disable-next-line
        console.log(files);
    });
};

export { cleanup };
