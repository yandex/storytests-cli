import { cosmiconfig } from 'cosmiconfig';

import type { Config } from '../types/config';
import { generateModuleNames } from '../utils/generate-module-names';

import { validateConfig } from './validate-config';

const explorer = cosmiconfig('storytests', {
    searchPlaces: generateModuleNames('storytests'),
});

const loadConfig = async (configPath?: string | null): Promise<Config> => {
    const result = await (configPath
        ? explorer.load(configPath)
        : explorer.search());

    if (!result || result.isEmpty) {
        throw new Error('Unable to find storytests config file');
    }

    const { config } = result;

    validateConfig(config);

    return config;
};

export { loadConfig };
