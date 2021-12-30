import { promises as fs } from 'fs';

const removeFiles = (files: string[]): Promise<void[]> => {
    const promises = files.map((file) => fs.rm(file));

    return Promise.all(promises);
};

export { removeFiles };
