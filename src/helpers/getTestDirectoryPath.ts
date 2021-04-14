import path from 'path';

const getTestDirectoryPath = (
    pathToStory: string,
    relatedPathToTestDirectory: string,
): string => path.resolve(pathToStory, relatedPathToTestDirectory);

export { getTestDirectoryPath };
