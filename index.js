const cli = require("./cli");
const writer = require("./writefile");
const templates = require("./templates");

const config = {
    options: {
        Component: { path: "src/components", template: "reactWebNoRedux" },
        Container: { path: "src/containers", template: "reactWebWithRedux" },
        Section: { path: "src/sections", template: "reactWebWithRedux" },
        Page: { path: "src/pages", template: "reactWebNoRedux" },
        ReduxDomain: {
            path: "src/store",
            template: "reduxDomain",
            additionalInstructions:
                "Don't forget to add your domain to the `src/store/rootReducer.ts` file",
        },
    },
};

const questions = [
    {
        type: "list",
        name: "type",
        message: "Please select the type of files you would like to create",
        choices: Object.keys(config.options),
    },
    {
        type: "input",
        name: "name",
        message:
            "What should the component/domain name be (please capitalize for React components, and camelCase for Redux domains)",
    },
];

const app = () => cli(questions).then((ans) => handleAnswers(ans));

const handleAnswers = (answers) => {
    const { type, name } = answers;
    const selectedOption = config.options[type];
    filesToCreate = templates[selectedOption.template](name);
    const fileDataArr = Object.entries(filesToCreate);
    fileDataArr.forEach((fileData) => {
        const [fileName, fileContents] = fileData;
        writer(selectedOption.path, fileName, fileContents);
    });
    if (selectedOption.additionalInstructions) {
        console.log(selectedOption.additionalInstructions);
    }
    console.log("Files created succesfully");
};

module.exports = app;
