const cli = require("./cli");
const writer = require("writefile");
const templates = require("./templates");

const config = {
    options: {
        Component: { path: "src/components", template: "reactWebNoRedux" },
    },
};

const questions = [
    {
        type: "list",
        name: "type",
        message: "Please select component to create",
        choices: Object.keys(config.options),
    },
    {
        type: "input",
        name: "name",
        message: "What should the name be",
    },
];

const app = () => cli(questions).then((ans) => handleAnswers(ans));

const handleAnswers = (answers) => {
    console.log(answers);
    console.log(templates.reactWebNoRedux(answers.name));
};

module.exports = app;
