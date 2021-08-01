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

export { generateModuleNames };
