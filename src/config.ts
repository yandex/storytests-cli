import { cosmiconfig } from 'cosmiconfig';

import { schema } from './schema';
import type { TConfig } from './types';

const generateModuleNames = (moduleName: string): string[] => {
    return [
        `.${moduleName}rc.js`,
        `.${moduleName}rc.cjs`,
        `${moduleName}.conf.js`,
        `${moduleName}.conf.cjs`,
        `${moduleName}.config.js`,
        `${moduleName}.config.cjs`,
    ];
};

const explorer = cosmiconfig('storytests', {
    searchPlaces: generateModuleNames('storytests'),
});

const loadConfig = async (): Promise<TConfig> => {
    const result = await explorer.search();

    if (!result || result.isEmpty) {
        throw new Error('Unable to find storytests config file');
    }

    const { config } = result;

    schema.validateAsync(config);

    return config;
};

export { loadConfig };
