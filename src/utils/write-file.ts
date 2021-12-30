import { promises as fs } from 'fs';

const writeFile = async (path: string, config: string): Promise<void> => {
    try {
        await fs.writeFile(path, config);
    } catch (_) {
        throw new Error('Unable to write config file');
    }
};

export { writeFile };
