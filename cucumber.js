const defaultProfile = [
  "--require-module ts-node/register",
  "test/src/api/*.feature.ts",
  "--require test/src/api/step_definitions/*.steps.ts",
  "--publish-quiet"
].join(" ");

module.exports = {
  default: defaultProfile,
};