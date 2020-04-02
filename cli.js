const inquirer = require("inquirer");

const cli = (questions) => inquirer.prompt(questions);

module.exports = cli;
