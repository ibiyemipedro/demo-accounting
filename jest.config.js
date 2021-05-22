require("jest-config");

module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended", "./setup.js"],
  testMatch: ["<rootDir>/src/tests/unit/**/*.js"],
};
