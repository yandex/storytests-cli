import path from 'path';

const getTestDirectoryPath = (
    pathToStory: string,
    relativeTestDirectoryPath: string,
): string => {
    const storyDirname = path.dirname(pathToStory);
    return path.resolve(storyDirname, relativeTestDirectoryPath);
};

export { getTestDirectoryPath };
