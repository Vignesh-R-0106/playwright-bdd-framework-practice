module.exports = {
  default: {
    require: ["src/step-definitions/*.ts", "src/hooks/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
    },
    paths: ["features/*.feature"],
  },
};
