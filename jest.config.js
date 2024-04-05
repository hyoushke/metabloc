require('dotenv').config({
  path: '.env.test',
})

const esModules = [].join('|')

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '@app/(.*)$': '<rootDir>/src/app/$1',
    '@shared/(.*)$': '<rootDir>/src/shared/$1',
    '@features/(.*)$': '<rootDir>/src/features/$1',
    '@entities/(.*)$': '<rootDir>/src/entities/$1',
    '@widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '@pages/(.*)$': '<rootDir>/src/pages/$1',
    '@api/(.*)$': '<rootDir>/api/$1',
    '^.+\\.svg$': 'jest-transformer-svg',
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/style.mock.js',
    '\\.(gif|ttf|eot)$': '<rootDir>/__mocks__/file.mock.js',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],

  transform: {
    '^.+\\.[tj]sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            jsx: true,
            syntax: 'typescript',
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  // reporters: [
  //   'default',
  //   [
  //     'jest-junit',
  //     {
  //       // outputDirectory: 'test_reports',
  //       // outputName: 'jest-junit.xml',
  //     },
  //   ],
  // ],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!./src/**/_*.{js,jsx,ts,tsx}',
    '!./src/**/index.ts',
    '!./src/**/*.{constant,stories,styled,mock,entity}.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!./coverage/**/*.*',
    '!./.next/**/*.*',
    '!./api/**/*.*',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'whatwg-fetch'],
  // coverageReporters: ['text', 'cobertura'],
}
