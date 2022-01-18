import { promises as fs } from 'fs';

import { removeFiles } from '../utils/remove-files';
import { getStoryFiles } from '../utils/get-story-files';
import { getComponentName } from '../utils/get-component-name';
import { getValidFilenames } from '../utils/get-valid-filenames';
import { readDirectoryRecur } from '../utils/read-directory-recur';
import { getComponentStories } from '../utils/get-component-stories';
import { getTestDirectoryPath } from '../utils/get-test-directory-path';

import type { CleanupArgs } from '../types/args';

const cleanup = async ({ config, dry = true }: CleanupArgs): Promise<void> => {
    const {
        generateFileName,
        componentPattern,
        strategy,
        storyPattern,
        filesGlob,
        testDirectory,
        postfixes,
        validateFileName = () => false,
    } = config;

    const storyFiles = await getStoryFiles(filesGlob);

    storyFiles.forEach(async (path) => {
        const fileData = await fs.readFile(path, 'utf8');

        const component = getComponentName(fileData, componentPattern);
        const stories = getComponentStories(fileData, storyPattern);

        const testDirPath = getTestDirectoryPath(
            component,
            path,
            testDirectory,
        );

        const files = await readDirectoryRecur(testDirPath).catch(() => []);

        const validNames = getValidFilenames(
            component,
            stories,
            postfixes,
            strategy,
            generateFileName,
        );

        const filesToRemove = files.filter((file) => {
            const isValid =
                validNames.some((name) => file.endsWith(name)) ||
                validateFileName(file, component, stories);

            return !isValid;
        });

        if (!dry) {
            await removeFiles(filesToRemove);

            return;
        }

        filesToRemove.forEach((file) => {
            // eslint-disable-next-line no-console
            console.log(
                `Found unused file: ${file} - not removing due to dry run`,
            );
        });
    });
};

export { cleanup };
