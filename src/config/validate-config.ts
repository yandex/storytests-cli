import type { Config } from 'types/config';

import { schema } from './schema';

const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

const schemaKeys = Object.keys(schema) as Array<keyof Config>;

const validateConfig = (object: unknown): object is Config => {
    if (!isObject(object)) {
        throw new Error('Provided config is not an object');
    }

    schemaKeys.forEach((key) => {
        const [isValid, error] = schema[key];

        if (!isValid(object[key])) {
            throw new Error(error);
        }
    });

    const excessKeys = Object.keys(object).filter((key) => {
        return !(schemaKeys as string[]).includes(key);
    });

    if (excessKeys.length) {
        throw new Error(`Config has excess keys: ${excessKeys.join(', ')}`);
    }

    return true;
};

export { validateConfig };
