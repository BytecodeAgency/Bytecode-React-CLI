const cli = require("./cli");
const writer = require("./writefile");
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
        message: "What should the component/domain name be",
    },
];

const app = () => cli(questions).then((ans) => handleAnswers(ans));

const handleAnswers = (answers) => {
    const { type, name } = answers;
    const selectedOption = config.options[type];
    filesToCreate = templates[selectedOption.template](name);
    const fileDataArr = Object.entries(filesToCreate);
    fileDataArr.forEach(fileData => {
        const [fileName, fileContents] = fileData;
        writer(selectedOption.path, fileName, fileContents)
    })
};

module.exports = app;
