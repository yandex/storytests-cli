import { promises as fs, constants } from 'fs';

const fsExists = async (filePath: string): Promise<boolean> =>
    fs.access(filePath, constants.F_OK).then(
        () => true,
        () => false,
    );

export { fsExists };
