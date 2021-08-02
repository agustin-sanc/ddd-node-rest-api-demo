module.exports = {
	setupFiles: ['dotenv/config'],
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testPathIgnorePatterns: [
		'<rootDir>/dist/',
		'<rootDir>/node_modules/',
		'<rootDir>/src/',
	],
	testRegex: '.test.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
};
