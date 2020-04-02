const cli = require("./cli");
const writer = require("./writefile");
const templates = require("./templates");

const config = {
    // TODO: create support for config file in repo
    options: {
        ComponentWeb: { path: "src/components", template: "reactWebNoRedux" },
        ContainerWeb: { path: "src/containers", template: "reactWebWithRedux" },
        SectionWeb: { path: "src/sections", template: "reactWebWithRedux" },
        PageWeb: { path: "src/pages", template: "reactWebNoRedux" },
        ComponentNative: {
            path: "src/components",
            template: "reactNativeNoRedux",
        },
        ContainerNative: {
            path: "src/containers",
            template: "reactNativeWithRedux",
        },
        SectionNative: {
            path: "src/sections",
            template: "reactNativeWithRedux",
        },
        PageNative: { path: "src/pages", template: "reactNativeNoRedux" },
        ReduxDomain: {
            path: "src/store",
            template: "reduxDomain",
            additionalInstructions:
                "Don't forget to add your domain to the `src/store/rootReducer.ts` file and the StoreState type",
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
        const destDir = `${selectedOption.path}/${name}`;
        writer(destDir, fileName, fileContents);
    });
    if (selectedOption.additionalInstructions) {
        console.log(selectedOption.additionalInstructions);
    }
    console.log("Files created succesfully");
};

module.exports = app;
