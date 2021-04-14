module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json',
        },
    },
};
