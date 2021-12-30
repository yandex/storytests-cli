import path from 'path';
import { promises as fs } from 'fs';

const readDirectoryRecur = async (directory: string): Promise<string[]> => {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    const promises = entries.map((entry) => {
        return entry.isDirectory()
            ? readDirectoryRecur(path.resolve(directory, entry.name))
            : [path.resolve(directory, entry.name)];
    });

    const nestedFiles = await Promise.all(promises);

    return nestedFiles.reduce((acc, files) => {
        acc.push(...files);
        return acc;
    }, []);
};

export { readDirectoryRecur };
