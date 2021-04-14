import glob from 'glob';

const getStoryFiles = (storyFilesPath: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        glob(storyFilesPath, (err, matches) => {
            if (err) {
                reject(err);
            }

            resolve(matches);
        });
    });
};

export { getStoryFiles };
