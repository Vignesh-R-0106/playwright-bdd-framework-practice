module.exports = {
  default: {
    // '**/*.ts' ensures Cucumber searches all subfolders
    require: ["src/step-definitions/**/*.ts", "src/hooks/**/*.ts"],
    requireModule: ["ts-node/register"],
    // Keep your allure reporter here so it continues to work
    format: ["progress", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results",
    },
    paths: ["features/**/*.feature"],
  },
};
