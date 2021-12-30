import { loadConfig } from '../config/config';

import type { ArgsParams, Command, ConfiguredCommand } from '../types/commands';
import type { Config } from '../types/config';

const injectConfig = <T extends { config: Config }, R>(
    command: Command<T, R>,
): ConfiguredCommand<T, R> => {
    return async ({ config: configPath, ...args }: ArgsParams<T>) => {
        const config = await loadConfig(configPath);

        const commandArgs = ({
            ...args,
            config,
        } as unknown) as T;

        return command(commandArgs);
    };
};

export { injectConfig };
