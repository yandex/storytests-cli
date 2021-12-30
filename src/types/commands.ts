type ArgsParams<T> = Omit<T, 'config'> & {
    config: string | null;
};

type Command<T, R> = (_: T) => Promise<R>;

type ConfiguredCommand<T, R> = (_: ArgsParams<T>) => Promise<R>;

export type { ArgsParams, Command, ConfiguredCommand };
