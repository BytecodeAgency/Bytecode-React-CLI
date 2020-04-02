const cli = require("./cli");

const questions = [
    {
        type: "list",
        name: "test-q1",
        message: "Please select component to create",
        choices: ["Component", "Section"],
    },
];

const app = () => cli(questions).then((answers) => console.log(answers));

module.exports = app;
